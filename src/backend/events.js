/*****************
 backend/events.js
 *****************

 'backend/events.js' is a reserved Velo file that enables you to handle backend events.

 Many of the Velo backend modules, like 'wix-stores-backend' or 'wix-media-backend', include events that are triggered when 
 specific actions occur on your site. You can write code that runs when these actions occur.

 For example, you can write code that sends a custom email to a customer when they pay for a store order.

 Example: Use the function below to capture the event of a file being uploaded to the Media Manager:

   export function wixMediaManager_onFileUploaded(event) {
       console.log('The file "' + event.fileInfo.fileName + '" was uploaded to the Media Manager');
   }

 ---
 More about Velo Backend Events: 
 https://support.wix.com/en/article/velo-backend-events

*******************/
import wixData from 'wix-data';
import wixCrmBackend from 'wix-crm-backend';
import _ from 'lodash'

const avatarBlockCollection = '@karenatwix/avatargenerator/FinalAvatars'

export async function wixCrm_onContactCreated(event) {
    console.log(`onContactCreated was called with event: ${JSON.stringify(event)}`)
    const contactId = event.metadata.entityId;
    const contactEmail = event.entity.primaryInfo.email

    const avatarCatalogResults = await wixData.query('@dali254/avatars-catalog/avatars_catalog')
        .eq('email', contactEmail)
        .find()

    const avatarId = avatarCatalogResults.items[0].imageId

    const avatarsResults = await wixData.query(avatarBlockCollection)
        .eq('_id', avatarId)
        .find()
    const downloadLink = avatarsResults.items[0].downloadUrl

    console.log(`sending email from event with contactId: ${contactId} and email: ${contactEmail} and downloadLink: ${downloadLink} `)

    wixCrmBackend.triggeredEmails.emailContact('TF91blZ', contactId, {
        "variables": {
            "downloadLink": downloadLink
        }
    });
}

const NYC_TIMEZONE = 'America/New_York';
const VENUE_ADDRESS = '541+W+25th+St,+New+York,+NY+10001';
export function wixBookings_onBookingConfirmed(event) {
  const eventTrigger = event.trigger;
  const bookingId = event.booking._id;
  const time = event.booking.bookedEntity.sessionId.start
  const speaker = event.booking.bookedEntity.title
  const drink = event.booking.formInfo.additionalFields.drinkChoice
    let description = getCalendarDescription(speaker, drink, time);
const calendarLink = getCalendarLink(toTitleCase(speaker), time, NYC_TIMEZONE, description, VENUE_ADDRESS)

   const contactId = event.metadata.entityId;
    const contactEmail = event.entity.primaryInfo.Email

      wixCrmBackend.triggeredEmails.emailContact('TFIEtH3', contactId, {
       variables: {
                start_date: time,
                online_conference_url: calendarLink,
                staff_member_name: speaker
            }
    });


}


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