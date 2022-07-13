const multer = require("multer");
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        const pathStorage = `${__dirname}/../storage`
        callback(null, pathStorage);
    },
    filename: (req, file, callback) => {
        const ext = file.originalname.split(".").pop()
        const fileName = `file_${Date.now()}.${ext}`;
        callback(null, fileName)
    }
});

const uploadFile = multer({storage})

module.exports = uploadFile