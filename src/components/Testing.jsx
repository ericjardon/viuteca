import React, { useState } from 'react'
import Group from '../firebase/groups'
//import {auth} from '../base'
import authManager from '../firebase/authManager'
import useLogin from '../hooks/useLogin'
import { doc, addDoc, collection, Timestamp } from 'firebase/firestore'
import { auth, db } from '../base'


export default function Testing() {

    const loggedIn = useLogin();

    const [videoForm, setVideoForm] = useState({
        title: '',
        description: '',
        url: '',
        durationMins: 0,
        durationSecs: 0,
    })

    /*
    title: 'El Billete Informativo',
    description: 'No description yet',
    url: 'https://drive.google.com/file/d/19IOHhxfbltluAro_kAeBllczMy7NxtdJ/preview',
    durationMins: 7,
    durationSecs: 2,
    */

    const getGroup = async () => {
        console.log("Get group...")
        const groupId = 'geebproject@gmail.com'
        const group = {
            name: 'Hello Group'
        }
        const resp = await Group.createGroup(groupId, group);
        console.log("Response:")
        console.log(resp)
    }

    const logOut = async () => {
        const res = await authManager.logOut();
        console.log("Response", res);
    }

    const logIn = async () => {
        await authManager.signIn("geebproject@gmail.com", "123456")
    }

    const submitVideo = async () => {
        if (!loggedIn) return;

        console.log("submitting video")

        /* let video = {
            ...videoForm,
            owner: auth.currentUser.email,
            likes: 0,
            dateAdded: Timestamp.fromDate(new Date()),
        } */

        let video = {
            title: 'El Billete Informativo',
            description: 'No description yet',
            url: 'https://drive.google.com/file/d/19IOHhxfbltluAro_kAeBllczMy7NxtdJ/preview',
            durationMins: 7,
            durationSecs: 2,
            likes: 0,
            dateAdded: Timestamp.fromDate(new Date()),
            owner: auth.currentUser.email,
        }

        try {
            const docRef = await addDoc(collection(db, "video"), video);
            console.log(docRef.id);
        } catch (err) {
            console.log("ERROR: ", err)
        }
    }

    return (
        <div style={{ display: 'block' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px', width: '100vw', backgroundColor: 'green' }}>
                <button onClick={getGroup}>Check existing Group</button>
                {loggedIn ? <button onClick={logOut}>Log out</button>
                    : <button onClick={logIn}>Log In GEEB</button>}
                <p>User is signed in? {loggedIn.toString()}</p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px', width: '100vw', backgroundColor: 'green' }}>
                Título
                <input type="text" name="title" />
                Duración
                <input type="text" name="duration" />
                Descripción
                <input type="text" name="description" />
                Video URL
                <input type="text" name="url" />
                <button onClick={submitVideo}>Submit Video</button>
            </div>
        </div>
    )
}
