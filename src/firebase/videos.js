import { db } from "../base"
import {doc, collection, getDocs, getDoc, addDoc} from 'firebase/firestore';

const controller = {}



controller.getVideoById = async (videoId) => {
  const docRef = doc(db, "video", videoId);
  const video = await getDoc(docRef);
  
  if (video.exists()) {
    return (video.data());
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
    return {}
  }
}

controller.getAllVideos = async () => {
  let videos = []; 
  
  const querySnapshot = await getDocs(collection(db, "video"));
  querySnapshot.forEach((doc) => {
    let video = {
      id : doc.id,
      data : doc.data()
    }
    videos.push(video)
  });
  console.log(videos);
  return videos;
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

export default controller;