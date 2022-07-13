const {
  getAllUsers,
  getUserById,
  addNewUser,
  deleteUserById,
  editUserById,
  loginUser,
  getUserByEmail,
} = require("./usersModel");
const notNumber = require("../utils/notnumber");
const { encrypt, compare } = require("../utils/handlePassword");
const public_url = process.env.public_url;

const listAll = async (req, res, next) => {
  const dbResponse = await getAllUsers();
  if (dbResponse instanceof Error) return next(dbResponse);
  const responseUser = dbResponse.map(({ id, name, email, IMG }) => ({
    id,
    name,
    email,
    IMG,
  }));
  dbResponse.length ? res.status(200).json(responseUser) : next();
};

const listForEmail = async (req,res, next) => {
  const dbResponse = await getUserByEmail(req.params.email);
  if (dbResponse instanceof Error) return next(dbResponse);
  if (!dbResponse.length) return next();
  const { id, name, email, IMG } = dbResponse[0];
  const responseUser = {
    id,
    name,
    email,
    IMG,
  };
  res.status(200).json(responseUser);
}

const listForId = async (req, res, next) => {
  if (notNumber(req.params.id, next)) return;
  const dbResponse = await getUserById(+req.params.id);
  if (dbResponse instanceof Error) return next(dbResponse);
  if (!dbResponse.length) return next();
  const { id, name, email, IMG } = dbResponse[0];
  const responseUser = {
    id,
    name,
    email,
    IMG,
  };
  res.status(200).json(responseUser);
};

const register = async (req, res, next) => {
  try {
    if (req.body.IMG == "") {
      const IMG = `https://ih1.redbubble.net/image.779334974.2159/st,small,507x507-pad,600x600,f8f8f8.u5.jpg`;
      const password = await encrypt(req.body.password);
      const dbResponse = await addNewUser({ ...req.body, password, IMG });
      if (dbResponse instanceof Error) return next(dbResponse);
      res.status(201).json({ message: `User ${req.body.name} created` });
    } else {
      const img = `${public_url}/${req.file.filename}`;
      const password = await encrypt(req.body.password);
      const dbResponse = await addNewUser({ ...req.body, password, img });
      if (dbResponse instanceof Error) return next(dbResponse);
      res.status(201).json({ message: `User ${req.body.name} created` });
    }
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res, next) => {
  const dbResponse = await loginUser(req.body.email);
  if (!dbResponse.length) return next();
  if (await compare(req.body.password, dbResponse[0].password)) {
    res.sendStatus(200);
  } else {
    let error = new Error("Unauthorized");
    error.status = 401;
    next(error);
  }
};

const patch = async (req, res, next) => {
  try {
    if (req.body.IMG) {
      if (notNumber(req.params.id, next)) return;
      const dbResponse = await editUserById(+req.params.id, { ...req.body });
      if (dbResponse instanceof Error) return next(dbResponse);
      dbResponse.affectedRows
        ? res.status(200).json({ message: "user modified" })
        : next();
    } else {
      if (notNumber(req.params.id, next)) return;
      const img = `${public_url}/${req.file.filename}`;
      const dbResponse = await editUserById(+req.params.id, {
        ...req.body,
        img,
      });
      if (dbResponse instanceof Error) return next(dbResponse);
      dbResponse.affectedRows
        ? res.status(200).json({ message: "user modified" })
        : next();
    }
    /*         
            if(notNumber(req.params.id, next)) return;
            const img = "https://ih1.redbubble.net/image.779334974.2159/st,small,507x507-pad,600x600,f8f8f8.u5.jpg"
            const dbResponse = await editUserById(+req.params.id, {...req.body, img})
            if(dbResponse instanceof Error) return next (dbResponse);
            dbResponse.affectedRows ? res.status(200).json({message: "user modified"}) :  next() 
         */
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (req, res, next) => {
  if (notNumber(req.params.id, next)) return;
  const dbResponse = await deleteUserById(+req.params.id);
  if (dbResponse instanceof Error) return next(dbResponse);
  !dbResponse.affectedRows ? next() : res.status(204).end();
};

module.exports = { listAll, listForId, register, deleteUser, patch, login, listForEmail };
