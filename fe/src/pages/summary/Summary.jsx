import { useState } from 'react'
import styles from "./Summary.module.scss"
import Input from 'src/components/input/Input'
import Dropdown from 'src/components/dropdown/Dropdown'
import { useEffect } from 'react'
import axiosConfig from 'src/api/axios'
import { getYesterday } from 'src/utils/utils'

const Summary = () => {

    const [day, setDay] = useState(getYesterday())
    const [fac, setFac] = useState("NT1")
    const [data, setData] = useState({})

    useEffect(() => {
        getData()
    }, [])

    const getData = (day_p, fac_p) => {
        axiosConfig.get(`/summary?date=${day_p ?? day}&fac=${fac_p ??fac}`).then(res => {
            setData(res)
        }).catch(err => {
            console.log(err)
        })
    }

    const handleChange = (value, type) => {
        let fac_p = type === "fac" ? value : fac
        let day_p = type === "day" ? value : day        
        getData(day_p, fac_p)
    }

    const formatNumber = (number) => {
        const last_number = Math.round(number * 100) / 100
        return number > 0 ? `(+${last_number})` : `(${last_number})`
    }

    return (
        <div className={styles.container}>
            <div className={styles.filter}>
                <div className={styles.label}>Chọn ngày:</div>
                <Input type="date" className={styles.input} value={day} setValue={value => {setDay(value); handleChange(value, "day")}}/>
                <div className={styles.label}>Nhà máy:</div>
                <Dropdown 
                    className={styles.dropdown} 
                    options={[{value: "NT1", name: "NT1"}, {value: "NT2", name: "NT2"}]}
                    value={fac}
                    setValue={value =>{setFac(value); handleChange(value, "fac")}}
                />
            </div>
            {
                Object.keys(data?.Line || {}).map((key, index) => {
                    const lineData = data?.Line?.[key]
                    return (
                        <div className={styles.tableContainer} key={index}>
                            <div className={styles.title}>Xưởng: {key}</div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Chuyền</th>
                                        <th>Tổng CN may</th>
                                        <th>Tỉ lệ đi làm</th>
                                        <th>Style</th>
                                        <th>SAM</th>
                                        <th>Thời gian làm việc</th>
                                        <th>Sản lượng mục tiêu</th>
                                        <th colSpan={2}>Sản lượng thực tế</th>
                                        <th>SAH mục tiêu</th>
                                        <th colSpan={2}>SAH thực tế</th>
                                        <th>Hiệu suất mục tiêu</th>
                                        <th>Hiệu suất thực tế</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        lineData.length === 0 ? 
                                        <tr><td colSpan={13}>Chưa có dữ liệu</td></tr> : null
                                    }
                                    {
                                        lineData.map((d, index) => {
                                            return <tr key={index}>
                                                <td>{d?.Line}</td>
                                                <td>{d?.Worker_TT}</td>
                                                <td>{d?.Worker_work_rate}%</td>
                                                <td>{d?.Style}</td>
                                                <td>{d?.SAM}</td>
                                                <td>{d?.Total_hours_TT}</td>
                                                <td>{d?.Qty_P}</td>
                                                <td>{d?.Qty_TT}</td>
                                                <td style={{color: d?.Qty_TT - d?.Qty_P > 0 ? "green" : "red"}}>{formatNumber(d?.Qty_TT - d?.Qty_P)}</td>
                                                <td>{d?.SAH_P}</td>
                                                <td>{d?.SAH_TT}</td>
                                                <td style={{color: d?.SAH_TT - d?.SAH_P > 0 ? "green" : "red"}}>{formatNumber(d?.SAH_TT - d?.SAH_P)}</td>
                                                <td>{d?.EFF_P}%</td>
                                                <td style={{color: d?.EFF_TT >= d?.EFF_P ? "green" : "red"}}>{d?.EFF_TT}%</td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    )
                })
            }
            <div className={styles.tableContainer}>
                <div className={styles.title}>Xưởng</div>
                <table>
                    <thead>
                        <tr>
                            <th>Xưởng</th>
                            <th>Tổng CN may</th>
                            <th>Tỉ lệ đi làm</th>
                            <th>Thời gian làm việc</th>
                            <th>Sản lượng mục tiêu</th>
                            <th colSpan={2}>Sản lượng thực tế</th>
                            <th>SAH mục tiêu</th>
                            <th colSpan={2}>SAH thực tế</th>
                            <th>Hiệu suất mục tiêu</th>
                            <th>Hiệu suất thực tế</th>
                        </tr>  
                    </thead>
                    <tbody>
                        {
                            Object.keys(data?.Unit || {}).map((key, index) => {
                                const unitData = data?.Unit?.[key]
                                return <tr key={index}>
                                    <td>{key}</td>
                                    <td>{unitData?.Worker_TT}</td>
                                    <td>{unitData?.Worker_work_rate}%</td>
                                    <td>{unitData?.Total_hours}</td>
                                    <td>{unitData?.Qty_P}</td>
                                    <td>{unitData?.Qty_TT}</td>
                                    <td style={{color: unitData?.Qty_TT - unitData?.Qty_P > 0 ? "green" : "red"}}>{formatNumber(unitData?.Qty_TT - unitData?.Qty_P)}</td>
                                    <td>{unitData?.SAH_P}</td>
                                    <td>{unitData?.SAH_TT}</td>
                                    <td style={{color: unitData?.SAH_TT - unitData?.SAH_P > 0 ? "green" : "red"}}>{formatNumber(unitData?.SAH_TT - unitData?.SAH_P)}</td>
                                    <td>{unitData?.EFF_P}%</td>
                                    <td style={{color: unitData?.EFF_TT - unitData?.EFF_P > 0 ? "green" : "red"}}>{unitData?.EFF_TT}%</td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
            <div className={styles.tableContainer}>
                <div className={styles.title}>Nhà máy</div>
                <table>
                    <thead>
                        <tr>
                            <th>Nhà máy</th>
                            <th>Tổng CN may</th>
                            <th>Tỉ lệ đi làm</th>
                            <th>Thời gian làm việc</th>
                            <th>Sản lượng mục tiêu</th>
                            <th colSpan={2}>Sản lượng thực tế</th>
                            <th>SAH mục tiêu</th>
                            <th colSpan={2}>SAH thực tế</th>
                            <th>Hiệu suất mục tiêu</th>
                            <th>Hiệu suất thực tế</th>
                        </tr>  
                    </thead>
                    <tbody>
                        {
                            Object.keys(data?.Fac || {}).map((key, index) => {
                                const facData = data?.Fac?.[key]
                                return <tr key={index}>
                                    <td>{key}</td>
                                    <td>{facData?.Worker_TT}</td>
                                    <td>{facData?.Worker_work_rate}%</td>
                                    <td>{facData?.Total_hours}</td>
                                    <td>{facData?.Qty_P}</td>
                                    <td>{facData?.Qty_TT}</td>
                                    <td style={{color: facData?.Qty_TT - facData?.Qty_P > 0 ? "green" : "red"}}>{formatNumber(facData?.Qty_TT - facData?.Qty_P)}</td>
                                    <td>{facData?.SAH_P}</td>
                                    <td>{facData?.SAH_TT}</td>
                                    <td style={{color: facData?.SAH_TT - facData?.SAH_P > 0 ? "green" : "red"}}>{formatNumber(facData?.SAH_TT - facData?.SAH_P)}</td>
                                    <td>{facData?.EFF_P}%</td>
                                    <td style={{color: facData?.EFF_TT - facData?.EFF_P > 0 ? "green" : "red"}}>{facData?.EFF_TT}%</td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Summary
