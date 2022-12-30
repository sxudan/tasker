import admin from 'firebase-admin'


const getOffers = async (uid, taskId) => {
    const offerRef = admin.firestore().collection('offers').where('task_id', '==', taskId).orderBy('offer_at', 'desc')
    const offs = await offerRef.get()
    console.log(offs.docs)
    var offers = []
    for(const offer of offs.docs) {
        const offerData = offer.data()
        const userDoc = await admin.firestore().collection('users').doc(offerData['offer_by']).get()
        offers.push({...offerData, offer_by: {...userDoc.data(), id: offerData['offer_by']}})
    }
    return offers
}

const makeOffer = async (uid, offer) => {
    const offerRef = admin.firestore().collection('offers')
    await offerRef.add({...offer, offer_status: 'pending', offer_at: Date.now()})
}

export default {getOffers, makeOffer}