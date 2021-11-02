import { Spinner, Collapse, Button, CardBody, Card } from "reactstrap";
import React, { useState, useEffect } from 'react'
import styles from './styles/VideoDetail.module.scss'
import Video from '../firebase/videos'
import Group from '../firebase/groups'
import LikeButton from './LikeButton'

export default function VideoDetail(props) {

    const [video, setVideo] = useState({});
    const [videoOwner, setVideoOwner] = useState("");
    const [loading, setLoading] = useState(true);
    const [likes, setLikes] = useState();
    const [toggleDescription, setToggleDescription] = useState(false);
    const [dateString, setDateString] = useState("");
    const [errorNotFound, seterrorNotFound] = useState(false);

    const toggle = () => {
        setToggleDescription(toggleDescription => !toggleDescription);
    }

    useEffect(() => {
        const videoId = props.match.params.id;
        // fetch the data at videos.videoId in firestore
        console.log("Video id", videoId);
        async function fetchData() {
            //const video = await Video.getVideoByIdTest();
            const video = await Video.getVideoById(videoId);
            if (video.error) {
                // does not exist
                setLoading(false)
                seterrorNotFound(video.error);
                return
            }
            const group = await Group.getGroupById(video.owner);
            setVideoOwner(group.name);
            setVideo(video);
            setLikes(video.likes);
            setLoading(false);
            console.log("Video Likes:", video.likes)
            console.dir(video);
            const date = video.dateAdded.toDate();
            const mm = date.toLocaleString("es-ES", { month: "long" });
            const dd = date.getDate();
            const yyyy = date.getFullYear();
            setDateString(mm + " " + dd + ", " + yyyy);
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

    if (errorNotFound !== null) return (
        <div className={styles.container}>
            {errorNotFound}
        </div>
    )

    return (
        <div className={styles.container}>
            <div className={styles.cardContainer}>
                <div className={styles.videoPlayer}>
                    <iframe src={video.url} className={styles.videoPlayer} allow="autoplay"></iframe>
                </div>
                <div className={styles.videoInfo}>
                    <div className={styles.titleOwner}>
                        <p className={styles.videoTitle}>{video.title}</p>
                        <p className={styles.videoOwner}>{videoOwner}</p>
                    </div>
                    <div className={styles.likesContainer}>
                        <LikeButton likesCount={likes} updateLikesCount={updateLikesCount} />
                    </div>
                </div>

                <p onClick={toggle}
                    className={styles.descButton}>
                    {toggleDescription ? "Ver menos" : "Ver más"}
                </p>
                <Collapse isOpen={toggleDescription}>
                    <Card>
                        <CardBody className={styles.videoDescContainer}>
                            <p>{video.description}</p>
                            <p className={styles.dateString}>Publicado: {dateString}</p>
                        </CardBody>
                    </Card>
                </Collapse>
            </div>

        </div>
    )
}
