import styles from "./App.module.scss"

import Header from 'components/header/Header'
import Sidebar from "./components/sidebar/Sidebar"
import { Outlet } from "react-router-dom"

function App() {
  return (
    <div className={styles.container}>
        <Sidebar />
        <div className={styles.content}>
            <Header />
            <Outlet/>
        </div>
    </div>
  )
}

export default App

