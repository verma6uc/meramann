import axios from 'axios';
import { 
  Company, 
  CompanyAdmin, 
  CompanyHealthMetrics, 
  CompanyUsageMetrics, 
  CompanyGrowthMetrics,
  CreateCompanyRequest,
  UpdateCompanyRequest,
  CreateCompanyAdminRequest,
  CompanyStatusChangeRequest,
  CompanyFilter,
  PaginatedResponse,
  PaginationParams
} from '../types/superadmin';

// In a real application, this would be an environment variable
const API_BASE_URL = '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// For demo purposes, we'll simulate API responses
const mockCompanies: Company[] = [
  {
    id: 1,
    name: 'Acme Corporation',
    email: 'admin@acme.com',
    physicalAddress: '123 Main St, San Francisco, CA 94105',
    logo: 'https://via.placeholder.com/150',
    status: 'ACTIVE' as any,
    companyType: 'ENTERPRISE' as any,
    createdAt: '2023-01-15T08:30:00Z',
    updatedAt: '2023-01-15T08:30:00Z'
  },
  {
    id: 2,
    name: 'Globex Industries',
    email: 'admin@globex.com',
    physicalAddress: '456 Market St, New York, NY 10001',
    logo: 'https://via.placeholder.com/150',
    status: 'ACTIVE' as any,
    companyType: 'MID_SIZE' as any,
    createdAt: '2023-02-20T10:15:00Z',
    updatedAt: '2023-02-20T10:15:00Z'
  },
  {
    id: 3,
    name: 'Initech LLC',
    email: 'admin@initech.com',
    physicalAddress: '789 Tech Blvd, Austin, TX 78701',
    logo: 'https://via.placeholder.com/150',
    status: 'SUSPENDED' as any,
    companyType: 'SMALL_BUSINESS' as any,
    createdAt: '2023-03-10T14:45:00Z',
    updatedAt: '2023-05-05T09:20:00Z'
  },
  {
    id: 4,
    name: 'Umbrella Consulting',
    email: 'admin@umbrella.com',
    physicalAddress: '101 Consulting Ave, Chicago, IL 60601',
    logo: 'https://via.placeholder.com/150',
    status: 'ARCHIVED' as any,
    companyType: 'CONSULTANCY' as any,
    createdAt: '2023-04-05T11:30:00Z',
    updatedAt: '2023-06-15T16:10:00Z'
  },
  {
    id: 5,
    name: 'Soylent Corp',
    email: 'admin@soylent.com',
    physicalAddress: '202 Food St, Los Angeles, CA 90001',
    logo: 'https://via.placeholder.com/150',
    status: 'ACTIVE' as any,
    companyType: 'MID_SIZE' as any,
    createdAt: '2023-05-12T09:00:00Z',
    updatedAt: '2023-05-12T09:00:00Z'
  }
];

const mockCompanyAdmins: Record<number, CompanyAdmin[]> = {
  1: [
    {
      id: 1,
      userId: 101,
      email: 'john.doe@acme.com',
      name: 'John Doe',
      invitationStatus: 'ACCEPTED' as any,
      invitationSentAt: '2023-01-15T09:00:00Z',
      invitationExpiresAt: '2023-01-22T09:00:00Z'
    }
  ],
  2: [
    {
      id: 2,
      userId: 102,
      email: 'jane.smith@globex.com',
      name: 'Jane Smith',
      invitationStatus: 'ACCEPTED' as any,
      invitationSentAt: '2023-02-20T10:30:00Z',
      invitationExpiresAt: '2023-02-27T10:30:00Z'
    }
  ],
  3: [
    {
      id: 3,
      userId: 0,
      email: 'mike.johnson@initech.com',
      name: 'Mike Johnson',
      invitationStatus: 'SENT' as any,
      invitationSentAt: '2023-03-10T15:00:00Z',
      invitationExpiresAt: '2023-03-17T15:00:00Z'
    }
  ],
  4: [
    {
      id: 4,
      userId: 104,
      email: 'sarah.williams@umbrella.com',
      name: 'Sarah Williams',
      invitationStatus: 'ACCEPTED' as any,
      invitationSentAt: '2023-04-05T12:00:00Z',
      invitationExpiresAt: '2023-04-12T12:00:00Z'
    }
  ],
  5: [
    {
      id: 5,
      userId: 0,
      email: 'david.brown@soylent.com',
      name: 'David Brown',
      invitationStatus: 'EXPIRED' as any,
      invitationSentAt: '2023-05-12T09:30:00Z',
      invitationExpiresAt: '2023-05-19T09:30:00Z'
    }
  ]
};

