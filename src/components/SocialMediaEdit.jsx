import React from 'react'
import styles from './styles/SocialMedia.module.scss'
import {BsFacebook} from 'react-icons/bs'
import {RiInstagramFill} from 'react-icons/ri'
import {GrInstagram} from 'react-icons/gr'
import { Link } from 'react-router-dom'
import {Input} from 'reactstrap'

const IG = 'https://instagram.com/';
const FB = 'https://fb.com/'

export default function SocialMedia({fb, ig, handleChange}) {

    // handleChange should send the updated values to the parent component's state
    const hasSM = fb !== undefined || ig !== undefined;
    // añadir Facebook, añadir Instagram

    return (
        <>
        <div className={styles.containerEdit}>
            <span className={styles.smItem}>
                <BsFacebook/>
                <Input className={styles.smInput} id="fb" placeholder="@ de Facebook" value={fb} onChange={handleChange}></Input>
            </span>
            <span className={styles.smItem}>
                <GrInstagram/> 
                <Input className={styles.smInput} id="ig" placeholder="@ de Instagram" value={ig} onChange={handleChange}></Input>
            </span> 
        </div>

        </>
    )
}
