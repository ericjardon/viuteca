import React from 'react';
import styles from './styles/404.module.scss';

export default function Error404() {
    
    return(
        <div>
            <p>Error 404</p>
            <p className={styles.mainMsg}>No se encontraron resultados para '{document.location.pathname}' en la búsqueda</p>
            
        </div>
    )
}