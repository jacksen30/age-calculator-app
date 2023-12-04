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

        const daysInCurrentMonth = getDaysInMonth(currentMonth);

        if (currentDay >= inputDay) {
            ageInDays = currentDay - inputDay;
        } else {
            ageInDays = daysInCurrentMonth - (inputDay - currentDay) + (getDaysInMonth(currentMonth + 1));
        }

        outputYears.textContent = ageInYears;
        outputMonths.textContent = ageInMonths;
        outputDays.textContent = ageInDays;
    }

    checkAllInputsValid();
});







