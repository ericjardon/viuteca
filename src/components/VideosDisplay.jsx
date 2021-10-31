import React, { useState, useEffect } from "react";
import Card from './Card';
import './styles/VideosDisplay.scss';
import styles from './styles/VideoDetail.module.scss';
import Video from '../firebase/videos'
import { Spinner } from "reactstrap";
import { searchVideo } from '../firebase/search'
import {useLocation} from 'react-router-dom'
import { useQueryParams, StringParam, withDefault } from "use-query-params";

const VideosDisplay = (props) => {

  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState({});
  const [query, setQuery] = useQueryParams({
      searchTerm: withDefault(StringParam, ""),
      searchType: withDefault(StringParam, ""),
  })

  const {searchTerm, searchType} = query;

  async function fetchData() {
    console.log("Query: ", query)
    if (searchTerm !== "" && searchType !== "") {
      console.log("Fetching videos from search:", searchTerm);
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
  }, [query]);

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
          <h1>¡Ups! No se encontraron videos con esa búsqueda.</h1>
        )}

      </div>
    </div>

  );
}

export default VideosDisplay;
