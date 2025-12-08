import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useEffect, useRef, useState } from 'react';
import { toyService } from '../services/toy.service';


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export function LineChart() {

    const [inventories, setInventories] = useState()

    useEffect(() => {
        toyService.getInventoryByLabel()
            .then(res => setInventories(res))

    }, [])
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Chart.js Bar Chart',
            },
        },
    };

    const data = {
        labels: inventories && Object.keys(inventories),
        datasets: [
            {
                label: 'In stock',
                data: inventories && Object.values(inventories).map(label => label.inStock),
                backgroundColor: 'rgba(21, 188, 71, 0.5)',
            },
            {
                label: 'Out of stock',
                data: inventories && Object.values(inventories).map(label => label.outOfStock),
                backgroundColor: 'rgba(255, 0, 0, 0.5)',
            },
        ],
    };


    return <Bar options={options} data={data} />;
}
