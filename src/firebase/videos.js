import { db } from "../base"
import {doc, setDoc, collection, getDocs, getDoc} from 'firebase/firestore';

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
      id : doc.id,
      data : doc.data()
    }
    videos.push(video)
  });
  console.log(videos);
  return videos;
}

export default controller;