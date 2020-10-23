# Learning-Platform-Navigus
Assignment - Build an adaptive learning platform, leveraging gamification to engage users

Technologies used: Node.JS, MongoDB, AngularJS, Jquery, Material css, Html5 and Css3.

project and it is live at :https://vaibhav-navigus-test.herokuapp.com/

## Some sample objects (used by APIs) for refrence

Teacher Objects <br />
{
	"name" : "vaibhav",
	"email" : "vaibhav@gmail.com",
  "contact" : "8789922424",
	"password" : "vaibhav@admin",
  "college" : "DIT University"
}

Login Teacher Objects <br />
{	
	"email" : "vaibhav@gmail.com",
	"password" : "vaibhav@admin"
}

course Object <br />
{
    "title": "Big Data",
    "description": "but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    "credit": "3"
}

quiz Object <br />
{
    "max_score" : "0",
    "available" : "0",
    "course_name" : "Web Development"
}
question Object <br />
{
    "question": "The main purpose of a 'Live Wire' in NetScape is to",
    "opt_1": "Create linkage between client side and server side",
    "opt_2": "Permit server side, JavaScript code, to connect to RDBMS",
    "opt_3": "Support only non relational database",
    "opt_4": "To interpret JavaScript code",
    "correct_opt": "A",
    "explanation": "A Live Wire database driver also supports a number of non-relational databases.",
    "points": "5"
}

Student Object<br />
{
	"name" : "Gaurav Negi",
	"email" : "Gaurav@gmail.com",
  "password" : "Gaurav@admin",
  "contact" : "8578001921",
  "college" : "DIT University"
}

Login Student Objects <br />
{	
	"email" : "Gaurav@gmail.com",
  "password" : "Gaurav@admin"
}

quiz results object <br />
{
    "course_name" : "Web Development",
    "scored" : "5",
    "max_score" : "10",
}
