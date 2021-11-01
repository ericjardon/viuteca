import React from 'react'
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import { auth } from '../base'
import styles from './styles/Home.module.scss';
import illustration1 from '../assets/ill1-cuate.png';
import illustration2 from '../assets/ill2-cuate.png';
import illustration3 from '../assets/webinar-blue.png'
import { BsArrowRight } from 'react-icons/bs'
import { BiCheck } from 'react-icons/bi'

/* Component for the main screen with listed videos */
// <a href="https://storyset.com/web">Web illustrations by Storyset</a>
export default function Home() {
    return (
        <div className={styles.HomeContainer}>
            <div className={styles.firstSection}>
                <div className={styles.textContainer1}>
                    <p className={styles.HeadLine}>¡Bienvenidx a Viuteca!</p>

                    <p className={styles.MainText}>Viuteca es un proyecto desarrollado por estudiantes del Tec,
                        que busca poner a tu alcance las grabaciones de los eventos de grupos estudiantiles
                        para que no te pierdas de nada. <br /> Encuentra talleres, conferencias, presentaciones y más!
                    </p>
                    <Link to="/videos">
                        <Button className={styles.StartButton} color="primary">Ir a Viuteca <BsArrowRight /></Button>
                    </Link>
                </div>
                <div className={styles.imageContainer1}>
                    <img className={styles.ill1} src={illustration1} alt="" />
                </div>

            </div>
            <div className={styles.secondSection}>
                <div className={styles.imageContainer2}>
                    <img className={styles.ill1} src={illustration2} alt="" />
                    {/* <a href="https://storyset.com/online">Online illustrations by Storyset</a> */}
                </div>
                <div className={styles.textContainer1}>
                    <p className={styles.HeadLine2}>Dale play a tus grupos estudiantiles</p>

                    <p className={styles.MainText2}>
                        El distanciamiento social ha impulsado más que nunca la creación de grabaciones por parte de los grupos estudiantiles.<br/> <br/>
                        La gran ventaja del contenido grabado es poder difundirlo y revisitarlo cuantas veces queramos. <br/> 
                        ¿El reto? Encontrarlo todo en un solo lugar, de forma
                        ordenada y fácil de explorar. ¿La solución? ¡Viuteca!
                    </p>
                </div>

            </div>
            <div className={styles.thirdSection}>
                <div className={styles.textContainer1}>
                    <p className={styles.HeadLine3}>¿Eres de un grupo o sociedad estudiantil?</p>

                    <p className={styles.MainText}>
                        Si formas parte de un grupo estudantil, ¡crea
                        tu cuenta para subir tus eventos! <br/> Tu grupo o sociedad tendrá más difusión y podrás
                        tener todas tus grabaciones en un solo lugar. <br />
                        En Viuteca, tus videos estarán a la vista de todos, donde pueden ser buscados, aplaudidos y compartidos.
                    </p>
                    <Link to="/videos">
                        <Button className={styles.RegisterButton}>Regístrate <BiCheck/></Button>
                    </Link>
                </div>
                <div className={styles.imageContainer3}>
                    <img className={styles.ill3} src={illustration3} alt="" />
                </div>
            </div>
            <div className={styles.attribution}><a href="https://storyset.com/web" target="_blank">Web illustrations by Storyset</a></div>
        </div>

    )
}
