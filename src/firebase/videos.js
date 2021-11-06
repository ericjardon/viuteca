import { db, storage } from "../base"
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage'
import {
  doc,
  query,
  where,
  collection,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  updateDoc
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

controller.updateLikesCount = async (videoId, newLikes) => {
  const docRef = doc(db, "video", videoId);
  try {
    await updateDoc(docRef, {
      likes: newLikes
    })
    console.log("Updated likes", newLikes);
    return null
  } catch (err) {
    return {
      error: err
    }
  }
}

controller.createVideo = async (video) => {

  // Save to database
  try {
    const docRef = await addDoc(collection(db, "video"), video);
    return docRef;  // to access docRef.id
  }
  catch (err) {
    console.log("Error creating doc:", err);

    return {
      error: err
    };
  }

}

controller.deleteVideo = async (videoId) => {
  const docRef = doc(db, "video", videoId)
  console.log("Deleting video", videoId);
  try {
    console.log("Sí entró!!!!")
    await deleteDoc(docRef);
    return null
  } catch (err) {
    console.error("Error", err);
    return {
      error: err
    }
  }
}

controller.deleteImageFromStorage = async (videoId, fileUrl) => {
  console.log("deleting file at ", fileUrl)
  try {
    let fileRef = ref(storage, fileUrl);
    await fileRef.delete();
    return null;
  } catch (err) {
    console.log("Delete from storage error", err)
    return err;
  }  

}


controller.addImageToVideo = async (videoId, imageFile) => {
  console.log("Adding image to video", videoId);

  try {

    const videoRef = doc(db, "video", videoId);
    const video = await getDoc(videoRef);

    if (!video.exists()) {
      console.log("Video to add image not found")
      return {
        error: "Client side error: video id not found"
      };
    }
    // Delete from storage if image exists
    if (video.data().img) {
      await controller.deleteImageFromStorage(videoId, video.data().img);
      console.log("Post id has Existing image. Deleting from storage...")
    }

    // upload and update img url
    const {error, url} = await uploadImage(videoId, imageFile);
    
    if (error) return {
      error:error
    }

    if (url) {
      console.log("New image url", url)
      await updateDoc(videoRef, {
        img: url
      })
    }

    return {
      message: "La foto se guardó exitosamente."
    };

  } catch (err) {
    console.log("Storage Error", err.message);

    return {
      error: err
    }
  }

}


const uploadImage = async (videoId, imageFile) => {
  if (typeof(videoId) !== 'string') {
    console.log("Upload Image error: videoId is not string");
    return {
      error: "Upload Image error: videoId is not string",
      url: null
    }
  }

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

export default controller;
