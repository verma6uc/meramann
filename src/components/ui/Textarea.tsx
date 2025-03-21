import React, { TextareaHTMLAttributes, forwardRef } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  className?: string;
  containerClassName?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ 
    label, 
    error, 
    helperText, 
    className = '', 
    containerClassName = '',
    ...props 
  }, ref) => {
    const hasError = !!error;
    
    return (
      <div className={`${containerClassName}`}>
        {label && (
          <label htmlFor={props.id} className="block text-sm font-medium text-gray-700 mb-1">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        
        <div className="relative rounded-md shadow-sm">
          <textarea
            ref={ref}
            className={`
              block w-full rounded-md sm:text-sm
              ${hasError 
                ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500' 
                : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
              }
              ${props.disabled ? 'bg-gray-100 cursor-not-allowed' : ''}
              ${className}
            `}
            aria-invalid={hasError ? 'true' : 'false'}
            aria-describedby={hasError ? `${props.id}-error` : undefined}
            {...props}
          />
        </div>
        
        {(error || helperText) && (
          <p 
            className={`mt-1 text-sm ${hasError ? 'text-red-600' : 'text-gray-500'}`}
            id={hasError ? `${props.id}-error` : undefined}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;
