// Get Today's (Current) Date
const currentDate = new Date();

// Seperate Today's (Current) Date into day, month and year
const currentDay = currentDate.getDate();
const currentMonth = currentDate.getMonth() + 1;
const currentYear = currentDate.getFullYear();

// Retrive the elements where I will be dynamically updating after the calculation is complete
const outputYears = document.getElementById('outputYears');
const outputMonths = document.getElementById('outputMonths');
const outputDays = document.getElementById('outputDays');

// Retrive the Parent DOM element of the user input fields
const userInputs = document.getElementById('age-calulator-inputs');
// Initialize an empty object to store the values of the user inputs.
let userInputValues = {};

/* CHANGE THESE VARIABLE NAMES AS THEY MAY GET CONFUSED WITH THE ABOVE DOM ELEMENT RETRIVAL WITH AN EXTRA 'S' */
let outputDay;
let outputMonth;
let outputYear;

// Set up an event listener on the parent element of the user input fields
userInputs.addEventListener('input', function(e) {
    // Could add conditional statements here later if needed
    // Add / or update userInputValues obj to have a property name same as the id of the input with the user input for that field as the value
    userInputValues[e.target.id] = e.target.value;
    // Calculates and updates the outputYear with the new value, upon input
    outputYear = (currentYear - userInputValues.userInputYear);
    // console.log(outputYear);
    outputYears.textContent = outputYear;
});

// Below need to go into its own function - should only run once all input are available or validated ??

// Adjust the age in years based on the months
if (currentMonth < userInputValues.userInputMonth) {
    // Subtract 1 from ageInYears output
} else if (currentMonth === userInputValues.userInputMonth && currentDay < userInputValues.userInputDay) {
    // Subtract 1 from ageInYears output
}

// Calculate age in months
if (currentMonth >= userInputValues.userInputMonth) {
    // ageInMonths = currentMonth - birthMonth
} else {
    // ageInMonths = 12 - (birthMonth - currentMonth)
    if (currentDay < userInputValues.userInputDay) {
        // Subtract 1 from ageInMonths
    }
}






