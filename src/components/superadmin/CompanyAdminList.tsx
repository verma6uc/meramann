import React, { useState, useEffect } from 'react';
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
import { getCompanyAdmins, resendAdminInvitation, cancelAdminInvitation } from '../../services/api';
import { CompanyAdmin, InvitationStatus } from '../../types/superadmin';
import { format, isAfter } from 'date-fns';

interface CompanyAdminListProps {
  companyId: number;
  onCreateAdmin: () => void;
}

const CompanyAdminList: React.FC<CompanyAdminListProps> = ({ companyId, onCreateAdmin }) => {
  const [admins, setAdmins] = useState<CompanyAdmin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<number | null>(null);
  
  useEffect(() => {
    const fetchAdmins = async () => {
      setLoading(true);
      try {
        const data = await getCompanyAdmins(companyId);
        setAdmins(data);
      } catch (err) {
        setError('Failed to fetch company admins');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAdmins();
  }, [companyId]);
  
  const handleResendInvitation = async (adminId: number) => {
    setActionLoading(adminId);
    try {
      const updatedAdmin = await resendAdminInvitation(adminId);
      setAdmins(admins.map(admin => 
        admin.id === adminId ? updatedAdmin : admin
      ));
    } catch (err) {
      console.error('Failed to resend invitation:', err);
    } finally {
      setActionLoading(null);
    }
  };
  
  const handleCancelInvitation = async (adminId: number) => {
    setActionLoading(adminId);
    try {
      await cancelAdminInvitation(adminId);
      setAdmins(admins.map(admin => 
        admin.id === adminId ? { ...admin, invitationStatus: InvitationStatus.CANCELED } : admin
      ));
    } catch (err) {
      console.error('Failed to cancel invitation:', err);
    } finally {
      setActionLoading(null);
    }
  };
  
  const getStatusBadge = (status: InvitationStatus, expiresAt: string | null) => {
    if (status === InvitationStatus.SENT && expiresAt && isAfter(new Date(), new Date(expiresAt))) {
      return <Badge variant="warning">Expired</Badge>;
    }
    
    switch (status) {
      case InvitationStatus.SENT:
        return <Badge variant="primary">Sent</Badge>;
      case InvitationStatus.ACCEPTED:
        return <Badge variant="success">Accepted</Badge>;
      case InvitationStatus.CANCELED:
        return <Badge variant="default">Canceled</Badge>;
      case InvitationStatus.EXPIRED:
        return <Badge variant="warning">Expired</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  if (loading && admins.length === 0) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  if (error && admins.length === 0) {
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
  
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900">Company Administrators</h3>
        <Button variant="primary" size="sm" onClick={onCreateAdmin}>
          Add Admin
        </Button>
      </div>
      
      {admins.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-md p-6 text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No administrators</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by adding a company administrator.</p>
          <div className="mt-6">
            <Button variant="primary" size="sm" onClick={onCreateAdmin}>
              Add Admin
            </Button>
          </div>
        </div>
      ) : (
        <Table className="shadow-sm">
          <TableHead>
            <TableRow>
              <TableHeader>Name</TableHeader>
              <TableHeader>Email</TableHeader>
              <TableHeader>Status</TableHeader>
              <TableHeader>Invitation Sent</TableHeader>
              <TableHeader>Actions</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {admins.map((admin) => (
              <TableRow key={admin.id}>
                <TableCell className="font-medium text-gray-900">{admin.name}</TableCell>
                <TableCell>{admin.email}</TableCell>
                <TableCell>
                  {getStatusBadge(admin.invitationStatus, admin.invitationExpiresAt)}
                </TableCell>
                <TableCell>
                  {admin.invitationSentAt ? (
                    <div>
                      <div>{format(new Date(admin.invitationSentAt), 'MMM d, yyyy')}</div>
                      {admin.invitationExpiresAt && (
                        <div className="text-xs text-gray-500">
                          Expires: {format(new Date(admin.invitationExpiresAt), 'MMM d, yyyy')}
                        </div>
                      )}
                    </div>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    {admin.invitationStatus === InvitationStatus.SENT && (
                      <>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleResendInvitation(admin.id)}
                          isLoading={actionLoading === admin.id}
                          disabled={!!actionLoading}
                        >
                          Resend
                        </Button>
                        <Button 
                          variant="danger" 
                          size="sm"
                          onClick={() => handleCancelInvitation(admin.id)}
                          isLoading={actionLoading === admin.id}
                          disabled={!!actionLoading}
                        >
                          Cancel
                        </Button>
                      </>
                    )}
                    {admin.invitationStatus === InvitationStatus.EXPIRED && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleResendInvitation(admin.id)}
                        isLoading={actionLoading === admin.id}
                        disabled={!!actionLoading}
                      >
                        Resend
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default CompanyAdminList;
