const bcrypt = require("bcrypt");

// Function to hash a password
async function hashPassword(password) {
    const saltRounds = 10; // Number of salt rounds
    return await bcrypt.hash(password, saltRounds);
}

// Function to verify a password
async function verifyPassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
}

module.exports = { hashPassword, verifyPassword };
