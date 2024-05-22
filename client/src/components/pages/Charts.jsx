import React from 'react'
import { Chart as ChartJS, defaults } from "chart.js/auto"
import { Bar, Doughnut, Pie } from "react-chartjs-2"
import dayjs from 'dayjs';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

defaults.maintainAspectRatio = false;
defaults.responsive = true

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";

function Charts() {

    const [jobs, setJobs] = useState(null)

    const fetchData = () => {
        axios.get("https://job-portal-app-api-98as.onrender.com/api/jobs")
            .then(res => {
                console.log("data", res);
                setJobs(res.data.data);
            })
            .catch(err => {
                console.log("error", err);
            });
    };

    useEffect(() => {
        fetchData();
    }, [])

    console.log("jobs chart", jobs);


    const currentDate = dayjs().format('YYYY-MM-DD');

    const jobsWithStatus = jobs?.map(job => ({
        ...job,
        status: currentDate >= job.createdAt && currentDate <= job.deadline ? 'active' : 'expired',
    }));

    console.log("STATUS", jobsWithStatus);

    // Extract unique timestamps for x-axis labels
    const timestamps = [...new Set(jobsWithStatus?.flatMap(job => [job.createdAt, job.deadline]))].sort();


    const activeCounts = timestamps.map(timestamp =>
        jobsWithStatus?.filter(job => job.createdAt <= timestamp && job.deadline >= timestamp && job.status === 'active').length
    );

    const expiredCounts = timestamps.map(timestamp =>
        jobsWithStatus?.filter(job => job.createdAt <= timestamp && job.deadline >= timestamp && job.status === 'expired').length
    );

    // data for pie chart
    const totalActiveJobs = jobsWithStatus?.filter(job => job.status === 'active').length;
    const totalExpiredJobs = jobsWithStatus?.filter(job => job.status === 'expired').length;

    const pieData = {
        labels: ['Active Jobs', 'Expired Jobs'],
        datasets: [
            {
                data: [totalActiveJobs, totalExpiredJobs],
                backgroundColor: [
                    'rgba(43,63,229,0.8)',
                    'rgba(253,135,135,0.9)'
                ],
                hoverBackgroundColor: ['#36A2EB', '#FF6384'],
                borderColor: [
                    'rgba(43,63,229,0.8)',
                    'rgba(253,135,135,0.9)'
                ],
                borderRadius: 5
            },
        ],

    };


    const pieOptions = {
        plugins: {
            title: {
                text: "Pie chart of active and expired jobs",
            },
        },
    }
    const doughnutOptions = {
        plugins: {
            title: {
                text: "Doughnut chart of active and expired jobs",
            },
        },
    }

    //data for bar chart
    const barData = {
        labels: timestamps,
        datasets: [
            {
                label: 'Active Jobs',
                data: activeCounts,
                backgroundColor: 'rgba(43,63,229,0.8)',
                borderRadius: 5
            },
            {
                label: 'Expired Jobs',
                data: expiredCounts,
                backgroundColor: 'rgba(253,135,135,0.8)',
                borderRadius: 5
            },
        ],
    };

    const barOptions = {
        plugins: {
            title: {
                text: "Bar chart of active and expired jobs",
            },
        },
    }

    return (
        <>
            <div className="charts-section">
                <div className="first-section">
                    {/* <Bar
                            data={{
                                labels: ["A", "B", "C"],
                                datasets: [
                                    {
                                        label: "Revenue",
                                        data: [100, 200, 300],
                                    },
                                    {
                                        label: "Loss",
                                        data: [70, 80, 90],
                                    },
                                ]
                            }}
                        /> */}
                    <Bar data={barData} options={barOptions} />

                </div>
                <div className="lower-part">
                    <div className="second-section">
                        <Pie data={pieData} options={pieOptions} />

                    </div>
                    <div className="third-section">
                        <Doughnut data={pieData} options={doughnutOptions} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Charts
