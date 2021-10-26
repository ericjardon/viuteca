import { Button } from 'reactstrap';
import './styles/Card.scss';
import React, { useState } from "react";
function Card(props) {
  const project = props.project;
  return (
    <div className="Card">
        <img src={project.img} className="projectImage"/>
        <p className="paragraph">
            {project.description}
        </p>
        <Button style={{backgroundColor: '#D9CAB3'}}>Ver más</Button>
    </div>
  );
}

export default Card;
