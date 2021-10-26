import React, {useState} from 'react'
import clapFill from '../assets/clapping_green.png'
import clapVoid from '../assets/clapping_black.png'
import styles from './styles/LikeButton.module.scss'

export default function LikeButton(props) {

    const {updateLikesCount, likesCount} = props; 
    const [clicked, setClicked] = useState(false);

    const toggleClicked = () => {
        setClicked(clicked => !clicked);
    }

    const handleClicked = (e) => {
        // store a cookie if clicked==false
        toggleClicked();
        if (clicked) {
            console.log("Removing cookie...")
            updateLikesCount(-1);
        } else {
            console.log("Inserting cookie...")
            updateLikesCount(+1);
        }
        // remove the cookie if cliked==true
    }

    const source = clicked ? clapFill : clapVoid;
    const countColor = clicked ? '#6D9886' : '#000'

    return (
        <span className={styles.buttonContainer}>
            <button className={styles.clapButton} onMouseUp={handleClicked} >
                <img id="clapIcon" className={styles.clapPNG} src={source} 
                alt="Like button"
                />
            </button>
            <span style={{width: '30px', color: countColor}}>{likesCount}</span>
        </span>

    )
}
