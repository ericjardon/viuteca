import { Spinner, Collapse, Button, CardBody, Card } from "reactstrap";
import React, { useState, useEffect } from 'react'
import styles from './styles/VideoDetail.module.scss'
import Video from '../firebase/videos'
import Group from '../firebase/groups'
import LikeButton from './LikeButton'
import { Link, Redirect } from 'react-router-dom'
import { MdDeleteSweep } from 'react-icons/md'
import { auth } from '../base'

export default function VideoDetail(props) {

    const videoId = props.match.params.id;

    const [video, setVideo] = useState({});
    const [videoOwner, setVideoOwner] = useState("");
    const [loading, setLoading] = useState(true);
    const [likes, setLikes] = useState();
    const [toggleDescription, setToggleDescription] = useState(false);
    const [dateString, setDateString] = useState("");
    const [errorNotFound, seterrorNotFound] = useState(null);
    const [isOwner, setisOwner] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [clapFirstTime, setClapFirstTime] = useState(() => localStorage.getItem(videoId) === null)
    console.log("Can update likes count?", clapFirstTime)
    const toggle = () => {
        setToggleDescription(toggleDescription => !toggleDescription);
    }

    useEffect(() => {
        const videoId = props.match.params.id;
        // fetch the data at videos.videoId in firestore
        async function fetchData() {
            //const video = await Video.getVideoByIdTest();
            const video = await Video.getVideoById(videoId);
            if (video.error) {
                // does not exist
                console.log("Video does not exist");
                setLoading(false)
                seterrorNotFound(video.error);
                return
            }
            const currentUser = auth.currentUser
            if (currentUser) {
                setisOwner(video.owner == currentUser.email)
            }
            const group = await Group.getGroupById(video.owner);
            setVideoOwner(group.name);
            setVideo(video);
            setLikes(video.likes);
            setLoading(false);
            const date = video.dateAdded.toDate();
            let options = {year: 'numeric', month:'long', day: 'numeric' }
            options.timeZone = 'UTC';
            const string = date.toLocaleDateString("es-ES", options);

            setDateString(string);
        }

        fetchData();
    }, []);

    const handleDelete = async (e) => {
        console.log("Deleting", video)
        const confirmDelete = window.confirm("¿Borrar el video?")
        if (confirmDelete) {
            console.log("Confirmed deletion...")
            // Delete video
            const videoId = props.match.params.id;
            await Video.deleteVideo(videoId, video)
            // Redirect to Feed 
            setRedirect(true);
        } else {
            console.log("Canceled deletion");
        }
    }

    const updateLikesCount = (val) => {
        setLikes(likes => likes + val);
        if (clapFirstTime) {
            // increment likes in firestore
            const videoId = props.match.params.id;
            Video.updateLikesCount(videoId, video.likes + 1)
            setClapFirstTime(false);
        }
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

    if (redirect) {
        return (
            <Redirect to={video.owner ? `/p/${video.owner}` : '/videos'}/>
        )
    }

    return (
        <>
        <div className={styles.container}>
            <div className={styles.cardContainer}>
                <div className={styles.videoPlayer}>
                    <iframe src={video.url} className={styles.videoPlayer} allow="autoplay"></iframe>
                </div>
                <div className={styles.videoInfo}>
                    <div className={styles.titleOwner}>
                        <p className={styles.videoTitle}>{video.title}</p>
                        <Link to={'/p/' + video.owner} className={styles.linkToOwner}>
                            <p className={styles.videoOwner}>{videoOwner}</p>
                        </Link>
                    </div>
                    <div className={styles.likesContainer}>
                        <LikeButton likesCount={likes} updateLikesCount={updateLikesCount} videoId={videoId} />
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
                            {isOwner &&
                                <Button onClick={handleDelete} color="danger">
                                    Borrar <MdDeleteSweep />
                                </Button>
                            }
                        </CardBody>
                    </Card>
                </Collapse>
            </div>
        </div>
        <div className={styles.attribution}><a href="https://www.flaticon.com/free-icons/clap" title="clap icons">Clap icons created by Smashicons - Flaticon</a></div>
        </>
    )
}
