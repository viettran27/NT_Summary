import React from 'react'
import styles from "./Toast.module.scss"
import { useEffect } from 'react'
import { useRef } from 'react'

const Toast = ({open, setOpen, type, message}) => {

    const timer = useRef(null)
    useEffect(() => {
        if (!open) return

        clearTimeout(timer.current)
        timer.current = setTimeout(() => {
            setOpen(false)
        }, 3000)
    }, [open])

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <div className={`${styles.toast} ${styles[type]} ${open ? styles.open : ""}`}>
            <span>{message}</span>
            <span className={styles.toastCloseBtn} onClick={handleClose}>X</span>
        </div>
    )
}

export default Toast
