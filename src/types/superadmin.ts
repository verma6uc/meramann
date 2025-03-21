export interface Company {
  id: number;
  name: string;
  email: string | null;
  physicalAddress: string | null;
  logo: string | null;
  status: CompanyStatus;
  companyType: CompanyType | null;
  createdAt: string;
  updatedAt: string;
}

export enum CompanyStatus {
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
  ARCHIVED = 'ARCHIVED',
  DELETING = 'DELETING'
}

export enum CompanyType {
  ENTERPRISE = 'ENTERPRISE',
  MID_SIZE = 'MID_SIZE',
  SMALL_BUSINESS = 'SMALL_BUSINESS',
  CONSULTANCY = 'CONSULTANCY'
}

export interface CompanyAdmin {
  id: number;
  userId: number;
  email: string;
  name: string;
  invitationStatus: InvitationStatus;
  invitationSentAt: string | null;
  invitationExpiresAt: string | null;
}

export enum InvitationStatus {
  SENT = 'SENT',
  ACCEPTED = 'ACCEPTED',
  CANCELED = 'CANCELED',
  EXPIRED = 'EXPIRED'
}

export interface CompanyHealthMetrics {
  id: number;
  companyId: number;
  metricDate: string;
  uptimePercentage: number;
  errorRate: number;
  notes: string | null;
  recordedAt: string;
}

export interface CompanyUsageMetrics {
  activeUsers: number;
  totalUsers: number;
  activeSpaces: number;
  totalSpaces: number;
  storageUsed: number;
  apiCalls: number;
  lastActivityDate: string;
}

export interface CompanyGrowthMetrics {
  userGrowth: {
    current: number;
    previous: number;
    percentChange: number;
  };
  spaceGrowth: {
    current: number;
    previous: number;
    percentChange: number;
  };
  storageGrowth: {
    current: number;
    previous: number;
    percentChange: number;
  };
  apiUsageGrowth: {
    current: number;
    previous: number;
    percentChange: number;
  };
}

export interface CreateCompanyRequest {
  name: string;
  email?: string;
  physicalAddress?: string;
  logo?: string;
  companyType?: CompanyType;
}

export interface UpdateCompanyRequest {
  name?: string;
  email?: string;
  physicalAddress?: string;
  logo?: string;
  companyType?: CompanyType;
}

export interface CreateCompanyAdminRequest {
  companyId: number;
  email: string;
  name: string;
}

export interface CompanyStatusChangeRequest {
  companyId: number;
  newStatus: CompanyStatus;
  reason: string;
}

export interface CompanyFilter {
  status?: CompanyStatus[];
  companyType?: CompanyType[];
  createdDateStart?: string;
  createdDateEnd?: string;
  adminStatus?: InvitationStatus[];
  searchTerm?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface PaginationParams {
  page: number;
  pageSize: number;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
}
