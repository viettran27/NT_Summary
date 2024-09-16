import styles from "./Input.module.scss"

const DateInput = ({value, setValue}) => {

  const handleInput = (event) => {
    setValue(event.target.value)
  }

  return (
    <input type='date' value={value} className={styles.container} onChange={handleInput}/>
  )
}

export default DateInput
