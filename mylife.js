const lifeContainer = document.getElementById("life-container");

let dateIterator = new Date("09/14/1992");
let endDate = new Date("01/01/2070");
let today = new Date();

let eventText = '';
let birthday = 0;

function humanize(number) {
    if(number % 100 >= 11 && number % 100 <= 13) return number + "th";
    switch(number % 10) {
      case 1: return number + "st";
      case 2: return number + "nd";
      case 3: return number + "rd";
    }
    return number + "th";
}

function buildDayList() {
    let dayDiv;
    let dayTooltip;
    let textPre;
    let addedEvent;

    while(dateIterator < endDate) {
        addedEvent = false;
        eventText = dateIterator.toDateString();
        
        dayTooltip = document.createElement("span");
        dayTooltip.classList.add("tooltiptext");

        dayDiv = document.createElement("div");
        dayDiv.classList.add("day");
        
        if(dateIterator > today) {
            dayDiv.classList.add("future");
        }

        if(equalsDay(dateIterator,9,14,1992)) {
            console.log("Found my birthday");
            eventText+="\nI was born!";
            dayDiv.classList.add("event");
            addedEvent = true;
        }

        if(dateIterator.getMonth()+1 === 9 && dateIterator.getDate() === 14 && dateIterator.getFullYear() > 1992 && dateIterator <= today) {
            // my birthday!
            eventText += `\nMy ${humanize(dateIterator.getFullYear()-1992)} birthday!`; 
            dayDiv.classList.add("event");
        }

        textPre = document.createElement("pre");
        textPre.appendChild(document.createTextNode(eventText));
        dayTooltip.appendChild(textPre);
        dayDiv.appendChild(dayTooltip);

        lifeContainer.appendChild(dayDiv);

        dateIterator.setDate(dateIterator.getDate()+1);
    }

    console.log("Finished building day list");
}

function equalsDay(currentDate, month, day, year) {
    return currentDate.getDate()===day && currentDate.getMonth()+1===month && currentDate.getFullYear() === year;
}

buildDayList();

