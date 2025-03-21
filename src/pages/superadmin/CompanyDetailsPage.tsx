import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SuperAdminLayout from '../../components/layout/SuperAdminLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Alert from '../../components/ui/Alert';
import Modal from '../../components/ui/Modal';
import CompanyAdminList from '../../components/superadmin/CompanyAdminList';
import CreateCompanyAdminForm from '../../components/superadmin/CreateCompanyAdminForm';
import CompanyMonitoring from '../../components/superadmin/CompanyMonitoring';
import { getCompany, createCompanyAdmin } from '../../services/api';
import { Company, CompanyStatus, CreateCompanyAdminRequest } from '../../types/superadmin';
import { format } from 'date-fns';

const CompanyDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const companyId = parseInt(id || '0');
  
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreateAdminModalOpen, setIsCreateAdminModalOpen] = useState(false);
  const [createAdminLoading, setCreateAdminLoading] = useState(false);
  const [createAdminError, setCreateAdminError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'details' | 'monitoring'>('details');
  
  useEffect(() => {
    const fetchCompany = async () => {
      if (!companyId) return;
      
      setLoading(true);
      try {
        const data = await getCompany(companyId);
        setCompany(data);
      } catch (err) {
        setError('Failed to fetch company details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCompany();
  }, [companyId]);
  
  const handleCreateAdmin = () => {
    setIsCreateAdminModalOpen(true);
  };
  
  const handleCreateAdminSubmit = async (data: CreateCompanyAdminRequest) => {
    setCreateAdminLoading(true);
    setCreateAdminError(null);
    
    try {
      await createCompanyAdmin(data);
      setIsCreateAdminModalOpen(false);
      // Refresh the company admins list
      // In a real app, you would update the state or refetch the data
    } catch (err) {
      console.error('Failed to create company admin:', err);
      setCreateAdminError('Failed to create company admin. Please try again.');
    } finally {
      setCreateAdminLoading(false);
    }
  };
  
  const getStatusBadge = (status: CompanyStatus) => {
    switch (status) {
      case CompanyStatus.ACTIVE:
        return <Badge variant="success">Active</Badge>;
      case CompanyStatus.SUSPENDED:
        return <Badge variant="warning">Suspended</Badge>;
      case CompanyStatus.ARCHIVED:
        return <Badge variant="default">Archived</Badge>;
      case CompanyStatus.DELETING:
        return <Badge variant="danger">Deleting</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  if (loading) {
    return (
      <SuperAdminLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </SuperAdminLayout>
    );
  }
  
  if (error || !company) {
    return (
      <SuperAdminLayout>
        <Alert 
          variant="error" 
          title="Error"
          className="mb-6"
        >
          {error || 'Company not found'}
        </Alert>
        <div className="flex justify-center">
          <Button variant="primary" onClick={() => navigate('/superadmin/companies')}>
            Back to Companies
          </Button>
        </div>
      </SuperAdminLayout>
    );
  }
  
  return (
    <SuperAdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            {company.logo ? (
              <img 
                src={company.logo} 
                alt={`${company.name} logo`} 
                className="w-16 h-16 rounded-full mr-4"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-2xl mr-4">
                {company.name.charAt(0)}
              </div>
            )}
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">{company.name}</h1>
              <div className="flex items-center mt-1">
                {getStatusBadge(company.status)}
                {company.companyType && (
                  <span className="ml-2 text-sm text-gray-500">
                    {company.companyType.replace('_', ' ')}
                  </span>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex space-x-3">
            {company.status === CompanyStatus.ACTIVE && (
              <Button 
                variant="warning"
                onClick={() => navigate(`/superadmin/companies/${company.id}/suspend`)}
              >
                Suspend
              </Button>
            )}
            {company.status === CompanyStatus.SUSPENDED && (
              <Button 
                variant="success"
                onClick={() => navigate(`/superadmin/companies/${company.id}/reactivate`)}
              >
                Reactivate
              </Button>
            )}
            {(company.status === CompanyStatus.ACTIVE || company.status === CompanyStatus.SUSPENDED) && (
              <Button 
                variant="secondary"
                onClick={() => navigate(`/superadmin/companies/${company.id}/archive`)}
              >
                Archive
              </Button>
            )}
            {company.status === CompanyStatus.ARCHIVED && (
              <Button 
                variant="danger"
                onClick={() => navigate(`/superadmin/companies/${company.id}/delete`)}
              >
                Delete
              </Button>
            )}
            <Button 
              variant="primary"
              onClick={() => navigate(`/superadmin/companies/${company.id}/edit`)}
            >
              Edit
            </Button>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                className={`py-4 px-6 text-sm font-medium ${
                  activeTab === 'details'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('details')}
              >
                Details
              </button>
              <button
                className={`py-4 px-6 text-sm font-medium ${
                  activeTab === 'monitoring'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('monitoring')}
              >
                Monitoring
              </button>
            </nav>
          </div>
          
          <div className="p-6">
            {activeTab === 'details' ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card title="Company Information">
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm font-medium text-gray-500">Company Name</div>
                        <div className="mt-1">{company.name}</div>
                      </div>
                      
                      <div>
                        <div className="text-sm font-medium text-gray-500">Email</div>
                        <div className="mt-1">{company.email || 'Not provided'}</div>
                      </div>
                      
                      <div>
                        <div className="text-sm font-medium text-gray-500">Physical Address</div>
                        <div className="mt-1">{company.physicalAddress || 'Not provided'}</div>
                      </div>
                      
                      <div>
                        <div className="text-sm font-medium text-gray-500">Company Type</div>
                        <div className="mt-1">{company.companyType?.replace('_', ' ') || 'Not specified'}</div>
                      </div>
                    </div>
                  </Card>
                  
                  <Card title="System Information">
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm font-medium text-gray-500">Status</div>
                        <div className="mt-1">{getStatusBadge(company.status)}</div>
                      </div>
                      
                      <div>
                        <div className="text-sm font-medium text-gray-500">Created Date</div>
                        <div className="mt-1">{format(new Date(company.createdAt), 'MMMM d, yyyy')}</div>
                      </div>
                      
                      <div>
                        <div className="text-sm font-medium text-gray-500">Last Updated</div>
                        <div className="mt-1">{format(new Date(company.updatedAt), 'MMMM d, yyyy')}</div>
                      </div>
                      
                      <div>
                        <div className="text-sm font-medium text-gray-500">Company ID</div>
                        <div className="mt-1">{company.id}</div>
                      </div>
                    </div>
                  </Card>
                </div>
                
                <CompanyAdminList 
                  companyId={company.id}
                  onCreateAdmin={handleCreateAdmin}
                />
              </div>
            ) : (
              <CompanyMonitoring companyId={company.id} />
            )}
          </div>
        </div>
      </div>
      
      <Modal
        isOpen={isCreateAdminModalOpen}
        onClose={() => setIsCreateAdminModalOpen(false)}
        title="Add Company Administrator"
      >
        {createAdminError && (
          <Alert 
            variant="error" 
            onClose={() => setCreateAdminError(null)}
            className="mb-6"
          >
            {createAdminError}
          </Alert>
        )}
        
        <CreateCompanyAdminForm
          companyId={company.id}
          onSubmit={handleCreateAdminSubmit}
          onCancel={() => setIsCreateAdminModalOpen(false)}
          isLoading={createAdminLoading}
        />
      </Modal>
    </SuperAdminLayout>
  );
};

export default CompanyDetailsPage;
