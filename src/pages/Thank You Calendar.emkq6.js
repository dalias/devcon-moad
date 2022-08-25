import wixLocation from 'wix-location';
import { local, session } from 'wix-storage';
import _ from 'lodash'
import { sendBookingEmail } from 'backend/triggeredEmails'

const NYC_TIMEZONE = 'America/New_York';
const VENUE_ADDRESS = '541+W+25th+St,+New+York,+NY+10001';

const SPEAKER_CHOICE = local.getItem('chosenSpeaker');
const DRINK_CHOICE = local.getItem('chosenDrink');
const TIME_CHOICE = local.getItem('chosenTime');
const TIME_ISO_STRING = local.getItem('chosenTimeISOString').replace(/[^\w\s]/gi, '');

$w.onReady(async function () {
    let description = getCalendarDescription(SPEAKER_CHOICE, DRINK_CHOICE, TIME_CHOICE);

    let DRINK_TEXT = "ON A"

    // HANDLE DRINK TEXT
    if (DRINK_CHOICE == "WINE") {
        DRINK_TEXT = "ON A GLASS OF "
    }
    if (DRINK_CHOICE == "BEER") {
        DRINK_TEXT = "ON A COLD BREW OF "
    }
    if (DRINK_CHOICE == "SOFT DRINK") {
        DRINK_TEXT = "ON A FIZZY "
    }

    // SET BOOKING SUMMARY TEXT ON PAGE
    $w('#toastText').text = 'A TOAST WITH: ' + SPEAKER_CHOICE.toUpperCase();
    $w('#drinkText').text = DRINK_TEXT + DRINK_CHOICE.toUpperCase();
    $w('#timeText').text = 'AT ' + TIME_CHOICE.toUpperCase();

    //SET CALENDAR LINK
    $w('#addToCalendarBtn').onClick(() => {
        console.log(getCalendarLink(toTitleCase(SPEAKER_CHOICE), TIME_ISO_STRING, NYC_TIMEZONE, description, VENUE_ADDRESS));
        wixLocation.to(getCalendarLink(toTitleCase(SPEAKER_CHOICE), TIME_ISO_STRING, NYC_TIMEZONE, description, VENUE_ADDRESS));
    });

});

function getCalendarLink(speakerName, dateISOString, timeZone, description, location) {
    const eventTitle = 'Wix DevCon: Your 1:1 with ' + speakerName;
    const baseURL = 'https://calendar.google.com/calendar/r/eventedit?';
    return baseURL + '&text=' + eventTitle + '&dates=' + dateISOString + '&ctz=' + timeZone +
        '&details=' + description + '&location=' + location;
}

function getCalendarDescription(speakerName, drinkChoice, time) {
    // copy probably needs editing 
    return 'A friendly reminder that your toast with ' + drinkChoice.toLowerCase() + ' is scheduled for ' +
        toTitleCase(speakerName) + ' is scheduled for ' + time +
        ' at Lavan 541. Have fun!';
}

function toTitleCase(str) {
    return _.startCase(_.toLower(str));
}

/**
*	Adds an event handler that runs when an element is displayed
 in the viewable part of the current window.
	[Read more](https://www.wix.com/corvid/reference/$w.ViewportMixin.html#onViewportEnter)
*	 @param {$w.Event} event
*/
export function text3_viewportEnter(event) {

    //SEND EMAIL
    let description = getCalendarDescription(SPEAKER_CHOICE, DRINK_CHOICE, TIME_CHOICE);
    const avatarId = session.getItem("avatarId")
    const calUrl = getCalendarLink(toTitleCase(SPEAKER_CHOICE), TIME_ISO_STRING, NYC_TIMEZONE, description, VENUE_ADDRESS)
    sendBookingEmail(avatarId, TIME_CHOICE, SPEAKER_CHOICE, calUrl)
    console.log(sendBookingEmail);
}