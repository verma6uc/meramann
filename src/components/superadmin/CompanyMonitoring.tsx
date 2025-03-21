import React, { useState, useEffect } from 'react';
import Card from '../ui/Card';
import { 
  getCompanyHealthMetrics, 
  getCompanyUsageMetrics, 
  getCompanyGrowthMetrics 
} from '../../services/api';
import { 
  CompanyHealthMetrics, 
  CompanyUsageMetrics, 
  CompanyGrowthMetrics 
} from '../../types/superadmin';
import { format } from 'date-fns';

interface CompanyMonitoringProps {
  companyId: number;
}

const CompanyMonitoring: React.FC<CompanyMonitoringProps> = ({ companyId }) => {
  const [healthMetrics, setHealthMetrics] = useState<CompanyHealthMetrics | null>(null);
  const [usageMetrics, setUsageMetrics] = useState<CompanyUsageMetrics | null>(null);
  const [growthMetrics, setGrowthMetrics] = useState<CompanyGrowthMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchMetrics = async () => {
      setLoading(true);
      try {
        const [health, usage, growth] = await Promise.all([
          getCompanyHealthMetrics(companyId),
          getCompanyUsageMetrics(companyId),
          getCompanyGrowthMetrics(companyId)
        ]);
        
        setHealthMetrics(health);
        setUsageMetrics(usage);
        setGrowthMetrics(growth);
      } catch (err) {
        setError('Failed to fetch company metrics');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMetrics();
  }, [companyId]);
  
  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  
  const renderTrendIndicator = (percentChange: number) => {
    if (percentChange > 0) {
      return (
        <span className="inline-flex items-center text-green-600">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
          {percentChange}%
        </span>
      );
    } else if (percentChange < 0) {
      return (
        <span className="inline-flex items-center text-red-600">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
          {Math.abs(percentChange)}%
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center text-gray-500">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
          </svg>
          0%
        </span>
      );
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  if (error) {
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
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="System Health">
          <div className="space-y-4">
            {healthMetrics && (
              <>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">Uptime</span>
                    <span className="text-sm font-medium text-gray-900">{healthMetrics.uptimePercentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${
                        healthMetrics.uptimePercentage >= 99 ? 'bg-green-500' :
                        healthMetrics.uptimePercentage >= 95 ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`} 
                      style={{ width: `${healthMetrics.uptimePercentage}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">Error Rate</span>
                    <span className="text-sm font-medium text-gray-900">{healthMetrics.errorRate}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${
                        healthMetrics.errorRate <= 1 ? 'bg-green-500' :
                        healthMetrics.errorRate <= 5 ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`} 
                      style={{ width: `${healthMetrics.errorRate}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="text-xs text-gray-500 mt-2">
                  Last updated: {format(new Date(healthMetrics.recordedAt), 'MMM d, yyyy h:mm a')}
                </div>
              </>
            )}
          </div>
        </Card>
        
        <Card title="Usage Metrics">
          <div className="space-y-4">
            {usageMetrics && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-500">Active Users</div>
                    <div className="text-xl font-semibold">{usageMetrics.activeUsers}</div>
                    <div className="text-xs text-gray-500">of {usageMetrics.totalUsers} total</div>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-500">Active Spaces</div>
                    <div className="text-xl font-semibold">{usageMetrics.activeSpaces}</div>
                    <div className="text-xs text-gray-500">of {usageMetrics.totalSpaces} total</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-500">Storage Used</div>
                    <div className="text-xl font-semibold">{formatBytes(usageMetrics.storageUsed)}</div>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-500">API Calls</div>
                    <div className="text-xl font-semibold">{usageMetrics.apiCalls.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">last 30 days</div>
                  </div>
                </div>
                
                <div className="text-xs text-gray-500 mt-2">
                  Last activity: {format(new Date(usageMetrics.lastActivityDate), 'MMM d, yyyy')}
                </div>
              </>
            )}
          </div>
        </Card>
        
        <Card title="Growth Trends">
          <div className="space-y-4">
            {growthMetrics && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-500">Users</div>
                    <div className="flex items-center justify-between">
                      <div className="text-xl font-semibold">{growthMetrics.userGrowth.current}</div>
                      <div>{renderTrendIndicator(growthMetrics.userGrowth.percentChange)}</div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-500">Spaces</div>
                    <div className="flex items-center justify-between">
                      <div className="text-xl font-semibold">{growthMetrics.spaceGrowth.current}</div>
                      <div>{renderTrendIndicator(growthMetrics.spaceGrowth.percentChange)}</div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-500">Storage</div>
                    <div className="flex items-center justify-between">
                      <div className="text-xl font-semibold">{formatBytes(growthMetrics.storageGrowth.current)}</div>
                      <div>{renderTrendIndicator(growthMetrics.storageGrowth.percentChange)}</div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-500">API Usage</div>
                    <div className="flex items-center justify-between">
                      <div className="text-xl font-semibold">{growthMetrics.apiUsageGrowth.current.toLocaleString()}</div>
                      <div>{renderTrendIndicator(growthMetrics.apiUsageGrowth.percentChange)}</div>
                    </div>
                  </div>
                </div>
                
                <div className="text-xs text-gray-500 mt-2">
                  Compared to previous month
                </div>
              </>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CompanyMonitoring;
