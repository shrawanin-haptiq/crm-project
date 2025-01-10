import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Bar, Pie } from 'react-chartjs-2';
import { fetchLeads, getStats } from '../redux/actions/leadActions';
import "./Dash.css";

// Register Chart.js components and plugins
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend, ChartDataLabels);

const Dash = () => {
  const dispatch = useDispatch();
  const stats = useSelector(state => state.leads.stats); // Assuming stats are in Redux state
  const { leads } = useSelector((state) => state.leads);

  useEffect(() => {
    dispatch(fetchLeads());
    dispatch(getStats());
  }, [dispatch]);

  // Aggregate leads by source (e.g., Website, Referral, Social Media)
  const aggregateBySource = leads?.reduce((acc, lead) => {
    acc[lead.lead_source] = (acc[lead.lead_source] || 0) + 1;
    return acc;
  }, {});

  const totalLeadsBySource = aggregateBySource
    ? Object.values(aggregateBySource).reduce((a, b) => a + b, 0)
    : 0;

  // Bar Chart Data
  const barChartData = {
    labels: ['New', 'Contacted', 'Qualified', 'Unqualified'],
    datasets: [
      {
        label: 'Leads by Status',
        data: [
          stats?.newLeads || 0,
          stats?.contactedLeads || 0,
          stats?.qualifiedLeads || 0,
          stats?.unqualifiedLeads || 0,
        ],
        backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384', '#4BC0C0'],
      },
    ],
  };

  // Pie Chart Data for leads by source
  const pieChartData = {
    labels: aggregateBySource ? Object.keys(aggregateBySource) : ['No Data'],
    datasets: [
      {
        data: aggregateBySource ? Object.values(aggregateBySource) : [0],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      },
    ],
  };

  // Pie Chart Options with Percentages
  const pieChartOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const value = tooltipItem.raw;
            const percentage = totalLeadsBySource
              ? ((value / totalLeadsBySource) * 100).toFixed(2)
              : 0;
            return `${tooltipItem.label}: ${value} (${percentage}%)`;
          },
        },
      },
      datalabels: {
        formatter: (value, context) => {
          const percentage = totalLeadsBySource
            ? ((value / totalLeadsBySource) * 100).toFixed(2)
            : 0;
          return `${percentage}%`;
        },
        color: '#fff',
        font: {
          weight: 'bold',
        },
      },
    },
  };

  return (
    <>
      <div className="row mt-4">
        <div className="col-md-3">
          <div className="stat-box">
            <h5>Total Leads</h5>
            <h2>{stats ? stats.totalLeads : 0}</h2>
          </div>
        </div>
        <div className="col-md-3">
          <div className="stat-box">
            <h5>New Leads</h5>
            <h2>{stats ? stats.newLeads : 0}</h2>
          </div>
        </div>
        <div className="col-md-3">
          <div className="stat-box">
            <h5>Contacted Leads</h5>
            <h2>{stats ? stats.contactedLeads : 0}</h2>
          </div>
        </div>
        <div className="col-md-3">
          <div className="stat-box">
            <h5>Unqualified Leads</h5>
            <h2>{stats ? stats.unqualifiedLeads : 0}</h2>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-9">
          <div className="chart-container">
            <h5>Leads by Status</h5>
            <Bar data={barChartData} />
          </div>
        </div>
        <div className="col-md-3">
          <div className="chart-container">
            <h5>Leads by Source</h5>
            <Pie data={pieChartData} options={pieChartOptions} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dash;
