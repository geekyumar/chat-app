const users = require('../../models/users')
const bcrypt = require('bcrypt');

class auth{
    static async signup(req, res) {
        const { name, username, email, password } = req.body;

        if (!name || !username || !email || !password) {
          return res.status(400).json({ message: "All fields are required: name, username, email, and password." });
        }
      
        try {
          const existingUser = await users.findOne({ $or: [{ email }, { username }] });
          if (existingUser) {
            return res.status(400).json({ message: "User with this email or username already exists." });
          }
      
          const hashedPassword = await bcrypt.hash(password, 10);
          const newUser = new users({ name, username, email, password: hashedPassword });
          await newUser.save();

          res.status(200).json({ response: "success" });
        } catch (error) {
          console.error("Signup failed:", error);
          res.status(500).json({ response: "Failed to signup!", error: error.message });
        }
      }
}

module.exports = auth