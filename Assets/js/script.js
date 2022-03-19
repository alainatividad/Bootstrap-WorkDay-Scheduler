const timeBlockEl = $('.timeblock');
const buttonEl = $('.btn');
const blockCount = timeBlockEl.children().length;

// Sets date at the jumbotron
function setDate() {
    var timeDisplay = moment();
    $('#currentDay').text(timeDisplay.format("dddd, MMMM Do YYYY"));
}

// sets background colour of the timeblocks depending on the current time
function checkTimeBlock() {    
    var currentHour = moment().format('MM-DD-YYYY h:mm A');
    var timeBlock = '';
    var timeBlockID = '';

    for (var i = 0; i < blockCount; i++) {
        //get id of the textarea (child of the div in the class timeblock) and transform it as a datetime string value
        timeBlockID = $(".timeblock div textarea").eq(i).attr("id");
        timeBlock = moment(moment().format('MM-DD-YYYY')+' '+moment(timeBlockID,'hA').format('h:mm A'),'MM-DD-YYYY h:mm A');
        timeBlock = checkTimeDiff(currentHour, timeBlock);

        if (timeBlock < 0) {
            // add class bg-success for timeblocks greater than current time
            $(`#${timeBlockID}`).addClass('bg-success');
        } else if (timeBlock > 1) {
            // add class bg-secondary for timeblocks less than current time
            $(`#${timeBlockID}`).addClass('bg-secondary');
        } else {
            // add class bg-danger for timeblocks equal to current time
            $(`#${timeBlockID}`).addClass('bg-danger');
        }
    }
}

function checkTimeDiff(currentHour, timeBlock) {
    var timeDiff = 0;
    // get difference of timeblock time to the current time in hours
    var timeDiff = moment(currentHour,'MM-DD-YYYY h:mm A').diff(timeBlock, 'hours',true);
    return timeDiff;
}

function printSavedSched() {
    var textArea = ''
    var storedVal = '';

    // check all timeblocks (child of div that is a child of class timeblock) if there's a corresponding key in localStorage
    for (var i = 0; i < blockCount; i++) {
        textArea = $(".timeblock div textarea").eq(i).attr("id");
        // use value of timeBlock as search selector
        storedVal = localStorage.getItem(`${textArea}`);

        // if it is found, load it to textArea
        if (storedVal) {
            $(`#${textArea}`).val(storedVal);
        }
    }
}

timeBlockEl.on('click', '.btn', function (event) {
    // I've set a data-time attribute to the button that corresponds to the textArea it should answer to
    var timeBlock = $(event.target).attr('data-time');
    // use value of timeBlock as search selector and get value
    var textAreaValue = $(`#${timeBlock}`).val();
    // also use value of timeBlock as keyname in saving in localStorage 
    localStorage.setItem(`${timeBlock}`, textAreaValue);
    
    // Change class of the alert to be visible
    $('.alert').attr('class', 'alert alert-info text-center d-block');
    setTimeout(function () {
        // after 3 seconds, make the alert hidden
        $('.alert').attr('class', 'alert alert-info text-center d-none');
    }, 3000);
})

function init() {
    // do all of these when the page has finished loading
    setDate();
    checkTimeBlock();
    printSavedSched();    
}

$(init());
