import React from 'react'
import styles from './styles/SocialMedia.module.scss'
import {BsFacebook} from 'react-icons/bs'
import {RiInstagramFill} from 'react-icons/ri'
import {GrInstagram} from 'react-icons/gr'
import { Link } from 'react-router-dom'

const IG = 'https://instagram.com/';
const FB = 'https://fb.com/'

export default function SocialMedia({fb, ig}) {

    const hasFB = (fb !== undefined && fb !== null);
    const hasIG = (ig !== undefined && ig !== null);
    const hasSM = hasFB || hasIG;

    return (
        <>
        {hasSM && (
            <div className={styles.container}>
               {hasFB && <span style={singleItemStyle}>
                   <a target='_blank' rel="noreferrer" className={styles.smLink} href={FB + fb}>
                   <BsFacebook/>{' '}@{fb}
                   </a>
                </span>}
               {hasIG && <span style={singleItemStyle}>
                   <a target='_blank' rel="noreferrer" className={styles.smLink} href={IG + ig}>
                   <GrInstagram/>{' '}@{ig}
                   </a>
                </span>} 
            </div>
        )}
        </>
    )
}

const singleItemStyle = {
    marginRight:'20px',
}