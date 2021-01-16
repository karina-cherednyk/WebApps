const express = require('express');
const router = express.Router();
const getStudents = require('../data/student');
const [students, subjects] = getStudents();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { sort: 'no', title: 'Grades' , students: students, subjects: subjects});
});

router.get('/sortedUp', (req, res, next) =>{
  res.render('index', { sort: 'up', title: 'Up sorted grades', students: students.sort( (a, b) => a.Average - b.Average), subjects: subjects });
});
router.get('/sortedDown', (req, res, next) => {
  res.render('index', {sort: 'down', title: 'Down sorted grades', students: students.sort( (a, b) => b.Average - a.Average), subjects: subjects})
});

module.exports = router;