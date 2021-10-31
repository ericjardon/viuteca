import React, { useState, useEffect } from "react";
import Card from './Card';
import './styles/VideosDisplay.scss';
import styles from './styles/VideoDetail.module.scss';
import Video from '../firebase/videos'
import { Spinner } from "reactstrap";
import { searchVideo } from '../firebase/search'
import {useLocation} from 'react-router-dom'

const useQuery = () => {
  console.log("Location search string", useLocation().search);
  return new URLSearchParams(useLocation().search);
}

const VideosDisplay = (props) => {

  // Props location.state is undefined when first loaded
  //const {searchTerm, searchType} = props.location.state ? props.location.state : {searchTerm:null, searchType:null};

  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState({});
  //const query = useQuery();  // extract and parse the query params in URL
  const query = useQuery();

  async function fetchData() {
    console.log("Query object", query)
    if (false) {
      let searchTerm = query.get('searchTerm') || "";
      let searchType = query.get('searchType') || "owner";
      console.log("params", query.get('searchTerm'), query.get('searchType'))
      console.log("searchterm", searchTerm, "searchType", searchType)
      console.log("Fetching only videos:", searchTerm);
      const videos = await searchVideo(searchType, searchTerm);
      setVideos(videos);
      setLoading(false); 

    } else {
      console.log("Fetching all videos...");
      const videos = await Video.getAllVideos();
      setVideos(videos);
      setLoading(false);
    }
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
          <h1>¡Ups! No encontramos videos.</h1>
        )}

      </div>
    </div>

  );
}

export default VideosDisplay;
