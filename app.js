const input = document.querySelector("#input");
const button = document.querySelector("#btn");
const result = document.querySelector("#output");
const resultTwo = document.querySelector("#output-2");
function reverseStr(str) {
    return str.split("").reverse().join("");
}
// console.log(reverseStr("hello"));

function isPalindrome(str) {
    var reverse = reverseStr(str);
    return str === reverse;
}
// console.log(isPalindrome("racecar"));

function convertToString(date) {
    var dateStr = { day: "", month: "", year: "" };

    if (date.day < 10) {
        dateStr.day = "0" + date.day;
    } else {
        dateStr.day = date.day.toString();
    }

    if (date.month < 10) {
        dateStr.month = "0" + date.month;
    } else {
        dateStr.month = date.month.toString();
    }

    dateStr.year = date.year.toString();

    return dateStr;
}
// var date = {
//     day:2, month:4, year:2012
// }
// console.log(convertToString(date));

function allDateFormats(date) {
    var dateStr = convertToString(date);


    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd = + dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

// var date = {
//     day:2, month:4, year:2012
// }
// console.log(dateFormats(date));

function checkPalindromeForAllDateFormats(date) {
    // var listOfPalindromes = allDateFormats(date);
    var palindrome = false;

    for (var i = 0; i < allDateFormats(date).length; i++) {
        if (isPalindrome(allDateFormats(date)[i])) {
            palindrome = true;
            break;
        }
    }
    return palindrome;
}

// var date = {
//     day: 21, month: 02, year: 2012
// }
// console.log(checkPalindromeForAllDateFormats(date));

function isLeapYear(year) {
    if (year % 400 === 0)
        return true;

    if (year % 100 === 0)
        return false;

    if (year % 4 === 0)
        return true;

    return false;
}

function getNextDate(date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month === 2) {
        if (isLeapYear(year)) {
            if (day > 29) {
                day = 1;
                month = 3;
            }
        } else {
            if (day > 28) {
                day = 1;
                month = 3;
            }
        }
    }
    else {
        if (day > daysInMonth[month - 1]) {
            day = 1;
            month++;
        }
    }
    if (month > 12) {
        month = 1;
        year++;
    }
    return {
        day: day,
        month: month,
        year: year
    }
}

function getNextPalindrome(date) {
    var nextDate = getNextDate(date);
    var counter = 0;

    while (1) {
        counter++;

        var isPalindrome = checkPalindromeForAllDateFormats(nextDate);
        if (isPalindrome) {
            break;
        }
        nextDate = getNextDate(nextDate);
    }
    return [counter, nextDate];
}

function getPreviousDate(date) {
    var day = date.day - 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month === 2) {
        if (isLeapYear(year)) {
            if (day > 29) {
                day = 28;
                month = month;
            }
        }
        else {
            if (day > 28) {
                day = 27;
                month = month;
            }
        }
    }
    else {
        if (day > daysInMonth[month - 1]) {
            day--;
            month--;
        }
    }
    if (month > 12) {
        month--;
        year--;
    }

    return {
        day: day,
        month: month,
        year: year
    }
}


function getPreviousPalindrome(date) {
    var previousDate = getPreviousDate(date);
    var pCounter = 0;

    while (1) {
        pCounter--;
        var isPalindrome = checkPalindromeForAllDateFormats(previousDate);
        if (isPalindrome) {
            break;
        }
        previousDate = getPreviousDate(previousDate);
    }
    return [pCounter, previousDate]
}


// var date = {
//     day: 8,
//     month: 8,
//     year: 2021
//   }
// console.log(getNextPalindrome(date));

function clickHandler(e) {
    var bdayString = input.value;

    if (bdayString !== '') {
        var bdayDate = bdayString.split('-');

        var date = {
            day: Number(bdayDate[2]),
            month: Number(bdayDate[1]),
            year: Number(bdayDate[0])
        };

        var isPalindrome = checkPalindromeForAllDateFormats(date);

        if (isPalindrome) {
            result.innerText = `Yay! your birthday is Palindrome 🎉`
        }
        else {
            var [counter, nextDate] = getNextPalindrome(date);

            result.innerText = `The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed by ${counter} days! 😌😏`;
        }
    }
    else {
        result.innerText = `Enter a date`;
    }
}

button.addEventListener("click", clickHandler);