import { Button } from 'reactstrap';
import VButton from './VButton'
import styles from './styles/Card.module.scss';
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {FaPlay} from 'react-icons/fa';
import defaultImg from '../assets/default_video.PNG'
import {_ownerNames} from '../utils/ids_temp'

function Card(props) {
  const { project } = props;
  const { data } = project;

  const videoLength = data.durationHrs ? (data.durationHrs + ':' + String((data.durationMins || '0')).padStart(2,'0') + ':' + String((data.durationSecs || '0')).padStart(2, '0') )
  : (data.durationMins || '0') + ':' + String((data.durationSecs || '0')).padStart(2, '0')

  const date = data.dateAdded.toDate();
  let options = { year: 'numeric', month: 'short' };
  options.timeZone = 'UTC';
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
            <div className={styles.ownerAndDate}>
            <span className={styles.linkToOwner}>
              {_ownerNames[data.owner] || ''}
            </span>
            <span className={styles.dateString}>
              {dateString.charAt(0).toUpperCase() + dateString.slice(1)}
            </span>
            </div>
            <p className={data.title.length <= 28 ? styles.paragraph : styles.paragraphShort}>
              {data.description}
            </p>
          </div>
          <div className={styles.buttonContainer}>
            <Link to={"/video/" + project.id} >
              <VButton className={styles.playButton}>
                <FaPlay />
              </VButton>
            </Link>
          </div>
        </div>
      </Link>
    </div>

  );
}

export default Card;
