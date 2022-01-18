import { db } from "../base"
import { collection, 
    query, 
    where, 
    getDocs,
    orderBy,
    Timestamp
 } from 'firebase/firestore'
import Video from './videos'
import {fmtDate} from '../utils/dateFormatter'

/* COLLECTION REFERENCES */
const videos = collection(db, "video");
const groups = collection(db, "groups");


/* SEARCHING FUNCTIONS */
const searchVideosByTitle = async (title) => {
    title = title.toLowerCase()
    const q = query(videos, where("title_lower", "==", title), orderBy('dateAdded', 'desc'));
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
    console.log("owner query for name", ownerName);
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

const searchVideosByDateAdded = async (dateString) => {
    // Assumes date format is YYYY-MM-DD
    //dateString= "YYYY-MM-DDTHH:mm:ss. sssZ"
    console.log("Date received", dateString);
    let dateAdded = Timestamp.fromDate(new Date(dateString))

    const q = query(videos, where("dateAdded", "==", dateAdded));
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


export const searchVideo = async (searchType, searchTerm) => {
    console.log(`Searching for ${searchType}: "${searchTerm}"`)
    if (searchType === "title") {
        return await searchVideosByTitle(searchTerm);
    }

    else if (searchType === "owner") {
        // map owner (name) to video.owner (email)
        return await searchVideosByOwner(searchTerm);
    }

    else if (searchType === "date") {
        return await searchVideosByDateAdded(fmtDate(searchTerm));
    }

    // default
    else {
        console.log("Defaulting search to all videos")
        return await Video.getAllVideos(); 
    }
}