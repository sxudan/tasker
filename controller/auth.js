// var admin = require("firebase-admin");
// const { getAuth } = require('firebase-admin/auth');
import admin from 'firebase-admin'
const login = async (uid) => {
    try {
        const data = await admin.auth().getUser(uid)
        const user = await admin.firestore().collection('users').doc(uid).get()
        
        return {
            'email': data.email,
            ...user.data(),
            'id': uid
        }
    } catch(error) {
        return null
    }
}

export default {login}