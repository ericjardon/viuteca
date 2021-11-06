import { db } from "../base"
import {
  doc,
  query,
  where,
  collection,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc
} from 'firebase/firestore';

const controller = {}

controller.getVideoById = async (videoId) => {
  const docRef = doc(db, "video", videoId);
  const video = await getDoc(docRef);

  if (video.exists()) {
    return (video.data());
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
    return {
      error: "No existe el video especificado."
    }
  }
}

controller.getAllVideos = async () => {
  let videos = [];

  const querySnapshot = await getDocs(collection(db, "video"));
  querySnapshot.forEach((doc) => {
    let video = {
      id: doc.id,
      data: doc.data()
    }
    videos.push(video)
  });
  console.log(videos);
  return videos;
}


controller.getVideosFromOwner = async (emailId) => {

  try {
    console.log("Get videos from", emailId);
    const q = query(collection(db, "video"), where("owner", "==", emailId));
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
    console.log("No such owner email", emailId);
    return []
  }
}

controller.createVideo = async (video) => {
  // use .add to auto generate an Id
  const result = {
    ok: null,
    error: null,
    data: null,
  }

  // Save to database
  try {
    const docRef = await addDoc(collection(db, "video"), video);
    return docRef;
  }
  catch (err) {
    console.log("Error setting doc:", err);
    result.error = err;
    return result
  }

}

controller.deleteVideo = async (videoId) => {
  const docRef = doc(db, "videos", videoId)
  console.log("Deleting video", videoId);
  try {
    await deleteDoc(docRef);
    return null
  } catch (err) {
    return {
      error: err
    }
  }
}

export default controller;
