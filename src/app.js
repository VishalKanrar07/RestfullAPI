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

// get the individual student data using name
app.get("/students/name/:name", async (req, res) => {
    try {
        const name = req.params.name;
        console.log(req.params.name);
        const studentData1 = await Student.findOne({ name: name });

        if (!studentData1) {
            // If no student with the given name is found
            return res.status(404).send('Student not found');
        } else {
            res.send(studentData1);
        }
    } catch (e) {
        res.status(500).send(e.message);
    }
});

// get the individual student data using email
app.get("/students/email/:email", async (req, res) => {
    try {
        const email = req.params.email;
        console.log(req.params.email);
        const studentData2 = await Student.findOne({ email: email });

        if (!studentData2) {
            // If no student with the given name is found
            return res.status(404).send('Student not found');
        } else {
            res.send(studentData2);
        }
    } catch (e) {
        res.status(500).send(e.message);
    }
});

app.listen(port, () => {
    console.log(`connected successfully at port ${port}`);
})