import React, { useContext } from 'react';
import './Chart.css';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { DarkModeContext } from '../Context-DarkMode/DarkModeContext';
// apexcharts

const ChartJs = () => {

    const { dark } = useContext(DarkModeContext);

    const textColor = dark ? '#ffffff' : '#000000';

    // 1. Bar-chart

    // Sample data for the Bar chart
    const barData = {
        labels: ['January', 'February', 'March', 'April', 'May'],
        datasets: [
            {
                label: 'Sales',
                data: [65, 59, 80, 9, 56],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    // Optional chart options
    const barOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: textColor,
                },
            },
            title: {
                display: true,
                text: 'Monthly Sales Data',
                color: textColor,
            },
        },
    };


    // 2. Line-chart

    // Sample data for the Line chart
    const lineData = {
        labels: ['2000', '2004', '2005', '2015', '2019'],
        datasets: [
            {
                label: 'Sales',
                data: [1000, 300, 700, 500, 200],
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    // Optional chart options
    const lineOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: textColor,
                },
            },
            title: {
                display: true,
                text: 'Yearly Sales Data',
                color: textColor, 
            },
        },
    };


    // 3. Pie-chart

    // Sample data for the Pie chart
    const pieData = {
        labels: ['2000', '2004', '2005', '2015', '2019'],
        datasets: [
            {
                label: 'Sales',
                data: [25, 50, 10, 40, 70],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(192, 75, 75, 0.53)',
                    'rgba(70, 136, 9, 0.2)',
                    'rgba(41, 32, 180, 0.2)',
                    'rgba(192, 75, 75, 0.2)',
                ],
                borderColor: 'rgb(54, 59, 59)',
                borderWidth: 1,
            },
        ],
    };

    // Optional chart options
    const pieOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: textColor,
                },
            },
            title: {
                display: true,
                text: 'Yearly Sales Data',
                color: textColor, 
            },
        },
    };

    return (
        <div className='chart'>

            <div className='text-center mt-4'>
                <h2 style={{ textDecoration: 'underline' }}>Chart js</h2>
            </div>

            <div className='mutli-chart'>

                <div className="row">
                    <div className="col-lg-6">
                        <div className='title'>
                            <p>1. Bar Chart</p>
                        </div>
                        <div>
                            <Bar data={barData} options={barOptions} />
                        </div>
                    </div>


                    <div className="col-lg-6">
                        <div className='title'>
                            <p>2. Line Chart</p>
                        </div>
                        <div
                            className='end'
                        >
                            <Line data={lineData} options={lineOptions} />
                        </div>
                    </div>
                </div>

                <div className="row mt-5">
                    <div className="col-lg-6">
                        <div className='title'>
                            <p>3. Pie Chart</p>
                        </div>
                        <div
                            style={{ maxHeight: "550px" }}
                        >
                            <Pie data={pieData} options={pieOptions} />
                        </div>
                    </div>


                    {/* <div className="col-lg-6">
                        <div className='title'>
                            <p>4. Line Chart</p>
                        </div>
                        <div
                            className='end'  
                        >
                            <Line data={lineData} options={lineOptions} />
                        </div>
                    </div> */}
                </div>

            </div>



        </div>
    )
}

export default ChartJs;