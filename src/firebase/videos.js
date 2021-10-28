import { db } from "../base"
import {doc, setDoc, collection, getDocs, getDoc} from 'firebase/firestore';

const controller = {}


controller.getVideoByIdTest = async () => {
    let videoId = "LKKJI8FRWhSvrb4UBsoD";
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
  let groups = []; 
  
  const querySnapshot = await getDocs(collection(db, "video"));
  querySnapshot.forEach((doc) => {
    let group = {
      id : doc.id,
      data : doc.data()
    }
    groups.push(group)
  });
  console.log(groups);
  return groups;
}

export default controller;