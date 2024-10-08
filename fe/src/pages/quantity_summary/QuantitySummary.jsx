import React, { useState } from 'react'
import styles from "./QuantitySummary.module.scss"
import Button from 'src/components/button/Button'
import Dropdown from 'src/components/dropdown/Dropdown'
import Input from 'src/components/input/Input'
import Loading from 'src/components/loading/Loading'
import Table from 'src/components/table/Table'
import Toast from 'src/components/toast/Toast'
import axiosConfig from "src/api/axios"
import { getYesterday } from 'src/utils/utils'
import { options, tableConfig } from 'src/constants/table_config'

const QuantitySummary = () => {
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
      const url = `${import.meta.env.VITE_API}/quantity/${type === "default" ? "excel" : "excel_secretary"}?date=${date}&fac=${fac}`
      a.href = url
      a.download = url.split('/').pop()
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }

    return (
        <>
            <div className={styles.content}>
                <Dropdown options={options} value={fac} setValue={setFac}/>
                <Input type="date" value={date} setValue={setDate}/>
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
        </>
    )
}

export default QuantitySummary
