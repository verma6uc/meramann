import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SuperAdminLayout from '../../components/layout/SuperAdminLayout';
import Card from '../../components/ui/Card';
import CreateCompanyForm from '../../components/superadmin/CreateCompanyForm';
import Alert from '../../components/ui/Alert';
import { CreateCompanyRequest } from '../../types/superadmin';
import { createCompany } from '../../services/api';

const CreateCompanyPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleSubmit = async (data: CreateCompanyRequest) => {
    setLoading(true);
    setError(null);
    
    try {
      const newCompany = await createCompany(data);
      navigate(`/superadmin/companies/${newCompany.id}`);
    } catch (err) {
      console.error('Failed to create company:', err);
      setError('Failed to create company. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <SuperAdminLayout>
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Create New Company</h1>
          <p className="mt-1 text-sm text-gray-500">
            Create a new company and set up its initial configuration.
          </p>
        </div>
        
        {error && (
          <Alert 
            variant="error" 
            title="Error"
            onClose={() => setError(null)}
            className="mb-6"
          >
            {error}
          </Alert>
        )}
        
        <Card>
          <CreateCompanyForm 
            onSubmit={handleSubmit}
            isLoading={loading}
          />
        </Card>
      </div>
    </SuperAdminLayout>
  );
};

export default CreateCompanyPage;
