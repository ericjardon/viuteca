import { db } from "../base"
import {doc, setDoc, getDoc} from 'firebase/firestore'

const controller = {}

controller.createGroup = async (groupId, group) => {
    // use .add to auto generate an Id
    const response = {
        ok: null,
        error: null,
        data: null,
    }

    const docRef = doc(db, 'groups', groupId);
    
    // Verify account is not taken
    const doc_ = await getDoc(docRef);
    if (doc_.exists()) {
        response.error = "Este correo ya está registrado con otra cuenta. Intenta con otro."
        return response;
    }

    // Save to database
    try{
        // setDoc does not return anything
        await setDoc(doc(db, "groups", groupId), group)
        response.ok = true
        return response;
    }
    catch (err) {
        console.log("Error setting doc:", err);
        response.error = err;
        return response
    }
    
}

controller.getAllGroups = () => {

    const response = {
        ok: null,
        error: null,
        data: null,
    }

    db.collection("groups").get()
    .then(data => {
            let groups = []

            data.forEach(doc => {
                console.log(`${doc.id} => ${doc.data()}`);
                groups.push(doc.data())
            })

            response.ok = true;
            response.data = groups;
            return response;
        }
    )
    .catch(err => {
        response.error = err;
        return response
    })
}

controller.updateGroup = async (groupId, newData) => {
    // use Set to use previous id
    const response = {
        ok: null,
        error: null,
    }

    // .set does not return anything
    try {
        await db.collection("groups").doc(groupId)
        .set(newData)
        response.ok = true;
        return response;

    } catch (error) {
        response.error = error;
        return response;
    }

}


export default controller;