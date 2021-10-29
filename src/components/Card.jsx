import { Button } from 'reactstrap';
import './styles/Card.scss';
import React, { useState } from "react";
import { Link } from "react-router-dom";
function Card(props) {
  const project = props.project;
  return (
    <div className="Card">
      <div className="CardImage" style={{ backgroundImage: `url(project.data.img)` }} >
      </div>
        <p className="paragraph">
            {project.data.description}
        </p>
        <Link to={"/video/" + project.id} style={{backgroundColor: '#D9CAB3'}}>
            <Button style={{backgroundColor: '#D9CAB3'}}>Ver más</Button>
        </Link>
 
    </div>
  );
}

export default Card;
