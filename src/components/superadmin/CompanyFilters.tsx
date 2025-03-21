import React, { useState } from 'react';
import { CompanyStatus, CompanyType, CompanyFilter, InvitationStatus } from '../../types/superadmin';
import Button from '../ui/Button';
import Card from '../ui/Card';

interface CompanyFiltersProps {
  filters: CompanyFilter;
  onFilterChange: (filters: CompanyFilter) => void;
}

const CompanyFilters: React.FC<CompanyFiltersProps> = ({ filters, onFilterChange }) => {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(filters.searchTerm || '');
  
  const handleStatusChange = (status: CompanyStatus) => {
    const currentStatuses = filters.status || [];
    const newStatuses = currentStatuses.includes(status)
      ? currentStatuses.filter(s => s !== status)
      : [...currentStatuses, status];
    
    onFilterChange({
      ...filters,
      status: newStatuses.length > 0 ? newStatuses : undefined
    });
  };
  
  const handleCompanyTypeChange = (type: CompanyType) => {
    const currentTypes = filters.companyType || [];
    const newTypes = currentTypes.includes(type)
      ? currentTypes.filter(t => t !== type)
      : [...currentTypes, type];
    
    onFilterChange({
      ...filters,
      companyType: newTypes.length > 0 ? newTypes : undefined
    });
  };
  
  const handleAdminStatusChange = (status: InvitationStatus) => {
    const currentStatuses = filters.adminStatus || [];
    const newStatuses = currentStatuses.includes(status)
      ? currentStatuses.filter(s => s !== status)
      : [...currentStatuses, status];
    
    onFilterChange({
      ...filters,
      adminStatus: newStatuses.length > 0 ? newStatuses : undefined
    });
  };
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange({
      ...filters,
      searchTerm: searchTerm.trim() || undefined
    });
  };
  
  const handleDateChange = (field: 'createdDateStart' | 'createdDateEnd', value: string) => {
    onFilterChange({
      ...filters,
      [field]: value || undefined
    });
  };
  
  const handleClearFilters = () => {
    setSearchTerm('');
    onFilterChange({});
  };
  
  const hasActiveFilters = () => {
    return !!(
      filters.status?.length ||
      filters.companyType?.length ||
      filters.adminStatus?.length ||
      filters.createdDateStart ||
      filters.createdDateEnd ||
      filters.searchTerm
    );
  };
  
  return (
    <Card className="mb-6">
      <div className="space-y-4">
        <form onSubmit={handleSearchSubmit} className="flex space-x-2">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search companies by name or email"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button type="submit" variant="primary">
            Search
          </Button>
          <Button 
            type="button" 
            variant="secondary"
            onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
          >
            {isAdvancedOpen ? 'Hide Filters' : 'Show Filters'}
          </Button>
          {hasActiveFilters() && (
            <Button 
              type="button" 
              variant="outline"
              onClick={handleClearFilters}
            >
              Clear Filters
            </Button>
          )}
        </form>
        
        {isAdvancedOpen && (
          <div className="pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Company Status</h3>
                <div className="space-y-2">
                  {Object.values(CompanyStatus).map((status) => (
                    <label key={status} className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        checked={filters.status?.includes(status) || false}
                        onChange={() => handleStatusChange(status)}
                      />
                      <span className="ml-2 text-sm text-gray-700">{status}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Company Type</h3>
                <div className="space-y-2">
                  {Object.values(CompanyType).map((type) => (
                    <label key={type} className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        checked={filters.companyType?.includes(type) || false}
                        onChange={() => handleCompanyTypeChange(type)}
                      />
                      <span className="ml-2 text-sm text-gray-700">{type.replace('_', ' ')}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Admin Status</h3>
                <div className="space-y-2">
                  {Object.values(InvitationStatus).map((status) => (
                    <label key={status} className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        checked={filters.adminStatus?.includes(status) || false}
                        onChange={() => handleAdminStatusChange(status)}
                      />
                      <span className="ml-2 text-sm text-gray-700">{status}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Created Date Range</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">From</label>
                    <input
                      type="date"
                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={filters.createdDateStart || ''}
                      onChange={(e) => handleDateChange('createdDateStart', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">To</label>
                    <input
                      type="date"
                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={filters.createdDateEnd || ''}
                      onChange={(e) => handleDateChange('createdDateEnd', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default CompanyFilters;
