import React from 'react';
import { useForm } from 'react-hook-form';
import { CompanyStatusChangeRequest, CompanyStatus } from '../../types/superadmin';
import Button from '../ui/Button';
import Textarea from '../ui/Textarea';
import Alert from '../ui/Alert';

interface CompanyStatusChangeFormProps {
  companyId: number;
  currentStatus: CompanyStatus;
  newStatus: CompanyStatus;
  onSubmit: (data: CompanyStatusChangeRequest) => void;
  onCancel: () => void;
  isLoading: boolean;
}

const CompanyStatusChangeForm: React.FC<CompanyStatusChangeFormProps> = ({ 
  companyId, 
  currentStatus,
  newStatus,
  onSubmit, 
  onCancel, 
  isLoading 
}) => {
  const { register, handleSubmit, formState: { errors } } = useForm<CompanyStatusChangeRequest>({
    defaultValues: {
      companyId,
      newStatus,
      reason: ''
    }
  });
  
  const getStatusChangeMessage = () => {
    switch (newStatus) {
      case CompanyStatus.SUSPENDED:
        return 'Suspending this company will prevent all users from accessing the system until reactivated.';
      case CompanyStatus.ACTIVE:
        return 'Reactivating this company will restore access for all company users.';
      case CompanyStatus.ARCHIVED:
        return 'Archiving this company will make all company data read-only and prevent user access to the system.';
      case CompanyStatus.DELETING:
        return 'Deleting this company will permanently remove all company data and user access. This action cannot be undone.';
      default:
        return '';
    }
  };
  
  const getStatusChangeVariant = () => {
    switch (newStatus) {
      case CompanyStatus.SUSPENDED:
        return 'warning';
      case CompanyStatus.ACTIVE:
        return 'success';
      case CompanyStatus.ARCHIVED:
        return 'info';
      case CompanyStatus.DELETING:
        return 'error';
      default:
        return 'info';
    }
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Alert variant={getStatusChangeVariant()}>
        {getStatusChangeMessage()}
      </Alert>
      
      <div>
        <Textarea
          label="Reason for Status Change"
          id="reason"
          {...register('reason', { 
            required: 'Please provide a reason for this status change',
            minLength: { value: 10, message: 'Reason must be at least 10 characters' }
          })}
          error={errors.reason?.message}
          required
          rows={4}
          helperText="This reason will be logged in the audit trail and may be visible to the company administrator."
        />
      </div>
      
      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button 
          type="submit" 
          variant={
            newStatus === CompanyStatus.ACTIVE ? 'success' :
            newStatus === CompanyStatus.SUSPENDED ? 'warning' :
            newStatus === CompanyStatus.ARCHIVED ? 'secondary' :
            'danger'
          } 
          isLoading={isLoading}
        >
          {newStatus === CompanyStatus.ACTIVE ? 'Reactivate Company' :
           newStatus === CompanyStatus.SUSPENDED ? 'Suspend Company' :
           newStatus === CompanyStatus.ARCHIVED ? 'Archive Company' :
           'Delete Company'}
        </Button>
      </div>
    </form>
  );
};

export default CompanyStatusChangeForm;
