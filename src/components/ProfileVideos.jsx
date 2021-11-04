import React, { useState, useEffect } from "react";
import Card from './Card';
import './styles/VideosDisplay.scss';
import styles from './styles/VideoDetail.module.scss';
import { Spinner } from "reactstrap";
import Video from '../firebase/videos'

/* VIDEO DISPLAY COMPONENT FOR PROFILE
    -- Receives ownerEmail for query through props
    -- Only requires owner email Id and owner Name
*/
const VideosDisplay = (props) => {

    const [loading, setLoading] = useState(true);
    const [videos, setVideos] = useState({});
    const { ownerEmail, ownerName } = props;

    async function fetchData() {
        const videos = await Video.getVideosFromOwner(ownerEmail);
        setVideos(videos);
        setLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) return (
        <div className={styles.container}>
            <Spinner children="" style={{ width: '15rem', height: '15rem' }} />
        </div>
    )

    return (
        <div className="CenteredContainer">
            <div className="VideosDisplay">

                {videos.length ? (
                    videos.map((project, index) => (
                        <Card project={project} index={index} />
                    ))
                ) : (
                    <h1>{ownerName} todavía no tiene videos publicados en Viuteca.</h1>
                )}

            </div>
        </div>

    );
}

export default VideosDisplay;
