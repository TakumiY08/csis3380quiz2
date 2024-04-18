const mongoose = require('mongoose');

const express = require('express')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// require('dotenv').config();

const port = process.env.PORT || 3000;

// Create a Schema object
const Schema = mongoose.Schema;

// Create a Model object
const studentSchema = new Schema({
  name: {type: String, require: true},
  studentID: {type: Number, require: true}
});

const Student = mongoose.model("w24student", studentSchema);

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/form.html")
});

app.post('/', async (req, res) => {
  // get the data from the form
  console.log(req.body.myuri);
  const uri = req.body.myuri;
  // connect to the database and log the connection
  await mongoose.connect(uri,
    {
      useNewUrlParser: true, useUnifiedTopology: true
    })
    .then(() => {
      console.log('Connecting to MongoDB')
    })
  // add the data to the database
  const name = "Takumi Yonemura";
  const studentID = 300371215;
  const newStudent = await new Student({name,studentID})
  newStudent.save()
            .catch((err) => res.status(400).json("Error: " + err))
  // send a response to the user
  res.send(`<h1>Document  Added</h1>`);
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
