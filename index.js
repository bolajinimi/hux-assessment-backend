require("dotenv").config();
const express = require('express');
const app = express();
const cors = require('cors');
const contactRoute = require('./routes/contacts');
const userRoute = require('./routes/users')
const { dbConnection } = require("./config/db");
dbConnection()

app.use(express.json());

app.use(cors());
app.use("/contact", contactRoute);
app.use("/user", userRoute);


const PORT = 3008; 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
module.exports = app;