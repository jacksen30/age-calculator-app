// Get Today's (Current) Date, seperate it into day, month and year
const currentDate = new Date();
const currentDay = currentDate.getDate();
const currentMonth = currentDate.getMonth() + 1;
const currentYear = currentDate.getFullYear();

console.log(currentDate);
console.log(currentDay);
console.log(currentMonth);
console.log(currentYear);

const inputElement = {
    day: document.getElementById('user-input--day'),
    month: document.getElementById('user-input--month'),
    year: document.getElementById('user-input--year')
};

const userInputValues = {
    day: inputElement.day.value,
    month: inputElement.month.value,
    year: inputElement.year.value
};

// inputElement.day.addEventListener('input', () {
//     // inputElement.day.value = 
// })