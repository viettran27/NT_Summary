import styles from "./App.module.scss"

import Header from 'components/header/Header'
import DateInput from "components/input/DateInput"
import Table from 'components/table/Table'
import Dropdown from "components/dropdown/Dropdown"
import Button from "components/button/Button"

import { tableConfig, options } from "constants/table_config"
import axiosConfig from "api/axios"
import { useState } from "react"
import { getYesterday } from "./utils/utils"
import Loading from "./components/loading/Loading"
import Toast from "./components/toast/Toast"

function App() {

  const [toast, setToast] = useState({open: false, type: "success", message: ""})
  const [loading, setLoading] = useState(false)
  const [fac, setFac] = useState("1")  
  const [date, setDate] = useState(getYesterday())
  const [tableData, setTableData] = useState({})

  const handleGetData = () => {
    setLoading(true)

    axiosConfig.get(`/quantity?date=${date}&fac=${fac}`).then(res => {
      setLoading(false)
      setTableData(res)
    }).catch(err => {
      setToast({open: true, type: "error", message: "Có lỗi hệ thống, vui lòng thử lại sau"})
      setLoading(false)
    })
  }

  const handleExportExcel = (type) => {
    const a = document.createElement('a')
    const url = `http://10.0.0.252:8000/quantity/${type === "default" ? "excel" : "excel_secretary"}?date=${date}&fac=${fac}`
    a.href = url
    a.download = url.split('/').pop()
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>
        <Dropdown options={options} value={fac} setValue={setFac}/>
        <DateInput value={date} setValue={setDate}/>
        <div className={styles.buttonArea}>
          <Button name="Lấy dữ liệu" color={"primary"} onClick={handleGetData} />
          <Button name="Xuất excel" color={"success"} onClick={() => handleExportExcel("default")} />
          <Button name="Xuất excel (2)" color={"success"} onClick={() => handleExportExcel("secretary")} />
        </div>
        {
          JSON.stringify(tableData) !== "{}" &&
          <Table config={tableConfig} data={tableData} colRowspan={["Line"]}/>
        }
      </div>
      <Loading loading={loading}/>
      <Toast open={toast.open} setOpen={open => setToast({...toast, open})} type={toast.type} message={toast.message}/>
    </div>
  )
}

export default App

