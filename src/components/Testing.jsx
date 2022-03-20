import React, { useState } from 'react'
import Group from '../firebase/groups'
//import {auth} from '../base'
import authManager from '../firebase/authManager'
import useLogin from '../hooks/useLogin'
import { doc, addDoc, collection, Timestamp } from 'firebase/firestore'
import { auth, db } from '../base'
import { searchVideo } from '../firebase/search'
import {uids, _ownerNames} from '../utils/ids_temp'

const default_vid = 'https://www.youtube.com/embed/uolqbeCmSuw';

export default function Testing() {

    const loggedIn = useLogin();

    const [searchResults, setSearchResults] = useState([]);

    const [newVideo, setnewVideo] = useState({
        profile_id: '75Sm1S0fimXm9AzVsW7hbZqtbWH3',
        title: 'Test Title',
        dt: '2021-10-23',
        duration_mins:9,
        duration_secs:9,
        duration_hrs:null,
        description:'Test Desc',
        video_url: '',
        // likes, image_url
    })

    const handleInput = (e) => {
        let field = e.target.name;
        setnewVideo({
            ...newVideo,
            [field]: e.target.value,
        })
        console.log(newVideo);
    }

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

        console.log("submitting video:")
        console.dir(newVideo);

        let video = newVideo;

        if (!video.video_url) {
            video.video_url = default_vid;
        }
        // try {
        //     const docRef = await addDoc(collection(db, "video"), video);
        //     console.log(docRef.id);
        // } catch (err) {
        //     console.log("ERROR: ", err)
        // }

        // upload to postgres
        

    }

    const [searchTerm, setSearchTerm] = useState("");

    const searchByTitle = async (e) => {
        console.log("search title")
        if (searchTerm.trim() === "") {
            return;
        }
        const results = await searchVideo("title", searchTerm);
        console.log("results received", results)
        setSearchResults(results)
    }
    const searchByOwner = async (e) => {
        console.log("search owner")
        if (searchTerm.trim() === "") {
            return;
        }
        const results = await searchVideo("owner", searchTerm);
        console.log("results received", results)

        setSearchResults(results)
    }

    console.log(searchResults);
    console.log(searchTerm);
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
                Video URL
                <input type="text" name="url" />
                <button onClick={submitVideo}>Submit Video</button>
            </div>

            <div>
                
                <input type="text" name="searchByOwner" onChange={(e) => setSearchTerm(e.target.value)}/>
                <button onClick={searchByOwner}>Videos por Autor</button>
                
                <input type="text" name="searchByTitle" onChange={(e) => setSearchTerm(e.target.value)}/>
                <button onClick={searchByTitle}>Videos por Título</button>
            </div>
            <div>
            {searchResults.map((o, i) => (
                <p>Video {i}: {o.title} {o.owner} likes: {o.likes}</p>
            ))}
            </div>
        </div>
    )
}
