import logo from 'assets/logo_white.png'
import styles from './header.module.scss'

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.maxWidth}>
        <img src={logo} className={styles.logo}/>
        <h1>Báo cáo sản lượng</h1>
      </div>
    </div>
  )
}

export default Header
