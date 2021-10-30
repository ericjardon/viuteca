import { Button } from 'reactstrap';
import styles from './styles/Card.module.scss';
import React, { useState } from "react";
import { Link } from "react-router-dom";
function Card(props) {
  const {project} = props;
  const {data} =project;

  const videoLength = (data.durationMins || '0') + ':' + String((data.durationSecs || '0')).padStart(2, '0')

  const divStyle = () => ({
    backgroundImage: 'url(' + data.img + ')'
  })
  return (
    <div className={styles.dummyContainer}>
      <div className={styles.Card}>

        <div className={styles.CardImage} style={divStyle()} >
          <p className={styles.durationStamp}>
            {videoLength}
          </p>
        </div>

        <div className={styles.titleAndParagraph}>
          <h4>{data.title}</h4>
          <p className={styles.paragraph}>
            {data.description}
          </p>
        </div>

        <div className={styles.buttonContainer}>
          <Link to={"/video/" + project.id} style={{ backgroundColor: '#D9CAB3' }}>
            <Button style={{ backgroundColor: '#D9CAB3' }}>Ver más</Button>
          </Link>
        </div>
      </div>
    </div>

  );
}

export default Card;
