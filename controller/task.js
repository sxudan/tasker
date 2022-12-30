import admin from 'firebase-admin'
import database from '../model/database.js'

const getTasks = async (uid) => {
    const taskRef = admin.firestore().collection('tasks').where('postedBy', '!=', uid)
    const tasksColl = await taskRef.get()

    const allUsersData = await database.users.getAllUsers()
    const offers = await database.offers.getAllOffers(uid)

    // const offerRef = admin.firestore().collection('offers').where('offer_by','==', uid)
    // const offersColl = await offerRef.get()
    // const offers = offersColl.docs.map(d => d.data())

    var tasks = []
    for(const t of tasksColl.docs) {
        const offer = offers.filter((f) => f['task_id'] == t.id)[0] ?? null
        const taskData = t.data()
        const user = allUsersData.filter((f) => f.id == taskData['postedBy'])[0] ?? {}
        tasks.push({...t.data(), postedBy: user, taskId: t.id, tag: 'task', isPosted: false, myOffer: (offer != null) ? {...offer,offer_by: user} : null})
    }
    return tasks
}

const getMyTask = async (uid) => {
    // const offerRef = admin.firestore().collection('offers').where('offer_by', '==', uid)
    // const offs = await offerRef.get()
    const allTaskRef = admin.firestore().collection('tasks')
    const allTaskColl = await allTaskRef.get()
    const allTaskData = allTaskColl.docs.map((t) => {
        return {...t.data(), taskId: t.id}
    })

    const myTaskRef = admin.firestore().collection('tasks').where('postedBy', '==', uid)
    const myTasksColl = await myTaskRef.get()
    const postedTasksData = myTasksColl.docs.map((t) => {
        return {...t.data(), taskId: t.id}
    })

    const allOfferData = await database.offers.getAllOffers(uid)
    const allUsers = await database.users.getAllUsers()
    const myProfile = allUsers.filter((f) => f.id == uid)[0] ?? null

    const postedTasks = postedTasksData.map((p) => {
        return {...p, offer_by: undefined, postedBy: myProfile ,tag: 'task', isPosted: true}
    })

    const offeredTasks = allOfferData.map((offer) => {
        const f_offeredTask = allTaskData.filter((f) => f.taskId == offer['task_id'])[0] ?? null
        const profile = allUsers.filter((f) => f.id == f_offeredTask['postedBy'])[0]
        return {...f_offeredTask, ...offer, offer_by: undefined, postedBy: profile, isPosted: false, tag: 'offer'}
    })

    // for(const offer of offs.docs) {
    //     const offerData = offer.data()
    //     const taskRef =   admin.firestore().collection('tasks')
    //     const taskDoc =  await taskRef.doc(offerData['task_id']).get()
    //     const taskData = taskDoc.data()
    //     const userDoc = await admin.firestore().collection('users').doc(taskData['postedBy']).get()
    //     myTasks.push({...offerData,offer_by: undefined, ...taskData, taskId: offerData['task_id'], postedBy: {...userDoc.data(), id: taskData['postedBy']},isPosted: false, tag: 'offer'})
    // }
    // for(const mtask of myTasksColl.docs) {
    //     const mtaskData = mtask.data()
    //     const userDoc = await admin.firestore().collection('users').doc(mtaskData['postedBy']).get()
    //     // const receivedOffers = await offerController.getOffers(uid, mtask.id)
    //     // myTasks.push({...mtaskData,taskId: mtask.id,  postedBy: {...userDoc.data(), id: mtaskData['postedBy']}, tag: 'task', isPosted: true})
    //     myTasks.push({...mtaskData,taskId: mtask.id,  postedBy: myProfile, tag: 'task', isPosted: true})
        
    // }
    var lists = postedTasks.concat(offeredTasks)
    return lists
}

const postTask = async (task, uid) => {
    await database.tasks.add({...task, postedBy: uid, postedAt: Date.now(), status: 'open'})
}

export default {getTasks, getMyTask, postTask}