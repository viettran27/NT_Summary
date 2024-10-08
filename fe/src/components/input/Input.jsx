import styles from "./Input.module.scss"

const Input = ({type, placeholder, className, value, setValue}) => {

  const handleInput = (event) => {
    setValue(event.target.value)
  }

  return (
    <input 
      type={type} 
      placeholder={placeholder} 
      className={`${styles.container} ${className}`} 
      value={value} 
      onChange={handleInput}
    />
  )
}

export default Input
