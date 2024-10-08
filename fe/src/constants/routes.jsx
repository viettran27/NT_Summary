import QuantitySummary from "src/pages/quantity_summary/QuantitySummary";
import Summary from "src/pages/summary/Summary";

export const routes = [
    {
        "name": "Báo cáo sản lượng",
        "path": "/bao_cao_san_luong",
        "component": <QuantitySummary />
    },
    {
        "name": "Báo cáo hiệu suất",
        "path": "/bao_cao",
        "component": <Summary />
    }
]