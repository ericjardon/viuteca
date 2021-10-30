import React from 'react'
import { Redirect } from 'react-router';
import {auth} from '../base'
import './styles/Home.scss';

/* Component for the main screen with listed videos */
export default function Home() {
    return (
        <div className="HomeContainer">
            <h1>¡Bienvenido a la Viuteca!</h1>

            <p className="MainText">Este es un proyecto desarrollado por estudiantes del Tec que 
                busca poner a tu alcance las grabaciones de los eventos de grupos estudiantiles
                para que no te pierdas de nada. <br/> Si formas parte de un grupo estudantil, ¡crea
                tu cuenta para subir tus eventos! Así tendras más difusión dentro del Tec y podrás 
                tener todas tus grabaciones en un solo lugar. 
            </p>
        </div>
    )
}
