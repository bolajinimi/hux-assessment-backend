require("dotenv").config();
const express = require('express');
const app = express();
const contactRoute = require('./routes/contacts');
const userRoute = require('./routes/users')
const { dbConnection } = require("./config/db");
dbConnection()

app.use(express.json());


app.use("/contact", contactRoute);
app.use("/user", userRoute);


const PORT = process.env.PORT || 3006; 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
