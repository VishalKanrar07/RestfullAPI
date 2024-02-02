const express = require('express');
require("./db/connection");
const Student = require("./models/students");
const studentRouter = require('./routers/student')
const app = express();
const port = process.env.PORT || 3000

app.use(express.json());

// we need to register our router

app.use(studentRouter);

app.listen(port, () => {
    console.log(`connected successfully at port ${port}`);
})