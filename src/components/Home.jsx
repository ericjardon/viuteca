import React from 'react'
import { Link } from 'react-router-dom';
import {Button} from 'reactstrap';
import {auth} from '../base' 
import styles from './styles/Home.module.scss';

/* Component for the main screen with listed videos */
export default function Home() {
    return (
        <div className={styles.HomeContainer}>
            <h1>¡Bienvenidx a la Viuteca!</h1>

            <p className={styles.MainText}>Este es un proyecto desarrollado por estudiantes del Tec de Monterrey que 
                busca poner a tu alcance las grabaciones de los eventos de grupos estudiantiles
                para que no te pierdas de nada. <br/> Si formas parte de un grupo estudantil, ¡crea
                tu cuenta para subir tus eventos! Así tendras más difusión dentro del Tec y podrás 
                tener todas tus grabaciones en un solo lugar. 
            </p>

            <Link to="/videos">
                <Button size="lg" color="primary">Explora Viuteca</Button>
            </Link>

        </div>
    )
}
