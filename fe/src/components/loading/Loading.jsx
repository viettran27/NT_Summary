import styles from "./Loading.module.scss"

const Loading = ({loading}) => {
  return (
    loading ?
        <div className={styles.container}>
            <div className={styles.loader}></div>
        </div>
    : null
  )
}

export default Loading
