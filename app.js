
const express = require('express');
const cors = require('cors');
const app = express();
const prod = require('./config.js');
prod(app);
const { urlencoded } = require('express');
const members = require('./routes/members');
const home = require('./routes/home');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api/members', members);
app.use('/', home);



app.use(cors());
app.use(express.json());



const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true, useUnifiedTopology: true })
   .then(() => { console.log("connected to DB") })
   .catch((err) => { console.log("something wrong", err) })

const courseSchema = new mongoose.Schema({
   name: String,
   author: String,
   tags: [String],
   date: { type: Date, default: Date.now },
   isPublished: Boolean
});


const Course = mongoose.model('Course', courseSchema);

async function saveCourse() {

   const course = new Course({
      name: "NodeJs",
      author: "Mosh",
      tags: ["Angular", "Frontend"],
      isPublished: true
   })

   course.save();

}

async function getCourses() {
   const courses = await Course.find().select({ name: 1, isPublished: 1 }).limit(1).count()
   console.log(courses);
}


async function updateCourse(id) {

   const course = await Course.findById(id);
   if (!course) return;

   course.name = "Another Name";
   course.author = "Another Author";

   const result = await course.save();

}

async function deleteCourse(id){

    const course = await Course.findByIdAndDelete(id) ;
    console.log(course);
}

deleteCourse("5f213757a732c75a7cc611df");

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`The port listens on ${port}...`));