// Company API functions
export const getCompanies = async (
  params: PaginationParams & CompanyFilter
): Promise<PaginatedResponse<Company>> => {
  // In a real app, this would be an API call
  // return api.get('/companies', { params });
  
  // Mock implementation
  let filteredCompanies = [...mockCompanies];
  
  // Apply filters
  if (params.status && params.status.length > 0) {
    filteredCompanies = filteredCompanies.filter(company => 
      params.status?.includes(company.status)
    );
  }
  
  if (params.companyType && params.companyType.length > 0) {
    filteredCompanies = filteredCompanies.filter(company => 
      company.companyType && params.companyType?.includes(company.companyType)
    );
  }
  
  if (params.searchTerm) {
    const searchLower = params.searchTerm.toLowerCase();
    filteredCompanies = filteredCompanies.filter(company => 
      company.name.toLowerCase().includes(searchLower) || 
      (company.email && company.email.toLowerCase().includes(searchLower))
    );
  }
  
  // Apply sorting
  if (params.sortBy) {
    filteredCompanies.sort((a: any, b: any) => {
      const aValue = a[params.sortBy as keyof Company];
      const bValue = b[params.sortBy as keyof Company];
      
      if (aValue < bValue) return params.sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return params.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }
  
  // Apply pagination
  const startIndex = (params.page - 1) * params.pageSize;
  const endIndex = startIndex + params.pageSize;
  const paginatedCompanies = filteredCompanies.slice(startIndex, endIndex);
  
  return {
    data: paginatedCompanies,
    total: filteredCompanies.length,
    page: params.page,
    pageSize: params.pageSize,
    totalPages: Math.ceil(filteredCompanies.length / params.pageSize)
  };
};

export const getCompany = async (id: number): Promise<Company> => {
  // In a real app, this would be an API call
  // return api.get(`/companies/${id}`);
  
  // Mock implementation
  const company = mockCompanies.find(c => c.id === id);
  if (!company) {
    throw new Error('Company not found');
  }
  return company;
};

export const createCompany = async (data: CreateCompanyRequest): Promise<Company> => {
  // In a real app, this would be an API call
  // return api.post('/companies', data);
  
  // Mock implementation
  const newCompany: Company = {
    id: mockCompanies.length + 1,
    name: data.name,
    email: data.email || null,
    physicalAddress: data.physicalAddress || null,
    logo: data.logo || null,
    status: 'ACTIVE' as any,
    companyType: data.companyType || null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  mockCompanies.push(newCompany);
  return newCompany;
};

export const updateCompany = async (id: number, data: UpdateCompanyRequest): Promise<Company> => {
  // In a real app, this would be an API call
  // return api.put(`/companies/${id}`, data);
  
  // Mock implementation
  const companyIndex = mockCompanies.findIndex(c => c.id === id);
  if (companyIndex === -1) {
    throw new Error('Company not found');
  }
  
  const updatedCompany = {
    ...mockCompanies[companyIndex],
    ...data,
    updatedAt: new Date().toISOString()
  };
  
  mockCompanies[companyIndex] = updatedCompany;
  return updatedCompany;
};

export const changeCompanyStatus = async (data: CompanyStatusChangeRequest): Promise<Company> => {
  // In a real app, this would be an API call
  // return api.post('/companies/status', data);
  
  // Mock implementation
  const companyIndex = mockCompanies.findIndex(c => c.id === data.companyId);
  if (companyIndex === -1) {
    throw new Error('Company not found');
  }
  
  const updatedCompany = {
    ...mockCompanies[companyIndex],
    status: data.newStatus,
    updatedAt: new Date().toISOString()
  };
  
  mockCompanies[companyIndex] = updatedCompany;
  return updatedCompany;
};

// Company Admin API functions
export const getCompanyAdmins = async (companyId: number): Promise<CompanyAdmin[]> => {
  // In a real app, this would be an API call
  // return api.get(`/companies/${companyId}/admins`);
  
  // Mock implementation
  return mockCompanyAdmins[companyId] || [];
};

export const createCompanyAdmin = async (data: CreateCompanyAdminRequest): Promise<CompanyAdmin> => {
  // In a real app, this would be an API call
  // return api.post('/company-admins', data);
  
  // Mock implementation
  const newAdmin: CompanyAdmin = {
    id: Math.max(0, ...Object.values(mockCompanyAdmins).flat().map(a => a.id)) + 1,
    userId: 0, // Not activated yet
    email: data.email,
    name: data.name,
    invitationStatus: 'SENT' as any,
    invitationSentAt: new Date().toISOString(),
    invitationExpiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days from now
  };
  
  if (!mockCompanyAdmins[data.companyId]) {
    mockCompanyAdmins[data.companyId] = [];
  }
  
  mockCompanyAdmins[data.companyId].push(newAdmin);
  return newAdmin;
};

export const resendAdminInvitation = async (adminId: number): Promise<CompanyAdmin> => {
  // In a real app, this would be an API call
  // return api.post(`/company-admins/${adminId}/resend`);
  
  // Mock implementation
  let admin: CompanyAdmin | undefined;
  let companyId: number | undefined;
  
  for (const [cId, admins] of Object.entries(mockCompanyAdmins)) {
    const foundAdmin = admins.find(a => a.id === adminId);
    if (foundAdmin) {
      admin = foundAdmin;
      companyId = Number(cId);
      break;
    }
  }
  
  if (!admin || !companyId) {
    throw new Error('Admin not found');
  }
  
  const updatedAdmin = {
    ...admin,
    invitationStatus: 'SENT' as any,
    invitationSentAt: new Date().toISOString(),
    invitationExpiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days from now
  };
  
  const adminIndex = mockCompanyAdmins[companyId].findIndex(a => a.id === adminId);
  mockCompanyAdmins[companyId][adminIndex] = updatedAdmin;
  
  return updatedAdmin;
};

export const cancelAdminInvitation = async (adminId: number): Promise<void> => {
  // In a real app, this would be an API call
  // return api.post(`/company-admins/${adminId}/cancel`);
  
  // Mock implementation
  for (const companyId in mockCompanyAdmins) {
    const adminIndex = mockCompanyAdmins[Number(companyId)].findIndex(a => a.id === adminId);
    if (adminIndex !== -1) {
      mockCompanyAdmins[Number(companyId)][adminIndex].invitationStatus = 'CANCELED' as any;
      return;
    }
  }
  
  throw new Error('Admin not found');
};

// Company Monitoring API functions
export const getCompanyHealthMetrics = async (companyId: number): Promise<CompanyHealthMetrics> => {
  // In a real app, this would be an API call
  // return api.get(`/companies/${companyId}/health`);
  
  // Mock implementation
  return {
    id: 1,
    companyId,
    metricDate: new Date().toISOString().split('T')[0],
    uptimePercentage: 99.8,
    errorRate: 0.2,
    notes: null,
    recordedAt: new Date().toISOString()
  };
};

export const getCompanyUsageMetrics = async (companyId: number): Promise<CompanyUsageMetrics> => {
  // In a real app, this would be an API call
  // return api.get(`/companies/${companyId}/usage`);
  
  // Mock implementation
  return {
    activeUsers: 45,
    totalUsers: 50,
    activeSpaces: 8,
    totalSpaces: 10,
    storageUsed: 1024 * 1024 * 500, // 500 MB
    apiCalls: 15000,
    lastActivityDate: new Date().toISOString()
  };
};

export const getCompanyGrowthMetrics = async (companyId: number): Promise<CompanyGrowthMetrics> => {
  // In a real app, this would be an API call
  // return api.get(`/companies/${companyId}/growth`);
  
  // Mock implementation
  return {
    userGrowth: {
      current: 50,
      previous: 40,
      percentChange: 25
    },
    spaceGrowth: {
      current: 10,
      previous: 8,
      percentChange: 25
    },
    storageGrowth: {
      current: 1024 * 1024 * 500, // 500 MB
      previous: 1024 * 1024 * 400, // 400 MB
      percentChange: 25
    },
    apiUsageGrowth: {
      current: 15000,
      previous: 12000,
      percentChange: 25
    }
  };
};

export default api;
