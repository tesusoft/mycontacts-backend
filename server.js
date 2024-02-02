const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();
const contactsRoute = require("./routes/ContactRoutes")
const userRoutes  = require("./routes/userRoutes")

connectDb();
const app = express();

app.use(express.json());
app.use("/api/contacts", contactsRoute);
app.use("/api/users", userRoutes);
app.use(errorHandler);


const port = process.env.PORT || 5000;


app.listen(port, () =>{
console.log(`Server running on port ${port}`);
})