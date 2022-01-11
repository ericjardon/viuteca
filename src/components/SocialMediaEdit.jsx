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
        {hasSM && (
            <div className={styles.containerEdit}>
               <span id="fb" className={styles.smLink}>
                   <BsFacebook/> @ <Input></Input>
                </span>
               <span id="ig" contentEditable="True" className={styles.smLink}>
                   <GrInstagram/> @ <Input></Input>
                </span> 
            </div>
        )}
        </>
    )
}
