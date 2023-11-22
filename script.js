// Get Today's (Current) Date
const currentDate = new Date();

// Seperate Today's (Current) Date into day, month and year
const currentDay = currentDate.getDate();
const currentMonth = currentDate.getMonth() + 1;
const currentYear = currentDate.getFullYear();

// Retrive the Parent DOM element of the user input fields
const userInputs = document.getElementById('age-calulator-inputs');
// Initialize an empty object to store the values of the user inputs.
let userInputValues = {};


// Set up an event listener on the parent element of the user input fields
userInputs.addEventListener('input', function(e) {
    // Could add conditional statements here later if needed
    userInputValues[e.target.id] = e.target.value;
    console.log(userInputValues); /* For testing purposes */
});
