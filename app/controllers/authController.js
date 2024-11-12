const users = require('../../models/users')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

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

      static async login(req, res){
        const { username, password } = req.body

        if(!username || !password){
          return res.status(400).json({"message" : "both fields are required. username and password"})
        }

        const user = await users.findOne({"username": username})
        if(!user){
          return res.status(400).json({"message" : "invalid user"})
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password." });
        }

        const token = jwt.sign(
          { name: user.name, username: user.username, email: user.email },
          process.env.JWT_SECRET,
          { expiresIn: '1h' }
        )

        res.status(200).json({ message: "Login successful!", token });

      }
}

module.exports = auth