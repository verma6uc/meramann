import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Table, 
  TableHead, 
  TableBody, 
  TableRow, 
  TableHeader, 
  TableCell 
} from '../ui/Table';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import Pagination from '../ui/Pagination';
import { getCompanies } from '../../services/api';
import { Company, CompanyStatus, CompanyFilter, PaginationParams } from '../../types/superadmin';
import { format } from 'date-fns';

interface CompanyListProps {
  filters: CompanyFilter;
}

const CompanyList: React.FC<CompanyListProps> = ({ filters }) => {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationParams>({
    page: 1,
    pageSize: 10,
    sortBy: 'createdAt',
    sortDirection: 'desc'
  });
  const [totalPages, setTotalPages] = useState(1);
  
  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);
      try {
        const response = await getCompanies({
          ...pagination,
          ...filters
        });
        setCompanies(response.data);
        setTotalPages(response.totalPages);
      } catch (err) {
        setError('Failed to fetch companies');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCompanies();
  }, [pagination, filters]);
  
  const handlePageChange = (page: number) => {
    setPagination(prev => ({ ...prev, page }));
  };
  
  const handleSort = (column: string) => {
    setPagination(prev => ({
      ...prev,
      sortBy: column,
      sortDirection: prev.sortBy === column && prev.sortDirection === 'asc' ? 'desc' : 'asc'
    }));
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
  
  const handleRowClick = (companyId: number) => {
    navigate(`/superadmin/companies/${companyId}`);
  };
  
  if (loading && companies.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  if (error && companies.length === 0) {
    return (
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
    );
  }
  
  if (companies.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-md p-6 text-center">
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">No companies found</h3>
        <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
      </div>
    );
  }
  
  return (
    <div>
      <Table className="shadow-sm">
        <TableHead>
          <TableRow>
            <TableHeader 
              sortable 
              sorted={pagination.sortBy === 'name' ? pagination.sortDirection : false}
              onClick={() => handleSort('name')}
            >
              Company Name
            </TableHeader>
            <TableHeader 
              sortable 
              sorted={pagination.sortBy === 'status' ? pagination.sortDirection : false}
              onClick={() => handleSort('status')}
            >
              Status
            </TableHeader>
            <TableHeader 
              sortable 
              sorted={pagination.sortBy === 'companyType' ? pagination.sortDirection : false}
              onClick={() => handleSort('companyType')}
            >
              Type
            </TableHeader>
            <TableHeader 
              sortable 
              sorted={pagination.sortBy === 'createdAt' ? pagination.sortDirection : false}
              onClick={() => handleSort('createdAt')}
            >
              Created
            </TableHeader>
            <TableHeader>Actions</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {companies.map((company) => (
            <TableRow 
              key={company.id} 
              onClick={() => handleRowClick(company.id)}
              className="hover:bg-gray-50 cursor-pointer"
            >
              <TableCell className="font-medium text-gray-900">
                <div className="flex items-center">
                  {company.logo ? (
                    <img 
                      src={company.logo} 
                      alt={`${company.name} logo`} 
                      className="w-8 h-8 mr-3 rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 mr-3 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                      {company.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <div>{company.name}</div>
                    {company.email && (
                      <div className="text-xs text-gray-500">{company.email}</div>
                    )}
                  </div>
                </div>
              </TableCell>
              <TableCell>{getStatusBadge(company.status)}</TableCell>
              <TableCell>
                {company.companyType ? (
                  <span className="capitalize">{company.companyType.toLowerCase().replace('_', ' ')}</span>
                ) : (
                  <span className="text-gray-400">—</span>
                )}
              </TableCell>
              <TableCell>
                {format(new Date(company.createdAt), 'MMM d, yyyy')}
              </TableCell>
              <TableCell>
                <div className="flex space-x-2" onClick={(e) => e.stopPropagation()}>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/superadmin/companies/${company.id}`);
                    }}
                  >
                    View
                  </Button>
                  {company.status === CompanyStatus.ACTIVE && (
                    <Button 
                      variant="warning" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/superadmin/companies/${company.id}/suspend`);
                      }}
                    >
                      Suspend
                    </Button>
                  )}
                  {company.status === CompanyStatus.SUSPENDED && (
                    <Button 
                      variant="success" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/superadmin/companies/${company.id}/reactivate`);
                      }}
                    >
                      Reactivate
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      {loading && (
        <div className="flex justify-center items-center h-12 mt-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
        </div>
      )}
      
      <div className="mt-6">
        <Pagination 
          currentPage={pagination.page} 
          totalPages={totalPages} 
          onPageChange={handlePageChange} 
        />
      </div>
    </div>
  );
};

export default CompanyList;
