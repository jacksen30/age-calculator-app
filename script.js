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

// Initial values set to 0 to avoid a NaN Error when using parseInt() later.
let userInputValues = {
    userInputYear: 0,
    userInputMonth: 0,
    userInputDay: 0,
};

//  Keeps track of if a user input field has recieved user input since last page load / refresh
let userInputInteracted = {
    userInputYear: false,
    userInputMonth: false,
    userInputDay: false,
};

// Set up an event listener on the parent element of the user input fields
userInputs.addEventListener('input', function(e) {
    // Updates userInputValues
    userInputValues[e.target.id] = e.target.value;
    // Updates userInputInteracted upon user input
    userInputInteracted[e.target.id] = true;

    // Allows for shorter variable name when accessing compared to accessing inside the obj
    let inputYear = userInputValues.userInputYear;
    let inputMonth = userInputValues.userInputMonth;
    let inputDay = userInputValues.userInputDay;

    // Stores values need for Calculating Age
    let ageInYears = 0;
    let ageInMonths = 0;
    let ageInDays = 0;

    // Set preliminary age in years - based off year only
    ageInYears = (currentYear - inputYear);

    const applyErrorStyles = (elementId, isError) => {
        const inputElement = document.getElementById(elementId);
        const labelElement = inputElement.previousElementSibling; // Assuming label is always before input
        const errorMessageElement = inputElement.nextElementSibling; // Assuming error text / message is always after input

        if (isError) {
          labelElement.classList.add('warning');
          inputElement.classList.add('warning');
          errorMessageElement.classList.add('warning');
        } else {
          labelElement.classList.remove('warning');
          inputElement.classList.remove('warning');
          errorMessageElement.classList.remove('warning');
        }
      }

    const resetErrorWarnings = () => {
        applyErrorStyles('userInputDay', false);
        applyErrorStyles('userInputMonth', false);
        applyErrorStyles('userInputYear', false);
    }

    const resetOutputDisplay = () => {
        outputYears.textContent = '--';
        outputMonths.textContent = '--';
        outputDays.textContent = '--';
    }

    const checkAllInputsValid = () => {
        let aFieldHasFailed;

        resetErrorWarnings();

        if (inputYear < 1900 || inputYear > currentYear + 1) {
            if (userInputInteracted.userInputYear) {
                aFieldHasFailed = true;
                applyErrorStyles('userInputYear', true);
            } else {
                aFieldHasFailed = true;
            }
        }

        if (inputMonth < 1 || inputMonth > 12) {
            if (userInputInteracted.userInputMonth) {
                aFieldHasFailed = true;
                applyErrorStyles('userInputMonth', true);
            } else {
                aFieldHasFailed = true;
            }
        }

        if (inputDay < 1 || inputDay > 31) {
            if (userInputInteracted.userInputDay) {
                aFieldHasFailed = true;
                applyErrorStyles('userInputDay', true);
            } else {
                aFieldHasFailed = true;
            }
        }

        if (aFieldHasFailed) {
            resetOutputDisplay();
            console.log('At least one user input value has failed validation!');
            // This will break out of Function to ensure the below console.log and calculateOutput() isn't called when a user input has failed validation
            return false;
        }

        console.log('All user inputs have been validated');
        calculateOutput();
        return true;
    }


    const calculateOutput = () => {
        // Adjust the age in years based on the months and days
        ageInYears = currentYear - inputYear;

        if (currentMonth < inputMonth || (currentMonth === inputMonth && currentDay < inputDay)) {
            ageInYears -= 1;
        }

        // Calculate the age in months
        ageInMonths = currentMonth - inputMonth;

        if (currentDay < inputDay) {
            ageInMonths -= 1;
        }

        if (ageInMonths < 0) {
            ageInMonths += 12;
        }

        // Calculate age in days
        let daysInPrevMonth = getDaysInMonth(inputMonth - 1 || 12, inputYear);
        ageInDays = currentDay - inputDay;
        if (ageInDays < 0) {
            ageInDays += daysInPrevMonth;
        }

        outputYears.textContent = ageInYears;
        outputMonths.textContent = ageInMonths;
        outputDays.textContent = ageInDays;
    }

    // Updated getDaysInMonth function for Leap Year consideration
    // If not used will create 1day inaccuracy for every leap year in that has occured in a persons life.
    const getDaysInMonth = (month, year) => {
        switch (month) {
            case 2:
                return (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) ? 29 : 28;
            case 4: case 6: case 9: case 11:
                return 30;
            default:
                return 31;
        }
    }

    checkAllInputsValid();
});







