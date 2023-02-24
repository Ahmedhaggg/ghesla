let bcrypt = require("bcrypt");

const generateSalt = async () => await bcrypt.genSalt(10);

exports.hash = async (data) => {
    let salt = await generateSalt();
    return await bcrypt.hash(data, salt);      
}

exports.compare = async (data, hashed) => await bcrypt.compare(data, hashed);