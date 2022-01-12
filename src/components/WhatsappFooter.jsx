import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import styles from './styles/Footer.module.scss'
import {ImWhatsapp} from 'react-icons/im'


const WhatsappFooter = (props) => {

    const {location, history} = props;

    const show = location.pathname !== '/login' && location.pathname !== '/register'
    if (show)
    return (
        <footer className={styles.container}>
            <div className={styles.footerContent}>
            <p className={styles.footerText}>Para reportar fallas, enviar tus comentarios, o resolver tus dudas ¡escríbenos a Whatsapp!</p>
            <ImWhatsapp/>
            </div>
        </footer>
    );

    return (null);
}

export default withRouter(WhatsappFooter);