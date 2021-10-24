import React, { useState } from "react";
import Card from './Card';
import './styles/Projects.scss';
import photo from '../assets/projectExample.png';
import photo2 from '../assets/SuricataSol.png';

function Projects() {
  const [projects, setProjects] = useState([
    {
      photo: photo,
      description: "Descripción 1",
    },
    {
      photo: photo2,
      description: "Descripción 2",
    }
  ]);
  return (
    <div className="Projects">
      {projects.map((project,index)=>(
        <Card project={project} index={index}/>
      ))} 
    </div>
  );
}

export default Projects;
