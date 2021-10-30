import { Button } from 'reactstrap';
import './styles/Card.scss';
import React, { useState } from "react";
import { Link } from "react-router-dom";
function Card(props) {
  const project = props.project;
  const divStyle = () => ({
    backgroundImage: 'url(' + project.data.img + ')'
  })
  return (
    <div className="Card">
      <div className="CardImage" style={divStyle()} >
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
