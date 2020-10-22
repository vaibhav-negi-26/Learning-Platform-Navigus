// timmer starts

function startTimer(duration, display) {

    var timer = duration,
        minutes, seconds;
    var x = setInterval(function () {
        // console.log(timer);
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            clearInterval(x)
            document.querySelector('.btn-modal').click();
            setTimeout(() => {
                $(location).attr('href', './student_dash.html')
            }, 1000 * 10);
        }
    }, 1000);
}

// window.onload = function () {
//     var Minutes = 60 * 0.1,
//         display = document.querySelector('#time');
//     startTimer(Minutes, display);
// };

$(document).ready(function () {
    $('.modal').modal();

});

// getting value from radio btns
function myFunction() {
    var radioValue = $("input[name='group1']:checked").val();
    if (radioValue) {
        alert("Your are a - " + radioValue);
    }
}
// timmer ends


const question = [{
        "question": "The development environment offers which standard construct for data validation?",
        "opt_1": "Super controlled loop constructs",
        "opt_2": "Case sensitivity check",
        "opt_3": "Validation constructs",
        "opt_4": "All of the mentioned",
        "correct_opt": "D",
        "explanation": "All these facilities are available in JavaScript. Additionally, all development environments provide syntax to create and use memory variables, constants, and functions.",
        "points": "5"
    }, {
        "question": "The main purpose of a 'Live Wire' in NetScape is to",
        "opt_1": "Create linkage between client side and server side",
        "opt_2": "Permit server side, JavaScript code, to connect to RDBMS",
        "opt_3": "Support only non relational database",
        "opt_4": "To interpret JavaScript code",
        "correct_opt": "B",
        "explanation": "A Live Wire database driver also supports a number of non-relational databases.",
        "points": "5"
    },
    {
        "question": "The script tag must be placed in",
        "opt_1": "head",
        "opt_2": "head and body",
        "opt_3": "title and head",
        "opt_4": "all of the mentioned",
        "correct_opt": "B",
        "explanation": "If the script tag is placed after the body tag, then, it will not be evaluated at all. Also, it is always recommended and effective to use the script snippet in the <head> tag.",
        "points": "5"
    },
    {
        "question": "JavaScript is ideal to",
        "opt_1": "make computations in HTML simpler",
        "opt_2": "minimize storage requirements on the web server",
        "opt_3": "increase the download time for the client",
        "opt_4": "none of the mentioned",
        "correct_opt": "B",
        "explanation": "To minimize storage requirements, JavaScript is always a better say.",
        "points": "5"
    },
    {
        "question": "Which attribute is used to specify that the script is executed when the page has finished parsing ( only for external scripts )",
        "opt_1": "parse",
        "opt_2": "a sync",
        "opt_3": "defer",
        "opt_4": "type",
        "correct_opt": "C",
        "explanation": "In order to load a page, the browser must parse the contents of all script tags, which adds additional time to the page load) By minimizing the amount of JavaScript needed to render the page, and deferring parsing of unneeded JavaScript until it needs to be executed, you can reduce the initial load time of your page.",
        "points": "5"
    },
    {
        "question": "Which of the following Attribute is used to include External JS code inside your HTML document",
        "opt_1": "src",
        "opt_2": "ext",
        "opt_3": "script",
        "opt_4": "link",
        "correct_opt": "A",
        "explanation": "A 'src' attribute could be used to add any external code into the HTML document.",
        "points": "5"
    },
    {
        "question": "JavaScript Code can be called using",
        "opt_1": "RMI",
        "opt_2": "Triggering Event",
        "opt_3": "Preprocessor",
        "opt_4": "Function/Method",
        "correct_opt": "D",
        "explanation": "JavaScript code is easy to be implemented and run. It can be called by using a function or a method",
        "points": "5"
    }
]