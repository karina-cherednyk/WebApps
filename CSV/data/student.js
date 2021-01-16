const fs = require('fs');

function Student(name, subjects, grades){
    const res = {};
    grades.forEach((grade, i) => {
        if(!isNaN(grade))  res[subjects[i]] = grade;
    });
    res['Average'] = grades.filter(i => !isNaN(i)).reduce((a, c) => (a + c) ) / grades.length;
    res['Average'] = res['Average'].toPrecision(4);
    res['Name'] = name;
    return res;
}
function getString(fileName) {
    const buffer =  fs.readFileSync(fileName);
    return  buffer.toString()
                    .split('\n')
                    .map(s => s.trim());
}
function getStudents(){
    const grades = getString('data/grades.csv');
    const studentsNames =  getString('data/students.txt');
    const subjects =  getString('data/subjects.txt');
    const students = [];
    studentsNames.forEach((name, i) => {
        const sgrades = grades[i].split(',').map(i => parseInt(i));
        students.push(Student(name, subjects, sgrades));
    });
    return [students, subjects];
}

module.exports = getStudents;

function rand(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function generateGrades(){
    const students = fs.readFileSync('./students.txt').toString().split('\n');
    const subjects = fs.readFileSync('./subjects.txt').toString().split('\n');
    var grades = '';
    for(let r=0; r<students.length; ++r){
        const subL = rand(2, subjects.length);
        for(let c=0; c < subL - 1; ++c){
            grades+=rand(60, 100)+',';
        }
        grades +=rand(60, 100)+'\n';
    }
    fs.writeFileSync('./grades.csv', grades);
}
//generateGrades();