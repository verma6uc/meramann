import React from 'react';
import { useForm } from 'react-hook-form';
import { CreateCompanyRequest, CompanyType } from '../../types/superadmin';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Textarea from '../ui/Textarea';

interface CreateCompanyFormProps {
  onSubmit: (data: CreateCompanyRequest) => void;
  isLoading: boolean;
}

const CreateCompanyForm: React.FC<CreateCompanyFormProps> = ({ onSubmit, isLoading }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<CreateCompanyRequest>();
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <Input
          label="Company Name"
          id="name"
          {...register('name', { 
            required: 'Company name is required',
            minLength: { value: 2, message: 'Company name must be at least 2 characters' },
            maxLength: { value: 100, message: 'Company name must be less than 100 characters' }
          })}
          error={errors.name?.message}
          required
        />
      </div>
      
      <div>
        <Input
          label="Email"
          id="email"
          type="email"
          {...register('email', { 
            pattern: { 
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 
              message: 'Invalid email address' 
            }
          })}
          error={errors.email?.message}
          helperText="Primary contact email for the company"
        />
      </div>
      
      <div>
        <Select
          label="Company Type"
          id="companyType"
          options={[
            { value: '', label: 'Select company type' },
            ...Object.values(CompanyType).map(type => ({
              value: type,
              label: type.replace('_', ' ')
            }))
          ]}
          {...register('companyType')}
        />
      </div>
      
      <div>
        <Textarea
          label="Physical Address"
          id="physicalAddress"
          {...register('physicalAddress')}
          rows={3}
        />
      </div>
      
      <div>
        <Input
          label="Logo URL"
          id="logo"
          {...register('logo')}
          helperText="URL to the company logo image"
        />
      </div>
      
      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
        <Button type="button" variant="secondary">
          Cancel
        </Button>
        <Button type="submit" variant="primary" isLoading={isLoading}>
          Create Company
        </Button>
      </div>
    </form>
  );
};

export default CreateCompanyForm;
