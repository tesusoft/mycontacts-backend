const asyncHandler = require('express-async-handler');

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// Register a user
//Post api/users/register
//access is public
const registerUser = asyncHandler(async (req, res) => {
    const {username, email, password} = req.body;
    if(!username || !email || !password){
        
        throw new Error("All field are mandatory");
    }
    const userAvailable = await User.findOne({email});
    if (userAvailable){
        res.status(401);
        throw new Error("User already exist.")
    }
//Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password: ", hashedPassword);
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });
    console.log(`User created ${user}`);
    if(user){
        res.status(201).json({_id: user.id, email: user.email, })
    } else{
        res.status(400);
        throw new Error("User data is not valid");
    }
    res.json({message: "Register the user"});
    
});

// User Login
//Post api/users/login
//access is public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const user = await User.findOne({ email });
    //compare password with hashedpassword
    if(user && (await bcrypt.compare(password, user.password))){
       const accessToken = jwt.sign({
        user: {
            username: user.username,
            email: user.email,
            id: user.id,
        },
       }, process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: "1m"}
       );
        res.status(200).json({accessToken});
    } else {
        res.status(401);
        throw new Error("email or password is not not valid.");
    }
});

// User Dashboard
//Post api/users/current
//access is private
const currentUser = asyncHandler(async (req, res) => {
    res.json({message: "User Dashboard"});
});

module.exports = { registerUser, loginUser, currentUser };