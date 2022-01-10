import { db } from "../base"
import { doc, setDoc, getDoc } from 'firebase/firestore'


const controller = {}

controller.createGroup = async (groupId, group) => {
    // use .add to auto generate an Id
    const result = {
        ok: null,
        error: null,
        data: null,
    }

    const docRef = doc(db, 'groups', groupId);

    // Verify account is not taken
    const doc_ = await getDoc(docRef);
    if (doc_.exists()) {
        result.error = "Este correo ya está registrado con otra cuenta. Intenta con otro."
        return result;
    }

    // Save to database
    try {
        group.name_lower = group.name.toLowerCase();
        // setDoc does not return anything
        await setDoc(doc(db, "groups", groupId), group)
        result.ok = true
        return result;
    }
    catch (err) {
        console.log("Error setting doc:", err);
        result.error = err;
        return result
    }

}

controller.getAllGroups = () => {

    const result = {
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

            result.ok = true;
            result.data = groups;
            return result;
        }
        )
        .catch(err => {
            result.error = err;
            return result
        })
}

controller.getGroupById = async (emailId) => {
    const docRef = doc(db, "groups", emailId);
    const group = await getDoc(docRef);

    if (group.exists()) {
        return (group.data());
    } else {
        return {
            error: "El grupo especificado no existe",
        }
    }
}


controller.updateGroup = async (groupId, data) => {
    // use Set to use previous id
    const result = {}

    // .set does not return anything
    try {
        await db.collection("groups").doc(groupId)
            .set(data);
        result.ok = true;
        console.log("Firebase updated ->\n", data)
        return result;
    } catch (error) {
        console.log("Firebase error:", error);
        result.error = error;
        return result;
    }

}


export default controller;