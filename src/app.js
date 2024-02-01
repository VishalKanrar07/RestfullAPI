const express = require('express');
require("./db/connection");
const Student = require("./models/students");
const app = express();
const port = process.env.PORT || 3000

app.use(express.json());

// create a new student

app.post("/students", (req, res) => {

    console.log(req.body);
    const user = new Student(req.body);
    // to save inside database
    user.save().then(() => {
        res.status(201).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    })

})

app.listen(port, () => {
    console.log(`connected successfully at port ${port}`);
})