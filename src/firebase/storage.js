/* Firebase Storage Manager */
import { db, storage } from "../base"
import {getDownloadURL, ref, uploadBytes, deleteObject} from 'firebase/storage'
import {
  doc,
  query,
  where,
  collection,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  updateDoc,
  orderBy
} from 'firebase/firestore';


/* ======== IMAGES ======== */

export const uploadImagePG = async (videoId, imageFile) => {
    // Stored in a folder named with the video id from PG
    console.log("Type of PG id", typeof videoId);
  
    try {
        const fileRef = ref(storage, 'thumbnails/'+videoId+'/'+imageFile.name);
        console.log("Storage reference: ", fileRef.fullPath);
        await uploadBytes(fileRef, imageFile);
        const url = await getDownloadURL(fileRef);
        console.log("Saved succesfully to Storage.");
        return {error: null, url: url};
  
    } catch (err) {
        console.error(err);
        return {error: err, url: null};
    }
  }


export const deleteImageFromStorage = async (videoId, fileUrl) => {
    console.log("deleting file at ", fileUrl)
    try {
      let fileRef = ref(storage, fileUrl);
      await deleteObject(fileRef);
      return null;
    } catch (err) {
      console.log("Delete from storage error", err)
      return err;
    }  
}