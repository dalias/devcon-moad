import { getAvatarImage, myGetDownloadUrl } from 'backend/uploadSvg'
import { session, local } from 'wix-storage'
import wixLocation from 'wix-location';
import wixWindow from 'wix-window';

$w.onReady(async function () {
    let inPerson = local.getItem('inPerson')
    if (inPerson == 'true') {
        $w('#section6').expand()
        $w('#section7').expand()

    } else {
        $w('#section6').collapse()
        $w('#section7').collapse()
    }

    let checkSpin = session.getItem("hasSpun")
    if (checkSpin === 'true') {
        $w('#section6').collapse()
        $w('#section7').collapse()
        session.setItem("hasSpun", 'true');
    } else {
        session.setItem("hasSpun", 'false');
    }

    let avatarID = session.getItem('avatarId')
    let avatarImg = await getAvatarImage(avatarID)

    if (avatarImg) {
        let downloadLink = await myGetDownloadUrl(avatarImg)
        $w('#avatarPreview').src = avatarImg
        $w('#downloadButton').link = downloadLink
    }

})

/**
*	sends prize after spun

*/
export function spinWheel_prize() {
    local.setItem('prize', $w('#spinWheel').prize)
    if ($w('#spinWheel').prize == "Toast with a speaker") {
        local.setItem('TOAST', 'true')
        return wixLocation.to('/toast-partner')
    } else {
        return wixLocation.to('/thank-you')
    }
}

// export function customElement1_viewportEnter(event) {
//     $w('#spinWheel').scrollTo()
// }