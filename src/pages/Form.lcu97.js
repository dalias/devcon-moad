import { session, local } from 'wix-storage';
import wixLocation from 'wix-location';
import wixData from 'wix-data'
import { sendPurchaseEmail } from 'backend/triggeredEmails'

const avatarId = session.getItem("avatarId")

$w.onReady(function () {
    local.removeItem('inPerson')
    // avatarId = session.getItem("avatarId");
    $w('#formBlock').imageID = avatarId
});

/**
 *	
 */
export function formBlock_previousPage() {
    return wixLocation.to('/generator')
}

/**
 *	
 */
export async function formBlock_purchaseId() {
    let purchaseId = $w('#formBlock').purchaseId
    console.log('purchaseId', purchaseId);

    let formdata = await wixData.query('@dali254/avatars-catalog/avatars_catalog').eq('_id', purchaseId).find()
    let data = formdata.items[0]
    local.setItem('inPerson', data.isInPerson)

    // let avatarId = session.getItem("avatarId")
    return sendPurchaseEmail(avatarId)
}

/**
 *	
 */
export function formBlock_checkout() {
    $w('#loadingSection').expand()
    $w('#section9').collapse()
    setTimeout(() => {
        return wixLocation.to("/wheel")
    }, 7000);
}