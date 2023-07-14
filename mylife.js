const lifeContainer = document.getElementById("life-container");

let dateIterator = new Date("09/14/1992");
let endDate = new Date("01/01/2070");
let today = new Date();

let eventText = '';
let birthday = 0;



function main() {
    buildDayList();
    addPositioningEvents();
}

function buildDayList() {
    let dayDiv;
    let dayTooltip;
    let customEventText = '';

    while(dateIterator < endDate) {
        eventText = dateIterator.toDateString();
        
        dayTooltip = document.createElement("span");
        dayTooltip.classList.add("tooltiptext");

        dayDiv = document.createElement("div");
        dayDiv.classList.add("day");
        
        if(dateIterator > today) {
            dayDiv.classList.add("future");
        }

        if(equalsDay(dateIterator,9,14,1992)) {
            eventText+="\nI was born!";
            dayDiv.classList.add("event");
        } else if(dateIterator.getMonth()+1 === 9 && dateIterator.getDate() === 14 && dateIterator.getFullYear() > 1992 && dateIterator <= today) {
            // my birthday!
            eventText += `\nMy ${humanize(dateIterator.getFullYear()-1992)} birthday!`; 
            dayDiv.classList.add("event");
        }

        customEventText = getEventForDay(dateIterator);
        if(customEventText !== '') {
            eventText += customEventText;
            dayDiv.classList.add("event");
        }

        dayTooltip.appendChild(document.createTextNode(eventText));
        dayDiv.appendChild(dayTooltip);

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
    tooltips.forEach(function(tooltip, index) {
        tooltip.addEventListener("mouseenter", positionTooltip);
        tooltip.addEventListener("touchstart", positionTooltip);
    });
}

function positionTooltip() {
    // 'this' will refence the div.day node that contains the tooltiptext
    let tooltipTextElem = this.querySelector(".tooltiptext");
    let boundingRect = this.getBoundingClientRect();

    let tipX = boundingRect.width + 5; 
    let tipY = -20; 
    // Position tooltip
    tooltipTextElem.style.top = tipY + 'px';
    tooltipTextElem.style.left = tipX + 'px';

    let tooltipRect = tooltipTextElem.getBoundingClientRect();

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
    tooltipTextElem.style.top = tipY + 'px';
    tooltipTextElem.style.left = tipX + 'px';
}

main();

