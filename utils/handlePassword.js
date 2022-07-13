const bcrypt = require("bcrypt");
const saltRounds = 10

 const encrypt = async(passwordPlain) => {
    return await bcrypt.hash(passwordPlain, saltRounds)
 };

 const compare = async(passwordPlain, hashePassword) => {
   return await bcrypt.compare(passwordPlain, hashePassword)
 }

 module.exports = {encrypt, compare}