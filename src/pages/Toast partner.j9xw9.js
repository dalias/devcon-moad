import wixData from 'wix-data';
import wixBookings from 'wix-bookings';
import wixLocation from 'wix-location';
import _ from 'lodash'
import { session, local } from 'wix-storage'
import { getCustomerInfo } from 'backend/bookings'
const storesCollection = '@dali254/avatars-catalog/avatars_catalog'

const checkoutInfo = session.getItem('avatarId')

const drinkColor = '#FF7562'
const timeColor = '#C59DFF'
const defaultColor = '#CCCCCC'

let drinkOptions = [{
        "_id": "soft-drink",
        "drink": "SOFT DRINK"
    },
    {
        "_id": "wine",
        "drink": "WINE"
    },
    {
        "_id": "beer",
        "drink": "BEER"
    }
];
let serviceId
let chosenDrink
let bookingForm
let slotData
let populateFormFields
let formFields = []
let formFieldValues = []
let servicesMap = {}
let services

$w.onReady(async function () {
    // let toast = local.getItem('TOAST')
    // if (!toast) {
    //     $w('#bookingsStates').hide()
    //     $w('#errorMsg').show()
    // } else {
    //     $w('#bookingsStates').show()
    //     $w('#errorMsg').hide()
    // }

    $w('#drinkRepeater').data = drinkOptions;

    init()
    hoverAction('#selectDrink', drinkColor)
    hoverAction('#selectTime', timeColor)
    speakerHover()
    hoverRepeater()
    handleCheckout()

    // ----------------MultiStateBox-----------------

    $w('#toStep2').onClick(async () => {

        bookingForm = populateFormFields

        bookingForm.forEach(field => {
            formFields.push({
                "formId": field._id,
                "formLabel": field.label
            })
        });

        let availability = await wixBookings.getServiceAvailability(serviceId)
        let slots = availability.slots;
        $w('#timeRepeater').data = slots
        $w('#bookingsStates').changeState("drinkState")
    })

    $w('#toStep3').onClick(() => {
        $w('#bookingsStates').changeState("timeState")
    })

    $w('#backToStep2').onClick(() => {
        slotData = ''
        $w('#bookingsStates').changeState("drinkState")
    })
    $w('#backToStep1').onClick(() => {
        formFields = []
        bookingForm = ''
        $w('#bookingsStates').changeState('speakerState')
    })

});

// ----------------Init Reapeaters-----------------

async function init() {
    services = await appendImage()
    services.forEach(service => servicesMap[service.multireference[0]._id] = service);
    let d = await getAvailSessions(services)
    return d
}

async function getAllSessions() {
    const initdata = await wixData.query("Bookings/Services").find();
    const data = initdata.items
    return data
}

async function appendImage(availServices) {
    let altImages = await wixData.query('BookingPics').include('multireference').find()
    let altImage = altImages.items

    $w('#speakerRepeater').data = altImage
    return altImage
}

async function getAvailSessions(services) {
    let slotsPromises = [];
    let avilService = []
    services.forEach(requestedservice => {
        const slotsPromise = wixBookings.getServiceAvailability(requestedservice.multireference[0]._id).then(result => {
            if (result.slots.length < 4) {
                avilService.push(requestedservice)
            }
        });
        slotsPromises.push(slotsPromise);
    });
    await Promise.all(slotsPromises);

    $w('#speakerRepeater').data = avilService
    return avilService
}

// ----------------Style-----------------
function clearStyle(repeaterId, selectionId, checkId, overlayId) {
    $w(repeaterId).forEachItem(($item) => {
        if (selectionId == "#selectSpeaker") {
            $item(selectionId).style.backgroundColor = "rgba(0, 0, 0, 0)"
            $item('#clickedSpeakerImage').hide()
            $item('#altSpeakerImage').hide()
        } else {
            $item(selectionId).style.backgroundColor = defaultColor
        }
        $item(checkId).hide()
        if (overlayId) {
            $item(overlayId).hide()
        }
    })
}

function speakerHover() {
    $w('#selectSpeaker').onMouseIn((event) => {
        let $item = $w.at(event.context);
        $item('#altSpeakerImage').show()
    })
    $w('#selectSpeaker').onMouseOut((event) => {
        let $item = $w.at(event.context);
        $item('#altSpeakerImage').hide()
    })
}

function hoverAction(selectId, color) {
    $w(selectId).onMouseIn((event) => {
        let $item = $w.at(event.context);
        $item(selectId).style.backgroundColor = color
    })
    $w(selectId).onMouseOut((event) => {
        let $item = $w.at(event.context);
        $item(selectId).style.backgroundColor = defaultColor
    })
}

function hoverRepeater() {
    $w('Repeater').onMouseIn(() => {
        $w('#selectDrink').style.backgroundColor = defaultColor
        $w('#selectTime').style.backgroundColor = defaultColor
        $w('#altSpeakerImage').hide()
    })
}

