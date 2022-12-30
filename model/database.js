import admin from 'firebase-admin'

const database = {
    users: {
        getAllUsers : async () => {
            const userRef = admin.firestore().collection('users')
            const all_users_coll = await userRef.get()
            const allUsersData = all_users_coll.docs.map(u => {
                return {...u.data(), id: u.id}
            })
            return allUsersData
        }
    },
    offers: {
        getAllOffers : async (uid) => {
            const offerRef = admin.firestore().collection('offers').where('offer_by','==', uid)
            const all_offer_ref = await offerRef.get()
            const allOfferData = all_offer_ref.docs.map(u => {
                return u.data()
            })
            return allOfferData
        }
    },
    tasks: {
        add: async (task) => {
            await admin.firestore().collection('tasks').add(task)
        }
    }
}

export default database