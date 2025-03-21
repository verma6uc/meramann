import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SuperAdminLayout from '../../components/layout/SuperAdminLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { getCompanies } from '../../services/api';
import { Company, CompanyStatus } from '../../types/superadmin';

const SuperAdminDashboard: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);
      try {
        const response = await getCompanies({
          page: 1,
          pageSize: 5,
          sortBy: 'createdAt',
          sortDirection: 'desc'
        });
        setCompanies(response.data);
      } catch (err) {
        setError('Failed to fetch companies');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCompanies();
  }, []);
  
  const getCompanyStatusCounts = () => {
    const counts = {
      active: 0,
      suspended: 0,
      archived: 0,
      total: companies.length
    };
    
    companies.forEach(company => {
      if (company.status === CompanyStatus.ACTIVE) {
        counts.active++;
      } else if (company.status === CompanyStatus.SUSPENDED) {
        counts.suspended++;
      } else if (company.status === CompanyStatus.ARCHIVED) {
        counts.archived++;
      }
    });
    
    return counts;
  };
  
  const statusCounts = getCompanyStatusCounts();
  
  return (
    <SuperAdminLayout>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-600 bg-opacity-30">
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold">Total Companies</h3>
                <div className="text-3xl font-bold">{statusCounts.total}</div>
              </div>
            </div>
          </Card>
          
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-600 bg-opacity-30">
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold">Active Companies</h3>
                <div className="text-3xl font-bold">{statusCounts.active}</div>
              </div>
            </div>
          </Card>
          
          <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-600 bg-opacity-30">
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold">Suspended Companies</h3>
                <div className="text-3xl font-bold">{statusCounts.suspended}</div>
              </div>
            </div>
          </Card>
          
          <Card className="bg-gradient-to-r from-gray-500 to-gray-600 text-white">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-gray-600 bg-opacity-30">
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold">Archived Companies</h3>
                <div className="text-3xl font-bold">{statusCounts.archived}</div>
              </div>
            </div>
          </Card>
        </div>
        
        <Card title="Recent Companies" 
          footer={
            <div className="text-right">
              <Button href="/superadmin/companies" variant="outline">
                View All Companies
              </Button>
            </div>
          }
        >
          {loading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium">Error</h3>
                  <div className="mt-2 text-sm">{error}</div>
                </div>
              </div>
            </div>
          ) : companies.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-gray-500">No companies found</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {companies.map((company) => (
                <div key={company.id} className="py-4 flex items-center justify-between">
                  <div className="flex items-center">
                    {company.logo ? (
                      <img 
                        src={company.logo} 
                        alt={`${company.name} logo`} 
                        className="w-10 h-10 rounded-full mr-4"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold mr-4">
                        {company.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <Link to={`/superadmin/companies/${company.id}`} className="font-medium text-blue-600 hover:text-blue-800">
                        {company.name}
                      </Link>
                      <div className="text-sm text-gray-500">
                        {company.email || 'No email provided'}
                      </div>
                    </div>
                  </div>
                  <div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      company.status === CompanyStatus.ACTIVE ? 'bg-green-100 text-green-800' :
                      company.status === CompanyStatus.SUSPENDED ? 'bg-yellow-100 text-yellow-800' :
                      company.status === CompanyStatus.ARCHIVED ? 'bg-gray-100 text-gray-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {company.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card title="Quick Actions">
            <div className="space-y-4">
              <Button href="/superadmin/companies/create" variant="primary" className="w-full justify-center">
                Create New Company
              </Button>
              <Button href="/superadmin/companies" variant="outline" className="w-full justify-center">
                Manage Companies
              </Button>
              <Button href="/superadmin/monitoring" variant="outline" className="w-full justify-center">
                View Monitoring Dashboard
              </Button>
            </div>
          </Card>
          
          <Card title="System Status">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700">System Uptime</span>
                  <span className="text-sm font-medium text-gray-900">99.9%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '99.9%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700">API Response Time</span>
                  <span className="text-sm font-medium text-gray-900">120ms</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700">Database Load</span>
                  <span className="text-sm font-medium text-gray-900">45%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </SuperAdminLayout>
  );
};

export default SuperAdminDashboard;
