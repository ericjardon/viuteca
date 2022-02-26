import React, {useState} from 'react'
import clapFill from '../assets/clapping-fill.png'
import clapVoid from '../assets/clapping_black.png'
import styles from './styles/LikeButton.module.scss'

export default function LikeButton(props) {

    const {updateLikesCount, likesCount, videoId} = props; 
    const [clicked, setClicked] = useState( () => localStorage.getItem(videoId) !== null );

    const toggleClicked = () => {
        setClicked(clicked => !clicked);
    }

    const handleClicked = (e) => {

        toggleClicked();
        if (clicked) {  // unclicked
            console.log("Unclicking, remove local storage...")
            localStorage.removeItem(videoId)
            updateLikesCount(-1);
        } else {   // has clicked
            console.log("Set Local Storage...")
            localStorage.setItem(videoId, 1);
            updateLikesCount(+1);
        }
    }

    const source = clicked ? clapFill : clapVoid;
    const countColor = clicked ? '#078080' : '#000' // '#6D9886' : '#000' prev palette

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
