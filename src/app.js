const express = require('express');
require("./db/connection");
const Student = require("./models/students");
const app = express();
const port = process.env.PORT || 3000

app.use(express.json());

// create a new student


// using promise
/*app.post("/students", (req, res) => {

    console.log(req.body);
    const user = new Student(req.body);
    // to save inside database
    user.save().then(() => {
        res.status(201).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    })
}) */


// Post using asynvc- await
app.post("/students", async (req, res) => {

    try {
        const user = new Student(req.body);
        const createUser = await user.save();
        res.status(201).send(createUser);
    } catch (e) {
        res.status(400).send(e);
    }
})


// Read the data of the registered students.
app.get("/students", async (req, res) => {

    try {
        const studentsData = await Student.find();
        res.send(studentsData);
    } catch (e) {
        res.send(e);
    }
})

// get the individual student data using id
app.get("/students/:id", async (req, res) => {

    try {
        const _id = req.params.id;
        const studentData = await Student.findById(_id);
        res.send(studentData);
    } catch (e) {
        res.send(e);
    }
})


app.listen(port, () => {
    console.log(`connected successfully at port ${port}`);
})