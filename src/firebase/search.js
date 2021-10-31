import { db } from "../base"
import { collection, query, where, getDocs } from 'firebase/firestore'
import Video from './videos'
import Group from './groups'

/* COLLECTION REFERENCES */
const videos = collection(db, "video");
const groups = collection(db, "groups");


/* SEARCHING FUNCTIONS */
const searchVideosByTitle = async (title) => {

    const q = query(videos, where("title", "==", title));
    const querySnapshot = await getDocs(q);

    let results = [];
    querySnapshot.forEach((doc) => {
        let video = {
            id: doc.id,
            data: doc.data()
        }
        results.push(video)
    });
    return results;
}

const searchVideosByOwner = async (ownerName) => {

    if (ownerName === null || ownerName === undefined) {
        return []
    }

    if (ownerName.trim() === "") {
        return await Video.getAllVideos();
    }

    ownerName = ownerName.toLowerCase();
    console.log("name_lower", ownerName);
    const ownerquery = query(groups, where("name_lower", "==", ownerName));
    const ownerSnapshot = await getDocs(ownerquery);

    try {
        const ownerEmails = ownerSnapshot.docs.map(d => d.id);
        console.log("ownerEmail", ownerEmails)
        const q = query(videos, where("owner", "in", ownerEmails));
        const querySnapshot = await getDocs(q);
        let results = [];
        querySnapshot.forEach((doc) => {
            let video = {
                id: doc.id,
                data: doc.data()
            }
            results.push(video)
        });
        return results;
    } catch (err) {
        console.log("Search error:", err);
        console.log("No such owner", ownerName);
        return []
    }
}


export const searchVideo = async (searchType, searchTerm) => {
    console.log(`Searching for ${searchType}: "${searchTerm}"`)
    if (searchType === "title") {
        return await searchVideosByTitle(searchTerm);
    }

    else if (searchType === "owner") {
        // map owner (name) to video.owner (email)
        return await searchVideosByOwner(searchTerm);
    }

    /* else {
        return await Video.getAllVideos(); 
    } */
}