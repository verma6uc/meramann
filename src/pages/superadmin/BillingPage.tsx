import React, { useState, useEffect } from 'react';
import SuperAdminLayout from '../../components/layout/SuperAdminLayout';
import Card from '../../components/ui/Card';
import Table from '../../components/ui/Table';
import Pagination from '../../components/ui/Pagination';
import Badge from '../../components/ui/Badge';
import { showToast } from '../../components/ui/Toast';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Mock data for revenue chart
const revenueData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'Monthly Revenue ($)',
      data: [45000, 48000, 52000, 49000, 53000, 57000, 60000, 62000, 65000, 68000, 72000, 75000],
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
      borderColor: 'rgb(54, 162, 235)',
      borderWidth: 1
    }
  ]
};

// Mock data for invoices
const mockInvoices = [
  { id: 1, company: 'Acme Corporation', amount: 5000, status: 'PAID', date: '2023-12-01', dueDate: '2023-12-15' },
  { id: 2, company: 'Globex Industries', amount: 7500, status: 'PAID', date: '2023-12-01', dueDate: '2023-12-15' },
  { id: 3, company: 'Initech LLC', amount: 3000, status: 'PENDING', date: '2023-12-01', dueDate: '2023-12-15' },
  { id: 4, company: 'Umbrella Consulting', amount: 4500, status: 'OVERDUE', date: '2023-11-01', dueDate: '2023-11-15' },
  { id: 5, company: 'Soylent Corp', amount: 6000, status: 'PAID', date: '2023-12-01', dueDate: '2023-12-15' },
  { id: 6, company: 'Wayne Enterprises', amount: 12000, status: 'PENDING', date: '2023-12-01', dueDate: '2023-12-15' },
  { id: 7, company: 'Stark Industries', amount: 15000, status: 'PAID', date: '2023-12-01', dueDate: '2023-12-15' },
  { id: 8, company: 'Cyberdyne Systems', amount: 8500, status: 'PENDING', date: '2023-12-01', dueDate: '2023-12-15' },
  { id: 9, company: 'Oscorp Industries', amount: 7000, status: 'PAID', date: '2023-12-01', dueDate: '2023-12-15' },
  { id: 10, company: 'LexCorp', amount: 9500, status: 'OVERDUE', date: '2023-11-15', dueDate: '2023-11-30' }
];

const chartOptions: ChartOptions<'bar'> = {
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
      beginAtZero: true
    }
  }
};

const BillingPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [invoices, setInvoices] = useState<any[]>([]);
  const pageSize = 5;
  
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setInvoices(mockInvoices);
      setIsLoading(false);
      showToast.success('Billing data loaded successfully');
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const paginatedInvoices = invoices.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  
  const totalPages = Math.ceil(invoices.length / pageSize);
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PAID':
        return <Badge variant="success">Paid</Badge>;
      case 'PENDING':
        return <Badge variant="warning">Pending</Badge>;
      case 'OVERDUE':
        return <Badge variant="error">Overdue</Badge>;
      default:
        return <Badge variant="default">{status}</Badge>;
    }
  };
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  return (
    <SuperAdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Billing Management</h1>
          <div className="flex space-x-3">
            <button 
              className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={() => showToast.success('Financial report generated!')}
            >
              Generate Report
            </button>
            <button 
              className="px-4 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={() => showToast.success('New invoice created!')}
            >
              Create Invoice
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="col-span-1">
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Revenue Summary</h3>
              <div className="mt-2 grid grid-cols-1 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Monthly Revenue</p>
                  <p className="text-2xl font-semibold text-gray-900">{formatCurrency(75000)}</p>
                  <p className="text-sm text-green-600">↑ 4.2% from last month</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Annual Revenue</p>
                  <p className="text-2xl font-semibold text-gray-900">{formatCurrency(706000)}</p>
                  <p className="text-sm text-green-600">↑ 12.8% from last year</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Average Revenue per Company</p>
                  <p className="text-2xl font-semibold text-gray-900">{formatCurrency(7500)}</p>
                </div>
              </div>
            </div>
          </Card>
          
          <Card className="col-span-1">
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Invoice Status</h3>
              <div className="mt-2 grid grid-cols-1 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Paid Invoices</p>
                  <p className="text-2xl font-semibold text-gray-900">42</p>
                  <p className="text-sm text-gray-600">{formatCurrency(315000)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Pending Invoices</p>
                  <p className="text-2xl font-semibold text-gray-900">15</p>
                  <p className="text-sm text-gray-600">{formatCurrency(112500)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Overdue Invoices</p>
                  <p className="text-2xl font-semibold text-gray-900">3</p>
                  <p className="text-sm text-gray-600">{formatCurrency(22500)}</p>
                </div>
              </div>
            </div>
          </Card>
          
          <Card className="col-span-1">
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Quick Actions</h3>
              <div className="mt-2 space-y-3">
                <button 
                  className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={() => showToast.success('Sending payment reminders...')}
                >
                  Send Payment Reminders
                </button>
                <button 
                  className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={() => showToast.success('Generating monthly statements...')}
                >
                  Generate Monthly Statements
                </button>
                <button 
                  className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={() => showToast.success('Exporting to accounting system...')}
                >
                  Export to Accounting System
                </button>
                <button 
                  className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={() => showToast.success('Tax report generated!')}
                >
                  Generate Tax Report
                </button>
              </div>
            </div>
          </Card>
        </div>
        
        <Card>
          <div className="p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Monthly Revenue (12 Months)</h3>
            <div className="h-80">
              <Bar options={chartOptions} data={revenueData} />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Recent Invoices</h3>
              <div className="flex space-x-2">
                <button 
                  className="px-3 py-1 bg-white border border-gray-300 rounded-md shadow-sm text-xs font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={() => showToast.success('Invoices filtered by status: All')}
                >
                  All
                </button>
                <button 
                  className="px-3 py-1 bg-white border border-gray-300 rounded-md shadow-sm text-xs font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={() => showToast.success('Invoices filtered by status: Paid')}
                >
                  Paid
                </button>
                <button 
                  className="px-3 py-1 bg-white border border-gray-300 rounded-md shadow-sm text-xs font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={() => showToast.success('Invoices filtered by status: Pending')}
                >
                  Pending
                </button>
                <button 
                  className="px-3 py-1 bg-white border border-gray-300 rounded-md shadow-sm text-xs font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={() => showToast.success('Invoices filtered by status: Overdue')}
                >
                  Overdue
                </button>
              </div>
            </div>
            
            {isLoading ? (
              <div className="flex justify-center items-center h-40">
                <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            ) : (
              <>
                <Table>
                  <thead>
                    <tr>
                      <th>Invoice #</th>
                      <th>Company</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Issue Date</th>
                      <th>Due Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedInvoices.map((invoice) => (
                      <tr key={invoice.id}>
                        <td>INV-{invoice.id.toString().padStart(5, '0')}</td>
                        <td>{invoice.company}</td>
                        <td>{formatCurrency(invoice.amount)}</td>
                        <td>{getStatusBadge(invoice.status)}</td>
                        <td>{formatDate(invoice.date)}</td>
                        <td>{formatDate(invoice.dueDate)}</td>
                        <td>
                          <div className="flex space-x-2">
                            <button 
                              className="text-blue-600 hover:text-blue-800"
                              onClick={() => showToast.success(`Viewing invoice for ${invoice.company}`)}
                            >
                              View
                            </button>
                            <button 
                              className="text-gray-600 hover:text-gray-800"
                              onClick={() => showToast.success(`Downloading invoice for ${invoice.company}`)}
                            >
                              Download
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                
                <div className="mt-4">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              </>
            )}
          </div>
        </Card>
      </div>
    </SuperAdminLayout>
  );
};

export default BillingPage;
