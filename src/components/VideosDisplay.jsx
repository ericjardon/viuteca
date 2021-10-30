import React, { useState, useEffect } from "react";
import Card from './Card';
import './styles/VideosDisplay.scss';
import styles from './styles/VideoDetail.module.scss';
import Video from '../firebase/videos'
import { Spinner } from "reactstrap";

function VideosDisplay() {
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState({});

  useEffect(() => {
    async function fetchData() {
      const video = await Video.getAllVideos();
      setVideos(video);
      setLoading(false);
      console.log(videos);
    }
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
        {videos.map((project, index) => (
          <Card project={project} index={index} />
        ))}
      </div>
    </div>

  );
}

export default VideosDisplay;
