import wixLocation from 'wix-location';
import { session } from 'wix-storage';

let id

$w.onReady(async function () {

});

async function toNextPage() {
    $w('#titleSection').collapse()
    setTimeout(function () {
    console.log('COLLAPSE');

    }, 4000)
    wixLocation.to('/form')

}



/**
 *	sends final png to the site
 */
export function generator1_exportSvg() {
	 id = $w('#generator1').avatarId
    let sessionId =  id
    session.setItem("avatarId", sessionId);
     toNextPage()
}