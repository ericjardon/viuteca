import { Button } from 'reactstrap';
import './styles/Card.scss';
import photo from '../assets/projectExample.png'
function Card() {
  return (
    <div className="Card">
        <img src={photo} className="projectImage"/>
        <p>
            Lorem ipsum dolor sit amet,
             consectetur adipiscing elit,
              sed do eiusmod tempor incididunt 
              ut labore et dolore magna aliqua. 
              Ut enim ad minim veniam, quis nostrud exercitation ullamco 
              laboris nisi ut aliquip ex ea commodo consequat. Duis 
        </p>
        <Button style={{backgroundColor: '#f1f1f1'}}>Ver más</Button>
    </div>
  );
}

export default Card;
