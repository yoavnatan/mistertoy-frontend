import { Chart as ChartJS, ArcElement, Tooltip, Legend, RadialLinearScale } from 'chart.js';
import { useEffect, useRef, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { toyService } from '../services/toy.service.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export function DoughnutChart() {

    const [avarages, setAvarages] = useState()

    useEffect(() => {
        (async () => {
            const res = await toyService.getLabelsStats()
            setAvarages(res)
        })()
        // fetchData()
    }, [])


    async function fetchData() {
        const res = await toyService.getLabelsStats()
        setAvarages(res)
    }
    const options = {
        responsive: true,
        animation: {
            animateRotate: true, // Animates the rotation of the arcs
            animateScale: true,  // Animates the scaling of the chart from the center
            duration: 1000,      // Duration of the animation in milliseconds
            easing: 'easeInOutQuad', // Easing function for the animation
        },
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
            tooltip: {
                enabled: true,
            },
        },
    };

    const data = {
        labels: avarages && Object.keys(avarages),
        datasets: [
            {
                label: '# of Votes',
                data: avarages && Object.values(avarages),
                backgroundColor: [
                    'rgba(143, 44, 65, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgb(255, 255, 64)',
                    'rgb(8, 35, 99)',
                    'rgb(96, 11, 82)',
                    'rgb(179, 255, 0)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };


    return <Doughnut options={options} data={data} />;
}





