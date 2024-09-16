import React, { useRef } from "react"
import styles from "./Table.module.scss"
import { getRowSpan } from "src/utils/utils"

const Table = React.memo(({ config, data }) => {  
  const { sew, iron, qc, pack } = data
  const [rowSpans, quantity, sumQuantity] = sew ? getRowSpan(sew, "workline", "Qty") : []
  const indexRef = useRef(null)

  const other = [
    {
      name: "Là 106",
      value: iron
    },
    {
      name: "QC Là 107",
      value: qc
    },
    {
      name: "Đóng gói 108",
      value: pack
    },
  ]

  return (
    <table className={styles.container}>
      <thead>
        <tr>
          <th>STT</th>
          {
            config?.columns.map((col, index) => <th key={index}>{col.name}</th>)
          }
          <th>Tổng sản lượng</th>
        </tr>
      </thead>
      <tbody>
        {
          sew?.map((row, index) => {
            const rowSpan = rowSpans[index]
            if (index === 0) indexRef.current = 0
            indexRef.current = rowSpan === 0 ? indexRef.current : indexRef.current + 1

            return <tr key={index}>
              {rowSpan !== 0 && <td rowSpan={rowSpan}>{indexRef.current}</td>}
              {
                config?.columns.map((col, index) =>
                  <td
                    key={index}
                    rowSpan={col.name === "Line" ? rowSpan : 1}
                    style={{ display: col.name === "Line" && rowSpan === 0 ? "none" : "table-cell" }}
                  >
                    {row[col.key]}
                  </td>
                )
              }
              {rowSpan !== 0 && <td rowSpan={rowSpan}>{quantity[index]}</td>}
            </tr>
          })
        }
        {
          <>
            <tr>
              <td colSpan={3} className={styles.bold}>TOT</td>
              <td className={styles.bold}>{sumQuantity}</td>
              <td className={styles.bold}>{sumQuantity}</td>
            </tr>
          </>
        }
        {
          other.map((row, index) => {
            indexRef.current++
            return <tr key={index}>
              <td>{indexRef.current}</td>
              <td colSpan={2}>{row.name}</td>
              <td>{row.value}</td>
              <td>{row.value}</td>
            </tr>
          })
        }
      </tbody>
    </table>
  )
})

export default Table
