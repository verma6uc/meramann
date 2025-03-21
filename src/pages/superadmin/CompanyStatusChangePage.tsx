import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SuperAdminLayout from '../../components/layout/SuperAdminLayout';
import Card from '../../components/ui/Card';
import Alert from '../../components/ui/Alert';
import CompanyStatusChangeForm from '../../components/superadmin/CompanyStatusChangeForm';
import { getCompany, changeCompanyStatus } from '../../services/api';
import { Company, CompanyStatus, CompanyStatusChangeRequest } from '../../types/superadmin';

const CompanyStatusChangePage: React.FC = () => {
  const { id, action } = useParams<{ id: string; action: string }>();
  const navigate = useNavigate();
  const companyId = parseInt(id || '0');
  
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
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
  
  const getNewStatus = (): CompanyStatus | null => {
    switch (action) {
      case 'suspend':
        return CompanyStatus.SUSPENDED;
      case 'reactivate':
        return CompanyStatus.ACTIVE;
      case 'archive':
        return CompanyStatus.ARCHIVED;
      case 'delete':
        return CompanyStatus.DELETING;
      default:
        return null;
    }
  };
  
  const getPageTitle = (): string => {
    switch (action) {
      case 'suspend':
        return 'Suspend Company';
      case 'reactivate':
        return 'Reactivate Company';
      case 'archive':
        return 'Archive Company';
      case 'delete':
        return 'Delete Company';
      default:
        return 'Change Company Status';
    }
  };
  
  const handleSubmit = async (data: CompanyStatusChangeRequest) => {
    setSubmitLoading(true);
    setSubmitError(null);
    
    try {
      await changeCompanyStatus(data);
      navigate(`/superadmin/companies/${companyId}`);
    } catch (err) {
      console.error('Failed to change company status:', err);
      setSubmitError('Failed to change company status. Please try again.');
    } finally {
      setSubmitLoading(false);
    }
  };
  
  const handleCancel = () => {
    navigate(`/superadmin/companies/${companyId}`);
  };
  
  const newStatus = getNewStatus();
  
  if (loading) {
    return (
      <SuperAdminLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </SuperAdminLayout>
    );
  }
  
  if (error || !company || !newStatus) {
    return (
      <SuperAdminLayout>
        <Alert 
          variant="error" 
          title="Error"
          className="mb-6"
        >
          {error || 'Invalid company or action'}
        </Alert>
        <div className="flex justify-center">
          <button 
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            onClick={() => navigate(`/superadmin/companies/${companyId}`)}
          >
            Back to Company Details
          </button>
        </div>
      </SuperAdminLayout>
    );
  }
  
  // Check if the status change is valid
  const isValidStatusChange = (
    (company.status === CompanyStatus.ACTIVE && (newStatus === CompanyStatus.SUSPENDED || newStatus === CompanyStatus.ARCHIVED)) ||
    (company.status === CompanyStatus.SUSPENDED && (newStatus === CompanyStatus.ACTIVE || newStatus === CompanyStatus.ARCHIVED)) ||
    (company.status === CompanyStatus.ARCHIVED && newStatus === CompanyStatus.DELETING)
  );
  
  if (!isValidStatusChange) {
    return (
      <SuperAdminLayout>
        <Alert 
          variant="error" 
          title="Invalid Status Change"
          className="mb-6"
        >
          Cannot change company status from {company.status} to {newStatus}
        </Alert>
        <div className="flex justify-center">
          <button 
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            onClick={() => navigate(`/superadmin/companies/${companyId}`)}
          >
            Back to Company Details
          </button>
        </div>
      </SuperAdminLayout>
    );
  }
  
  return (
    <SuperAdminLayout>
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">{getPageTitle()}</h1>
          <p className="mt-1 text-sm text-gray-500">
            {company.name} - Current Status: {company.status}
          </p>
        </div>
        
        {submitError && (
          <Alert 
            variant="error" 
            title="Error"
            onClose={() => setSubmitError(null)}
            className="mb-6"
          >
            {submitError}
          </Alert>
        )}
        
        <Card>
          <CompanyStatusChangeForm
            companyId={company.id}
            currentStatus={company.status}
            newStatus={newStatus}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isLoading={submitLoading}
          />
        </Card>
      </div>
    </SuperAdminLayout>
  );
};

export default CompanyStatusChangePage;
