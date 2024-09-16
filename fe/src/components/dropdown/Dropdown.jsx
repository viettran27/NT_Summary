import { useState, useRef } from "react";
import styles from "./Dropdown.module.scss"
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useEffect } from "react";

const Dropdown = ({value, options, setValue}) => {
  const valueElm = useRef(null)
  const containerElm = useRef(null)

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerElm.current && !containerElm.current.contains(event.target)) {
        setOpen(false)
      }
    }

    document.addEventListener("click", handleClickOutside)
    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [])

  const handleSelect = (option) => {
    valueElm.current.innerText = option.name
    setValue(option?.value)
    setOpen(false)
  }

  const initValue = options?.find((option) => option.value === value)

  return (
    <div className={styles.container} ref={containerElm}>
      <div className={`${styles.dropdownBtn} ${open ? styles.open : ""}`} onClick={() => setOpen(!open)}>
        <span ref={valueElm}>{initValue?.name || options?.[0]?.name || ""}</span>
        <span className={styles.toggleIcon}>
          {open ? <FaChevronUp /> : <FaChevronDown />}
        </span>
      </div>
      {
        open &&
        <div className={styles.dropdownContent}>
          {options.map((option, index) => <div key={index} onClick={() => handleSelect(option)} className={styles.dropdownItem}>{option.name}</div>)}
        </div>
      }
    </div>
  )
}

export default Dropdown
