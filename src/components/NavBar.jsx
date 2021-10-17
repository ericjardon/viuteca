import React from 'react'
import styles from './styles/NavBar.module.scss'


export default function NavBar() {

    console.log("Styles:", styles)
    console.log("Styles:", styles.example)

    return (
        <div className={styles.example}>
            Hello Navbar
        </div>
    )
}
