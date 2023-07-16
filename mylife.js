// @ts-nocheck
const lifeContainer = document.getElementById("life-container");
const ttTextInstance = document.getElementsByClassName("tooltiptext")[0];
const lifeBar = document.getElementById("life-bar");
const birthdayElem = document.getElementById("birthday");
const dieDayElem = document.getElementById("dying-day");
const ageElem = document.getElementById("max-age");
const percentLivedElem = document.getElementById("percent-lived");

let ttTextClone = ttTextInstance.cloneNode();

const miilisecondsInDay = 86400000;
const bornDate = "09/14/1992";
const dieDate = "09/15/2067";

let startDate = new Date(bornDate);
let dateIterator = new Date(bornDate);
let endDate = new Date(dieDate);
let today = new Date();

let eventText = '';
let birthday = 0;


function main() {
    if(today >= endDate) {
        today = new Date(dieDate);
    }

    let percentLived = getPercentLived();
    buildDescription(percentLived);
    buildLifeBar(percentLived);
    buildDayList();
    addPositioningEvents();
}

function getPercentLived() {
    let totalDays = distanceBetweenDays(endDate, startDate);
    let livedDays = distanceBetweenDays(today, startDate);
    let percentage = (livedDays / totalDays * 100).toFixed(2);
    // console.log("Distance from end to start: " + totalDays);
    // console.log("Distance from today to start: " + livedDays);
    // console.log("Percentage lived: " + percentage);
    return percentage;
}

function buildDescription(percentage) {
    birthdayElem.innerHTML = startDate.toDateString();
    dieDayElem.innerHTML = endDate.toDateString();
    ageElem.innerHTML = getExpectedAge();
    percentLivedElem.innerHTML = `${percentage}%`;
}

function getExpectedAge() {
    return Math.floor(distanceBetweenDays(endDate, startDate) / 365);
}

function buildLifeBar(percentage) {
    lifeBar.style.width = `${percentage}%`;
    lifeBar.innerHTML = `${percentage}%`;
}

function distanceBetweenDays(day1, day2) {
    let midnight1 = new Date(`${day1.getMonth()+1}/${day1.getDate()}/${day1.getFullYear()}`);
    let midnight2 = new Date(`${day2.getMonth()+1}/${day2.getDate()}/${day2.getFullYear()}`);
    return Math.floor((Math.abs(midnight1-midnight2)) / miilisecondsInDay);
    

}

function buildDayList() {
    let dayDiv;
    let customEventText = '';

    while(dateIterator < endDate) {

        dayDiv = document.createElement("div");
        dayDiv.classList.add("day");
        
        if(dateIterator > today) {
            dayDiv.classList.add("future");
        }

        if(equalsDay(dateIterator,9,14,1992)) {
            dayDiv.classList.add("event");
        } else if(dateIterator.getMonth()+1 === 9 && dateIterator.getDate() === 14 && dateIterator.getFullYear() > 1992 && dateIterator <= today) {
            // my birthday!
            dayDiv.classList.add("event");
        }

        customEventText = getEventForDay(dateIterator);
        if(customEventText !== '') {
            dayDiv.classList.add("event");
        }


        lifeContainer.appendChild(dayDiv);

        dateIterator.setDate(dateIterator.getDate()+1);
    }

}

function humanize(number) {
    if(number % 100 >= 11 && number % 100 <= 13) return number + "th";
    switch(number % 10) {
      case 1: return number + "st";
      case 2: return number + "nd";
      case 3: return number + "rd";
    }
    return number + "th";
}

function equalsDay(currentDate, month, day, year) {
    return currentDate.getDate()===day && currentDate.getMonth()+1===month && currentDate.getFullYear() === year;
}

