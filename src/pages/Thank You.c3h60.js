import {sendCouponEmail} from 'backend/triggeredEmails'
import {local, session} from 'wix-storage'

$w.onReady(function () {
	// let avatarId = session.getItem("avatarId")
	// let prize = local.getItem("prize")
	// sendCouponEmail(avatarId, prize )
});

/**
*	Adds an event handler that runs when an element is displayed
 in the viewable part of the current window.
	[Read more](https://www.wix.com/corvid/reference/$w.ViewportMixin.html#onViewportEnter)
*	 @param {$w.Event} event
*/
export function text3_viewportEnter(event) {
	let avatarId = session.getItem("avatarId")
	let prize = local.getItem("prize")
	sendCouponEmail(avatarId, prize )
}