// ----------------Helpers-----------------
function getTimeOfDay(date) {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }).toLowerCase();
}

async function getSpeakerName(staffMemberId) {
    let speaker = await wixData.get('Bookings/Staff', staffMemberId);
    return speaker.name;
}

// ----------------Repeaters-----------------
export function speakerRepeater_itemReady_1($item, itemData) {
    $item('#clickedSpeakerImage').src = itemData.altImage
    $item('#altSpeakerImage').src = itemData.altImage

    $item('#speakerImage').src = itemData.multireference[0].imageURL
    $item('#name').text = itemData.multireference[0].serviceName
    $item('#title').text = itemData.multireference[0].tagLine

    $item('#selectSpeaker').onClick(() => {
        $w('#toStep2').enable()
        serviceId = itemData.multireference[0]._id
        populateFormFields = itemData.multireference[0].form.fields
        console.log('populateFormFields', populateFormFields);

        if ($item('#speakerCheck').hidden) {
            clearStyle("#speakerRepeater", '#selectSpeaker', '#speakerCheck')
            $item('#speakerCheck').show()
            $item('#clickedSpeakerImage').show()
        } else {
            clearStyle("#speakerRepeater", '#selectSpeaker', '#speakerCheck')
            $item('#speakerCheck').hide()
            $item('#clickedSpeakerImage').hide()
        }
    })
}

export function timeRepeater_itemReady($item, itemData) {
    $item('#timeSlot').text = getTimeOfDay(itemData.startDateTime)

    $item('#selectTime').onClick(() => {
        slotData = itemData
        if ($item('#timeCheck').hidden) {
            clearStyle("#timeRepeater", '#selectTime', '#timeCheck', '#timeOverlay')
            $item('#timeCheck').show()
            $item('#timeOverlay').show()
        } else {
            clearStyle("#timeRepeater", '#selectTime', '#timeCheck', '#timeOverlay')
            $item("#timeCheck").hide()
            $item('#timeOverlay').hide()
        }
        $w('#confirmBooking').enable()
    })
}

export function drinkRepeater_itemReady($item, itemData) {
    $item('#drink').text = itemData.drink
    const drinkCheck = $item('#drinkCheck')
    const drinkOverlay = $item('#drinkOverlay')
    $item('#selectDrink').onClick(() => {
        $w('#toStep3').enable()
        chosenDrink = itemData.drink
        console.log('drink', chosenDrink);
        if (drinkCheck.hidden) {
            clearStyle("#drinkRepeater", '#selectDrink', '#drinkCheck', '#drinkOverlay')
            drinkCheck.show()
            drinkOverlay.show()
        } else {
            clearStyle("#drinkRepeater", '#selectDrink', '#drinkCheck', '#drinkOverlay')
            drinkCheck.hide()
            drinkOverlay.hide()
        }

    })
}

async function handleCheckout() {
    $w('#confirmBooking').onClick(async () => {
        // SET CHOICES FOR THANK YOU PAGE
        let chosenSpeaker = await getSpeakerName(slotData.staffMemberId);

        console.log('time: ' + slotData.startDateTime);
        console.log('iso: ' + slotData.startDateTime.toISOString());

        local.setItem('chosenDrink', chosenDrink);
        local.setItem('chosenTimeISOString', slotData.startDateTime.toISOString() + '/' + slotData.endDateTime.toISOString());
        local.setItem('chosenTime', getTimeOfDay(slotData.startDateTime));
        local.setItem('chosenSpeaker', chosenSpeaker);

        // let formFieldValues = await getCustomerInfo(checkoutInfo, chosenDrink)
        // let checkoutInfo = "09e49be4-cefb-4197-9b59-6b50a3eb32e9"
        let customerInfo = await wixData.query(storesCollection).eq("imageId", checkoutInfo).find()
        let customer = customerInfo.items[0]
        console.log('Customer:', customer);

        //  FORM CONFIRMATION
        let formFieldValues = [{
            "_id": "00000000-0000-0000-0000-000000000001", // name field ID
            "value": customer.name
        }, {
            "_id": "00000000-0000-0000-0000-000000000002", // email field ID
            "value": customer.email
        }];
        formFieldValues.push({
            '_id': "40c2ed7b-3f83-44a7-ade8-16c206c5000c",
            'value': chosenDrink,
        })
        let bookingInfo = {
            "slot": slotData,
            "formFields": formFieldValues
        }
        // console.log('in confirm booking func CHOSEN SLOT:  ', slotData);
        // console.log('in confirm booking func FORM FIELD VALS:  ', formFieldValues);

        wixBookings.checkoutBooking(bookingInfo)
            .then((results) => {
                let id = results.bookingId;

                let status = results.status;
                if (status == 'confirmed') {
                    local.setItem('bookingId', id);

                    wixLocation.to('/thank-you-calendar')
                }
            });
    })

}