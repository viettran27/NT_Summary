from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import text
from sqlalchemy.orm import Session
from datetime import date
from app.db.base import get_db2
from decimal import Decimal

router = APIRouter()

@router.get("/")
def get_data(date: date, fac: str, db: Session = Depends(get_db2)): 
    try:
        query = f"""SELECT 
                    HR.WorkDate, 
                    HR.Fty,
                    HR.Line, 
                    HR.Unit, 
                    HR.Worker_A as Worker_TT,
                    HR.Hours_A as Hours_TT,
                    PPC.Worker_P,
                    PPC.Hours_P,
                    HR.Total_hours_A as Total_hours_TT,
                    ETS.Style,
                    ETS.Qty_TT,
                    ETS.PN_SAM as SAM,
                    CAST(ROUND(ETS.SAH_A, 2) AS decimal(10,2)) as SAH_TT,
                    PPC.SAH_P,
                    PPC.Qty_P,
                    CASE 
                        WHEN HR.Worker_A = 0 OR Hours_A = 0 THEN NULL 
                        ELSE CAST(ROUND((HR.Total_hours_A / (HR.Worker_A * HR.Hours_A)) * 100, 2) AS decimal(10,2))
                    END AS Worker_work_rate,
                    CASE 
                        WHEN HR.Total_hours_A = 0 THEN NULL
                        ELSE CAST(ROUND((ETS.SAH_A / HR.Total_hours_A) * 100, 2) AS decimal(10,2))
                    END AS EFF_TT,
                    CASE 
                        WHEN HR.Fty = 'NT1' THEN CAST(ROUND(SAH_P / (PPC.Worker_P * PPC.Hours_P * 0.9) * 100, 2) AS decimal(10,2))
                        ELSE CAST(ROUND(SAH_P / (PPC.Worker_P * PPC.Hours_P * 0.93) * 100, 2) AS decimal(10,2))
                    END AS EFF_P
                FROM HR 
                JOIN (
                    SELECT WorkDate, Line, LEFT(ETS_5.Style_A, Len(ETS_5.Style_A) - 1) as Style, SUM(Total_Qty) as Qty_TT, PN_SAM, SUM(SAH_A) as SAH_A FROM ETS_5
                    GROUP BY WorkDate, Line, LEFT(ETS_5.Style_A, Len(ETS_5.Style_A) - 1), PN_SAM
                ) AS ETS ON HR.WorkDate = ETS.WorkDate AND HR.Line = ETS.Line
                JOIN PPC ON HR.WorkDate = PPC.WorkDate AND HR.Line = PPC.Line
                WHERE HR.WorkDate = '{date}'
                ORDER BY Line, WorkDate DESC"""
        
        result = db.execute(text(query)).fetchall()
        data = [dict(row._mapping) for row in result]

        new_data = {"Line":{}, "Unit": {}, "Fac": {}}
        for item in data:
            # Line
            if item["Unit"] not in new_data["Line"] and item["Fty"] == fac:
                new_data["Line"][item["Unit"]] = []
            
            if item["Fty"] == fac:
                new_data["Line"][item["Unit"]].append(item)
            
            # Unit
            if item["Unit"] not in new_data["Unit"] and item["Fty"] == fac:
                new_data["Unit"][item["Unit"]] = {
                    "Unit": item["Unit"],
                    "Worker_TT": 0,
                    "Total_hours_P": 0,
                    "Total_hours": 0,
                    "Hours_Theory": 0,
                    "Qty_TT": 0,
                    "Qty_P": 0,
                    "SAH_TT": 0,
                    "SAH_P": 0,
                    "EFF_TT": 0,
                    "EFF_P": 0
                }

            if item["Fty"] == fac:
                unit_item = new_data["Unit"][item["Unit"]]
                unit_item["Worker_TT"] += item["Worker_TT"]
                unit_item["Total_hours"] += item["Total_hours_TT"]
                unit_item["Total_hours_P"] += item["Worker_P"] * item["Hours_P"]
                unit_item["Hours_Theory"] += item["Worker_TT"] * item["Hours_TT"]
                unit_item["Qty_TT"] += item["Qty_TT"]
                unit_item["Qty_P"] += item["Qty_P"]
                unit_item["SAH_TT"] += item["SAH_TT"]
                unit_item["SAH_P"] += item["SAH_P"]
                unit_item["Worker_work_rate"] = round(unit_item["Total_hours"] / unit_item["Hours_Theory"] * 100, 2)
                unit_item["EFF_TT"] = round(unit_item["SAH_TT"] / unit_item["Total_hours"] * 100, 2)
                unit_item["EFF_P"] = round((unit_item["SAH_P"] / (unit_item["Total_hours_P"] * Decimal(0.9 if item["Fty"] == "NT1" else 0.93))) * 100, 2)

            # Fac
            if item["Fty"] not in new_data["Fac"]:
                new_data["Fac"][item["Fty"]] = {
                    "Fty": item["Fty"],
                    "Worker_TT": 0,
                    "Total_hours": 0,
                    "Total_hours_P": 0,
                    "Hours_Theory": 0,
                    "Worker_P": 0,
                    "Hours_P": 0,
                    "Qty_TT": 0,
                    "Qty_P": 0,
                    "SAH_TT": 0,
                    "SAH_P": 0,
                    "EFF_TT": 0,
                    "EFF_P": 0
                }
            
            fac_item = new_data["Fac"][item["Fty"]]
            fac_item["Worker_TT"] += item["Worker_TT"]
            fac_item["Total_hours"] += item["Total_hours_TT"]
            fac_item["Total_hours_P"] += item["Worker_P"] * item["Hours_P"]
            fac_item["Hours_Theory"] += item["Worker_TT"] * item["Hours_TT"]
            fac_item["Qty_TT"] += item["Qty_TT"]
            fac_item["Qty_P"] += item["Qty_P"]
            fac_item["SAH_TT"] += item["SAH_TT"]
            fac_item["SAH_P"] += item["SAH_P"]
            fac_item["Worker_work_rate"] = round(fac_item["Total_hours"] / fac_item["Hours_Theory"] * 100, 2)
            fac_item["EFF_TT"] = round(fac_item["SAH_TT"] / fac_item["Total_hours"] * 100, 2)
            fac_item["EFF_P"] = round((fac_item["SAH_P"] / (fac_item["Total_hours_P"] * Decimal(0.9 if item["Fty"] == "NT1" else 0.93))) * 100, 2)

        return new_data
    except Exception as e:
        print(e)
        HTTPException(status_code=500, detail="Internal server error")


    