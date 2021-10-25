import { db } from "../base"
import {doc, setDoc, getDoc} from 'firebase/firestore'


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


export default controller;