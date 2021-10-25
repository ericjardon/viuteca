import { Spinner } from "reactstrap";
import React, { useState, useEffect } from 'react'
import styles from './styles/VideoDetail.module.scss'
import Video from '../firebase/videos'
import LikeButton from './LikeButton'

export default function VideoDetail(props) {

    const [video, setVideo] = useState({});
    const [loading, setLoading] = useState(true);
    const [likes, setLikes] = useState()

    useEffect(() => {
        const videoId = props.match.params.id;
        // fetch the data at videos.videoId in firestore
        console.log("Video id", videoId);
        async function fetchData() {
            const video = await Video.getVideoByIdTest();
            setVideo(video);
            setLikes(video.likes);
            setLoading(false);
            console.log("Video Likes:", video.likes)
            console.dir(video);
        }

        fetchData();
    }, []);

    const updateLikesCount = (val) => {
        setLikes(likes => likes + val);
    }

    if (loading) return (
        <div className={styles.container}>
            <Spinner children="" style={{ width: '15rem', height: '15rem' }} />
        </div>
    )

    return (
        <div className={styles.container}>
            <div className={styles.cardContainer}>
                <iframe src={video.url} width="640" height="480" allow="autoplay"></iframe>
                <div className={styles.videoInfo}>
                    <div className={styles.titleOwner}>
                        <p className={styles.videoTitle}>{video.title}</p>
                        <p className={styles.videoOwner}>{video.owner}</p>
                    </div>
                    <div className={styles.likesContainer}>
                        <LikeButton likesCount={likes} updateLikesCount={updateLikesCount}/>
                    </div>
                </div>

                <p>Descripción</p>
            </div>

        </div>
    )
}