function getEventForDay(date) {
    if(equalsDay(date, 8, 25, 1998)) {
        return "\nFirst day of kindegarten";
    } else if(equalsDay(date, 6, 11, 2004)) {
        return "\nLast day of elementary school";
    } else if(equalsDay(date, 8, 25, 2004)) {
        return "\nFirst day of middle school";
    } else if(equalsDay(date, 6, 2, 2005)) {
        return "\nPaternal grandfather passes";
    } else if(equalsDay(date, 6, 7, 2007)) {
        return "\nLast day of middle school";
    } else if(equalsDay(date, 8, 27, 2007)) {
        return "\nFirst day of high school";
    } else if(equalsDay(date, 3, 8, 2011)) {
        return "\nCrashed into";
    } else if(equalsDay(date, 4, 4, 2011)) {
        return "\nWrestlemania 27 in Atlanta, GA";
    } else if(equalsDay(date, 5, 26, 2011)) {
        return "\nLast day of high school";
    } else if(equalsDay(date, 6, 16, 2011)) {
        return "\nCollege freshman orientation";
    } else if(equalsDay(date, 8, 19, 2011)) {
        return "\nMove into college dorm";
    } else if(equalsDay(date, 8, 23, 2011)) {
        return "\nFirst day of college classes";
    } else if(equalsDay(date, 5, 11, 2012)) {
        return "\nMaternal grandfather passes";
    } else if(equalsDay(date, 5, 9, 2015)) {
        return "\nLast college exam";
    } else if(equalsDay(date, 5, 9, 2015)) {
        return "\nGraduate from college";
    } else if(equalsDay(date, 10, 21, 2015)) {
        return "\nSee Back to the Future in theatres";
    } else if(equalsDay(date, 1, 24, 2017)) {
        return "\nPaternal grandmother passes";
    } else if(equalsDay(date, 4, 2, 2017)) {
        return "\nWrestlemania 33 in Orlando, FL";
    } else if(equalsDay(date, 4, 11, 2018)) {
        return "\nFirst day at AT&T";
    } else if(equalsDay(date, 5, 13, 2019)) {
        return "\nNotified team is being laid off";
    } else if(equalsDay(date, 5, 17, 2019)) {
        return "\nLast day at AT&T";
    } else if(equalsDay(date, 8, 19, 2019)) {
        return "\nFirst day at Shark Dreams";
    } else if(equalsDay(date, 8, 31, 2019)) {
        return "\nFirst time buying my own new car";
    } else if(equalsDay(date, 3, 23, 2020)) {
        return "\nStart remote work due to Covid-19";
    } else if(equalsDay(date, 6, 30, 2020)) {
        return "\nMaternal grandmother passes";
    } else if(equalsDay(date, 1, 8, 2021)) {
        return "\nLast day at Shark Dreams";
    } else if(equalsDay(date, 2, 22, 2021)) {
        return "\nFirst day at Schuco";
    } else if(equalsDay(date, 11, 14, 2021)) {
        return "\nGo to New York for first time";
    } else if(equalsDay(date, 11, 18, 2021)) {
        return "\nVisit Statue of Liberty, Ellis Island, and Time Square";
    } else if(equalsDay(date, 11, 19, 2021)) {
        return "\nVisit The Met";
    } else if(equalsDay(date, 5, 1, 2022)) {
        return "\nBest man at my brother's wedding";
    } else if(equalsDay(date, 2, 3, 2023)) {
        return "\nFirst niece, Everly, is born";
    }
    
    return '';
}

function addPositioningEvents() {
    let tooltips = document.querySelectorAll('.day');
    tooltips.forEach((tooltip, index) => {
        tooltip.addEventListener("mouseenter", cloneAndPositionTooltip.bind(this, tooltip, index), false);
        tooltip.addEventListener("click", cloneAndPositionTooltip.bind(this, tooltip, index), index);
    });
}

function cloneAndPositionTooltip(tooltip, index) {
    ttTextClone.remove();
    ttTextClone = ttTextInstance.cloneNode();

    let nodeDate = new Date(startDate);
    nodeDate.setDate(nodeDate.getDate() + index);

    ttTextClone.innerHTML = getTextForTooltip(nodeDate);
    tooltip.appendChild(ttTextClone);

    let boundingRect = tooltip.getBoundingClientRect();

    let tipX = boundingRect.width + 5; 
    let tipY = -20; 
    // Position tooltip
    ttTextClone.style.top = tipY + 'px';
    ttTextClone.style.left = tipX + 'px';

    let tooltipRect = ttTextClone.getBoundingClientRect();

    // Out of bounds on the right
    if ((tooltipRect.x + tooltipRect.width) > window.innerWidth) {
        tipX = -tooltipRect.width - 5;
    } 

    // Out of bounds below
    if ((tooltipRect.y + tooltipRect.height) > window.innerHeight) {
        tipY = -tooltipRect.height - 10;
    } 

    // Out of bounds above
    if (tooltipRect.y < 0) {           
        tipY = tipY - tooltipRect.y; 
    }

    // Apply corrected position
    ttTextClone.style.top = tipY + 'px';
    ttTextClone.style.left = tipX + 'px';
}

function getTextForTooltip(date) {
    eventText = date.toDateString();

    if(equalsDay(date,9,14,1992)) {
        eventText+="\nI was born!";
    } else if(date.getMonth()+1 === 9 && date.getDate() === 14 && date.getFullYear() > 1992 && date <= today) {
        eventText += `\nMy ${humanize(date.getFullYear()-1992)} birthday!`; 
    }
    customEventText = getEventForDay(date);
    if(customEventText !== '') {
        eventText += customEventText;
    }

    return eventText;
}

main();

