import { db } from "../base"

const controller = {}

controller.createGroup = async (groupId, group) => {
    // use .add to auto generate an Id
    const response = {
        ok: null,
        error: null,
        data: null,
    }

    const ref = db.collection("groups").doc(groupId);
    const doc_ = await ref.get()
    // verify syntax: https://firebase.google.com/docs/firestore/query-data/get-data#web-version-8_1
    if (doc_.exists) {
        response.error = "El corre ya está registrado"
        return response;
    }

    ref.set(
        group
    )
    .then( newDoc => {
        console.log("New group", group.name, "inserted succesfully");
        response.ok = "New group " + group.name + " inserted succesfully"
        response.data = newDoc
        return response
    })
    .catch(err => {
        console.log("Error:", err);
        response.error = err;
        return response;
    })
}

controller.getGroups = () => {

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