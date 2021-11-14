import { Button } from 'reactstrap';
import styles from './styles/Card.module.scss';
import React, { useState } from "react";
import { Link } from "react-router-dom";
import defaultImg from '../assets/default_video.PNG'

function Card(props) {
  const { project } = props;
  const { data } = project;
  const videoLength = (data.durationMins || '0') + ':' + String((data.durationSecs || '0')).padStart(2, '0')

  const date = data.dateAdded.toDate();
  let options = { year: 'numeric', month:'short', day: 'numeric' };
  options.timeZone='UTC';
  const dateString = date.toLocaleDateString("es-ES", options);

  const backgroundImage = () => {
    if (data.img) {
      return {
        backgroundImage: 'url(' + data.img + ')'
      }
    }
    return {
      backgroundImage: 'url(' + defaultImg + ')'
    }
  }

  return (
    <div className={styles.dummyContainer}>
      <Link to={"/video/" + project.id} className={styles.CardText}>
        <div className={styles.Card}>
          <div className={styles.CardImage} style={backgroundImage()} >
            <p className={styles.durationStamp}>
              {videoLength}
            </p>
          </div>

          <div className={styles.titleAndParagraph}>
            <h4 className={styles.videoTitle}>{data.title}</h4>
            <p className={styles.paragraph}>
              {data.description}
            </p>
          </div>
          <div className={styles.buttonContainer}>
          <p className={styles.dateString}>
              {dateString}
            </p>
            <Link to={"/video/" + project.id} style={{ backgroundColor: '#D9CAB3' }}>
              <Button color="primary">Ver más</Button>
            </Link>
          </div>
        </div>
      </Link>
    </div>

  );
}

export default Card;
