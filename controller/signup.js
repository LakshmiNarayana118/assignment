const bcrypt = require('bcrypt');
const User  = require('../entities/user'); // Import the User model

// Signup Controller
const signup = async (req, res) => {
console.log(req.body)
// const email= req.body.email
// const password= req.body.password
  const { email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ where: { email: email } });
    if (existingUser) {
      return res.status(409).json({
        status: 409,
        data: null,
        message: "Email already exists.",
        error: null,
        
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Determine role: First user is Admin; others are Viewer
    const userCount = await User.count();
    if(userCount % 3 == 0 && userCount == 0){
      role='Admin'
    }else if(userCount % 3==1){
      role='Editor'
    }else{
      role='Viewer'
    }
    // Create a new user
    await User.create({
      email,
      password: hashedPassword,
      role,
    });

    return res.status(201).json({
      status: 201,
      data: null,
      message: "User created successfully.",
      error: null,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 500,
      data: null,
      message: "Internal server error.",
      error: error.message,
    });
  }
};

module.exports = signup;