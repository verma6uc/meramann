import React, { ReactNode } from 'react';

interface TableProps {
  children: ReactNode;
  className?: string;
}

const Table: React.FC<TableProps> = ({ children, className = '' }) => {
  return (
    <div className="overflow-x-auto">
      <table className={`min-w-full divide-y divide-gray-200 ${className}`}>
        {children}
      </table>
    </div>
  );
};

export default Table;
