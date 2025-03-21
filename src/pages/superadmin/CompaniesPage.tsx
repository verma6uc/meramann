import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SuperAdminLayout from '../../components/layout/SuperAdminLayout';
import CompanyList from '../../components/superadmin/CompanyList';
import CompanyFilters from '../../components/superadmin/CompanyFilters';
import Button from '../../components/ui/Button';
import { CompanyFilter } from '../../types/superadmin';

const CompaniesPage: React.FC = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<CompanyFilter>({});
  
  const handleFilterChange = (newFilters: CompanyFilter) => {
    setFilters(newFilters);
  };
  
  const handleCreateCompany = () => {
    navigate('/superadmin/companies/create');
  };
  
  return (
    <SuperAdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Companies</h1>
          <Button 
            variant="primary"
            onClick={handleCreateCompany}
            leftIcon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            }
          >
            Create Company
          </Button>
        </div>
        
        <CompanyFilters 
          filters={filters}
          onFilterChange={handleFilterChange}
        />
        
        <CompanyList filters={filters} />
      </div>
    </SuperAdminLayout>
  );
};

export default CompaniesPage;
