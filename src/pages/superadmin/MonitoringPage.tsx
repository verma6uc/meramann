import React, { useState, useEffect } from 'react';
import SuperAdminLayout from '../../components/layout/SuperAdminLayout';
import Card from '../../components/ui/Card';
import Alert from '../../components/ui/Alert';
import { showToast } from '../../components/ui/Toast';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Mock data for system health
const systemHealthData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'System Uptime (%)',
      data: [99.9, 99.8, 99.9, 99.7, 99.9, 99.8, 99.9, 99.9, 99.8, 99.9, 99.9, 99.9],
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
      tension: 0.1
    },
    {
      label: 'API Response Time (ms)',
      data: [120, 125, 118, 130, 122, 119, 121, 118, 120, 117, 115, 116],
      borderColor: 'rgb(54, 162, 235)',
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
      tension: 0.1
    }
  ]
};

// Mock data for error rates
const errorRatesData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'Error Rate (%)',
      data: [0.2, 0.3, 0.1, 0.4, 0.2, 0.3, 0.2, 0.1, 0.3, 0.2, 0.1, 0.2],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      tension: 0.1
    }
  ]
};

// Mock data for active users
const activeUsersData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'Active Users',
      data: [1200, 1350, 1400, 1500, 1600, 1750, 1800, 1900, 2000, 2100, 2200, 2300],
      borderColor: 'rgb(153, 102, 255)',
      backgroundColor: 'rgba(153, 102, 255, 0.5)',
      tension: 0.1
    }
  ]
};

const chartOptions: ChartOptions<'line'> = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: false
    },
  },
  scales: {
    y: {
      beginAtZero: false
    }
  }
};

const MonitoringPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasAlerts, setHasAlerts] = useState(false);
  
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
      setHasAlerts(true);
      showToast.success('Monitoring data loaded successfully');
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <SuperAdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">System Monitoring</h1>
          <div className="flex space-x-3">
            <button 
              className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={() => showToast.success('Report generated! Check your email.')}
            >
              Generate Report
            </button>
            <button 
              className="px-4 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={() => {
                showToast.loading('Refreshing data...');
                setTimeout(() => {
                  showToast.dismiss();
                  showToast.success('Data refreshed successfully');
                }, 1500);
              }}
            >
              Refresh Data
            </button>
          </div>
        </div>
        
        {hasAlerts && (
          <Alert 
            variant="warning" 
            title="System Alert"
            onClose={() => setHasAlerts(false)}
          >
            API response times are slightly elevated for the US-West region. Our team is investigating.
          </Alert>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="col-span-1">
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-2">System Status</h3>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm font-medium text-gray-700">All Systems Operational</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">API Services</span>
                  <span className="text-sm font-medium text-green-600">Operational</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Database</span>
                  <span className="text-sm font-medium text-green-600">Operational</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Authentication</span>
                  <span className="text-sm font-medium text-green-600">Operational</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Storage</span>
                  <span className="text-sm font-medium text-green-600">Operational</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Email Delivery</span>
                  <span className="text-sm font-medium text-yellow-600">Degraded</span>
                </div>
              </div>
            </div>
          </Card>
          
          <Card className="col-span-1">
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Current Metrics</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-500">System Uptime</span>
                    <span className="text-sm font-medium text-gray-900">99.9%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '99.9%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-500">API Response Time</span>
                    <span className="text-sm font-medium text-gray-900">116ms</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-500">Error Rate</span>
                    <span className="text-sm font-medium text-gray-900">0.2%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full" style={{ width: '0.2%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-500">Active Users</span>
                    <span className="text-sm font-medium text-gray-900">2,300</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '76%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
          
          <Card className="col-span-1">
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Recent Incidents</h3>
              {isLoading ? (
                <div className="flex justify-center items-center h-40">
                  <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="border-l-4 border-yellow-400 pl-3 py-2">
                    <p className="text-sm font-medium text-gray-900">Email Delivery Degradation</p>
                    <p className="text-xs text-gray-500">Started: 2 hours ago</p>
                    <p className="text-xs text-gray-700 mt-1">Email delivery is experiencing delays due to third-party provider issues.</p>
                  </div>
                  <div className="border-l-4 border-green-400 pl-3 py-2">
                    <p className="text-sm font-medium text-gray-900">API Rate Limiting Issue</p>
                    <p className="text-xs text-gray-500">Resolved: 2 days ago</p>
                    <p className="text-xs text-gray-700 mt-1">Rate limiting configuration was adjusted to handle increased traffic.</p>
                  </div>
                  <div className="border-l-4 border-green-400 pl-3 py-2">
                    <p className="text-sm font-medium text-gray-900">Database Performance</p>
                    <p className="text-xs text-gray-500">Resolved: 5 days ago</p>
                    <p className="text-xs text-gray-700 mt-1">Database indexes were optimized to improve query performance.</p>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">System Health (12 Months)</h3>
              <div className="h-80">
                <Line options={chartOptions} data={systemHealthData} />
              </div>
            </div>
          </Card>
          
          <Card>
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Error Rates (12 Months)</h3>
              <div className="h-80">
                <Line options={chartOptions} data={errorRatesData} />
              </div>
            </div>
          </Card>
        </div>
        
        <Card>
          <div className="p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Active Users (12 Months)</h3>
            <div className="h-80">
              <Line options={chartOptions} data={activeUsersData} />
            </div>
          </div>
        </Card>
      </div>
    </SuperAdminLayout>
  );
};

export default MonitoringPage;
