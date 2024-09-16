import styles from "./Button.module.scss"

const Button = ({name, color, onClick}) => {
  return (
    <button className={`${styles.container} ${styles?.[color]}`} onClick={onClick}>
        {name}
    </button>
  )
}

export default Button
