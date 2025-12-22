import { DoughnutChart } from "../cmps/DoughnutChart.jsx";
import { LineChart } from "../cmps/LineChart.jsx";

export function Dashboard() {
    return (
        <>
            <div className="dashboard container">
                <DoughnutChart />
                <LineChart />
            </div >
        </>
    )
}