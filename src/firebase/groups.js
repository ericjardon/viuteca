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


controller.updateGroup = async (groupData) => {
    // Expects {id, name, desc*, tags*}
    console.log("Received data in updateGroup", groupData);

    let newData = {
        name: groupData.name.trim(),
        name_lower: groupData.name.trim().toLowerCase(),
    }

    // TOFIX: Refactor the following; maybe add intermediate isEmpty() function
    if (groupData.desc) {
        newData.desc = groupData.desc.trim();
    }
    if (groupData.tags) {
        newData.tags = groupData.tags;
    }
    if (groupData.fb) {
        newData.fb = groupData.fb;
    }
    if (groupData.ig) {
        newData.ig = groupData.ig;
    }

    console.log("sending new data to firebase", newData);

    try {
        const groupRef = doc(db, 'groups', groupData.id);
        await setDoc(groupRef, newData);
        console.log("Firebase updated succesfully");
        return { ok: true };

    } catch (error) {
        console.log("Firebase error:", error);
        return { ok: false, error: error };
    }

}


export default controller;