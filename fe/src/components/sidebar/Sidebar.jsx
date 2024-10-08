import React from 'react'
import styles from "./Sidebar.module.scss"
import logo from 'assets/logo_white.png'
import { Link } from 'react-router-dom'
import { routes } from 'src/constants/routes'
import { useLocation } from 'react-router-dom'

const Sidebar = () => {
    const location = useLocation()
    const path = location.pathname

    return (
        <div className={styles.container}>
            <div className={styles.logoContainer}>
                <img className={styles.logo} src={logo}/>
            </div>
            <div className={styles.items}>
                {
                    routes.map((route, index) => (
                        <Link to={route.path} key={index} className={`${styles.item} ${path === route.path ? styles.active : ""}`}>
                           <div>{route.name}</div> 
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

export default Sidebar
