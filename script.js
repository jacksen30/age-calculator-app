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

// Set up an event listener on the parent element of the user input fields
userInputs.addEventListener('input', function(e) {
    // Could add conditional statements here later if needed
    // Add / or update userInputValues obj to have a property name same as the id of the input with the user input for that field as the value
    userInputValues[e.target.id] = e.target.value;

    // Convert year, month, and day values from the user input to integers
    let inputYear = parseInt(userInputValues.userInputYear);
    let inputMonth = parseInt(userInputValues.userInputMonth);
    let inputDay = parseInt(userInputValues.userInputDay);

    // Calculates and updates the outputYear with the new value, upon input
    let ageInYears = 0;
    let ageInMonths = 0;
    let ageInDays = 0;

    // Set preliminary age in years - based off year only
    ageInYears = (currentYear - inputYear);

    // Adjust the age in years based on the months
    if (currentMonth < inputMonth) {
        ageInYears = ageInYears - 1;
    }  else if (currentMonth === inputMonth && currentDay < inputDay) {
        ageInYears = ageInYears - 1;
    }

    // Calculate the age in months
    if (currentMonth >= inputMonth) {
        ageInMonths = currentMonth - inputMonth;
    } else {
        ageInMonths = 12 - (inputMonth - currentMonth);
        if (currentDay < inputDay) {
            ageInMonths = ageInMonths - 1;
        }
    }

    // Calculate age in days
    const getDaysInMonth = (monthDigit) => {
        if (monthDigit === 2) {
            return 28;
        } else if (monthDigit === 4 || monthDigit === 6 || monthDigit === 9 || monthDigit === 11) {
            return 30;
        } else {
            return 31;
        }
    }

    let daysInCurrentMonth = getDaysInMonth(currentMonth);

    if (currentDay >= inputDay) {
        ageInDays = currentDay - inputDay;
    } else {
        ageInDays = daysInCurrentMonth - (inputDay - currentDay) + (getDaysInMonth(currentMonth + 1));
    }

    outputYears.textContent = ageInYears;
    outputMonths.textContent = ageInMonths;
    outputDays.textContent = ageInDays;
});









