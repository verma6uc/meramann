import React from 'react';
import { useForm } from 'react-hook-form';
import { CreateCompanyAdminRequest } from '../../types/superadmin';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface CreateCompanyAdminFormProps {
  companyId: number;
  onSubmit: (data: CreateCompanyAdminRequest) => void;
  onCancel: () => void;
  isLoading: boolean;
}

const CreateCompanyAdminForm: React.FC<CreateCompanyAdminFormProps> = ({ 
  companyId, 
  onSubmit, 
  onCancel, 
  isLoading 
}) => {
  const { register, handleSubmit, formState: { errors } } = useForm<CreateCompanyAdminRequest>({
    defaultValues: {
      companyId
    }
  });
  
  const handleFormSubmit = (data: CreateCompanyAdminRequest) => {
    onSubmit({
      ...data,
      companyId
    });
  };
  
  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div>
        <Input
          label="Full Name"
          id="name"
          {...register('name', { 
            required: 'Full name is required',
            minLength: { value: 2, message: 'Name must be at least 2 characters' },
            maxLength: { value: 100, message: 'Name must be less than 100 characters' }
          })}
          error={errors.name?.message}
          required
        />
      </div>
      
      <div>
        <Input
          label="Email Address"
          id="email"
          type="email"
          {...register('email', { 
            required: 'Email is required',
            pattern: { 
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 
              message: 'Invalid email address' 
            }
          })}
          error={errors.email?.message}
          required
          helperText="The invitation will be sent to this email address"
        />
      </div>
      
      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" isLoading={isLoading}>
          Send Invitation
        </Button>
      </div>
    </form>
  );
};

export default CreateCompanyAdminForm;
