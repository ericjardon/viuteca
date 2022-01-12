import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import styles from './styles/Footer.module.scss'
import { ImWhatsapp } from 'react-icons/im'
import { WA_URL } from '../utils/constants'
import { encodeToUrl } from '../utils/text';

const WhatsappFooter = (props) => {

    const { location, history } = props;
    console.log("Whatsapp", WA_URL);

    const show = location.pathname !== '/login' && location.pathname !== '/register'
    if (show)
        return (
            <footer className={styles.container}>
                <div className={styles.footerContent}>
                    <p className={styles.footerText}><a target="_blank" rel="noreferrer" href={WA_URL} className={styles.waLink}>Viuteca está continuamente mejorando. Para reportar fallas, enviar comentarios, o resolver dudas {' '}
                        ¡envíanos un Whatsapp!
                        <ImWhatsapp /> </a>
                    </p>
                </div>
            </footer>
        );

    return (null);
}

export default withRouter(WhatsappFooter);