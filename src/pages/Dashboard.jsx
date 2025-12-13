import { DoughnutChart } from "../cmps/DoughnutChart.jsx";
import { LineChart } from "../cmps/LineChart.jsx";

export function Dashboard() {
    return (
        <>
            <div class="dashboard container">
                <DoughnutChart />
                <LineChart />
            </div >
        </>
    )
}