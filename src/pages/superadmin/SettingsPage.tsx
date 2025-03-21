import React, { useState } from 'react';
import SuperAdminLayout from '../../components/layout/SuperAdminLayout';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Textarea from '../../components/ui/Textarea';
import { showToast } from '../../components/ui/Toast';

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  
  const handleSaveGeneral = (e: React.FormEvent) => {
    e.preventDefault();
    showToast.success('General settings saved successfully');
  };
  
  const handleSaveSecurity = (e: React.FormEvent) => {
    e.preventDefault();
    showToast.success('Security settings saved successfully');
  };
  
  const handleSaveNotifications = (e: React.FormEvent) => {
    e.preventDefault();
    showToast.success('Notification settings saved successfully');
  };
  
  const handleSaveIntegrations = (e: React.FormEvent) => {
    e.preventDefault();
    showToast.success('Integration settings saved successfully');
  };
  
  const handleSaveAppearance = (e: React.FormEvent) => {
    e.preventDefault();
    showToast.success('Appearance settings saved successfully');
  };
  
  return (
    <SuperAdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">System Settings</h1>
        </div>
        
        <div className="flex space-x-6">
          <div className="w-64 flex-shrink-0">
            <Card>
              <nav className="p-2">
                <div className="space-y-1">
                  <button
                    className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                      activeTab === 'general' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setActiveTab('general')}
                  >
                    General
                  </button>
                  <button
                    className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                      activeTab === 'security' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setActiveTab('security')}
                  >
                    Security
                  </button>
                  <button
                    className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                      activeTab === 'notifications' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setActiveTab('notifications')}
                  >
                    Notifications
                  </button>
                  <button
                    className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                      activeTab === 'integrations' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setActiveTab('integrations')}
                  >
                    Integrations
                  </button>
                  <button
                    className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                      activeTab === 'appearance' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setActiveTab('appearance')}
                  >
                    Appearance
                  </button>
                </div>
              </nav>
            </Card>
          </div>
          
          <div className="flex-1">
            <Card>
              <div className="p-6">
                {activeTab === 'general' && (
                  <div>
                    <h2 className="text-lg font-medium text-gray-900 mb-4">General Settings</h2>
                    <form onSubmit={handleSaveGeneral} className="space-y-4">
                      <div>
                        <Input
                          label="System Name"
                          id="systemName"
                          name="systemName"
                          defaultValue="SuperAdmin Portal"
                          required
                        />
                      </div>
                      <div>
                        <Input
                          label="Support Email"
                          id="supportEmail"
                          name="supportEmail"
                          type="email"
                          defaultValue="support@example.com"
                          required
                        />
                      </div>
                      <div>
                        <Select
                          label="Default Language"
                          id="defaultLanguage"
                          name="defaultLanguage"
                          defaultValue="en"
                          options={[
                            { value: 'en', label: 'English' },
                            { value: 'es', label: 'Spanish' },
                            { value: 'fr', label: 'French' },
                            { value: 'de', label: 'German' },
                            { value: 'ja', label: 'Japanese' }
                          ]}
                        />
                      </div>
                      <div>
                        <Select
                          label="Default Timezone"
                          id="defaultTimezone"
                          name="defaultTimezone"
                          defaultValue="UTC"
                          options={[
                            { value: 'UTC', label: 'UTC' },
                            { value: 'America/New_York', label: 'Eastern Time (ET)' },
                            { value: 'America/Chicago', label: 'Central Time (CT)' },
                            { value: 'America/Denver', label: 'Mountain Time (MT)' },
                            { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
                            { value: 'Europe/London', label: 'Greenwich Mean Time (GMT)' },
                            { value: 'Europe/Paris', label: 'Central European Time (CET)' },
                            { value: 'Asia/Tokyo', label: 'Japan Standard Time (JST)' }
                          ]}
                        />
                      </div>
                      <div>
                        <Select
                          label="Date Format"
                          id="dateFormat"
                          name="dateFormat"
                          defaultValue="MM/DD/YYYY"
                          options={[
                            { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
                            { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY' },
                            { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD' }
                          ]}
                        />
                      </div>
                      <div className="pt-4">
                        <button
                          type="submit"
                          className="px-4 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Save Changes
                        </button>
                      </div>
                    </form>
                  </div>
                )}
                
                {activeTab === 'security' && (
                  <div>
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Security Settings</h2>
                    <form onSubmit={handleSaveSecurity} className="space-y-4">
                      <div>
                        <Select
                          label="Session Timeout"
                          id="sessionTimeout"
                          name="sessionTimeout"
                          defaultValue="30"
                          options={[
                            { value: '15', label: '15 minutes' },
                            { value: '30', label: '30 minutes' },
                            { value: '60', label: '1 hour' },
                            { value: '120', label: '2 hours' },
                            { value: '240', label: '4 hours' },
                            { value: '480', label: '8 hours' }
                          ]}
                        />
                      </div>
                      <div>
                        <Select
                          label="Password Policy"
                          id="passwordPolicy"
                          name="passwordPolicy"
                          defaultValue="strong"
                          options={[
                            { value: 'basic', label: 'Basic (8+ characters)' },
                            { value: 'medium', label: 'Medium (8+ chars, mixed case)' },
                            { value: 'strong', label: 'Strong (8+ chars, mixed case, numbers)' },
                            { value: 'very-strong', label: 'Very Strong (12+ chars, mixed case, numbers, symbols)' }
                          ]}
                        />
                      </div>
                      <div>
                        <Select
                          label="Two-Factor Authentication"
                          id="twoFactorAuth"
                          name="twoFactorAuth"
                          defaultValue="optional"
                          options={[
                            { value: 'disabled', label: 'Disabled' },
                            { value: 'optional', label: 'Optional' },
                            { value: 'required', label: 'Required for all users' },
                            { value: 'required-admins', label: 'Required for admins only' }
                          ]}
                        />
                      </div>
                      <div>
                        <Input
                          label="Failed Login Attempts Before Lockout"
                          id="failedLoginAttempts"
                          name="failedLoginAttempts"
                          type="number"
                          min="1"
                          max="10"
                          defaultValue="5"
                        />
                      </div>
                      <div>
                        <Input
                          label="Account Lockout Duration (minutes)"
                          id="lockoutDuration"
                          name="lockoutDuration"
                          type="number"
                          min="5"
                          max="60"
                          defaultValue="15"
                        />
                      </div>
                      <div className="pt-4">
                        <button
                          type="submit"
                          className="px-4 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Save Changes
                        </button>
                      </div>
                    </form>
                  </div>
                )}
                
                {activeTab === 'notifications' && (
                  <div>
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Notification Settings</h2>
                    <form onSubmit={handleSaveNotifications} className="space-y-4">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Email Notifications</label>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <input
                              id="emailNewCompany"
                              name="emailNewCompany"
                              type="checkbox"
                              defaultChecked
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor="emailNewCompany" className="ml-2 block text-sm text-gray-700">
                              New company registration
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              id="emailCompanyStatusChange"
                              name="emailCompanyStatusChange"
                              type="checkbox"
                              defaultChecked
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor="emailCompanyStatusChange" className="ml-2 block text-sm text-gray-700">
                              Company status changes
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              id="emailBillingEvents"
                              name="emailBillingEvents"
                              type="checkbox"
                              defaultChecked
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor="emailBillingEvents" className="ml-2 block text-sm text-gray-700">
                              Billing events
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              id="emailSystemAlerts"
                              name="emailSystemAlerts"
                              type="checkbox"
                              defaultChecked
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor="emailSystemAlerts" className="ml-2 block text-sm text-gray-700">
                              System alerts
                            </label>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">In-App Notifications</label>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <input
                              id="inAppNewCompany"
                              name="inAppNewCompany"
                              type="checkbox"
                              defaultChecked
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor="inAppNewCompany" className="ml-2 block text-sm text-gray-700">
                              New company registration
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              id="inAppCompanyStatusChange"
                              name="inAppCompanyStatusChange"
                              type="checkbox"
                              defaultChecked
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor="inAppCompanyStatusChange" className="ml-2 block text-sm text-gray-700">
                              Company status changes
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              id="inAppBillingEvents"
                              name="inAppBillingEvents"
                              type="checkbox"
                              defaultChecked
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor="inAppBillingEvents" className="ml-2 block text-sm text-gray-700">
                              Billing events
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              id="inAppSystemAlerts"
                              name="inAppSystemAlerts"
                              type="checkbox"
                              defaultChecked
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor="inAppSystemAlerts" className="ml-2 block text-sm text-gray-700">
                              System alerts
                            </label>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <Input
                          label="Daily Notification Digest Time"
                          id="digestTime"
                          name="digestTime"
                          type="time"
                          defaultValue="08:00"
                        />
                      </div>
                      
                      <div className="pt-4">
                        <button
                          type="submit"
                          className="px-4 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Save Changes
                        </button>
                      </div>
                    </form>
                  </div>
                )}
                
                {activeTab === 'integrations' && (
                  <div>
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Integration Settings</h2>
                    <form onSubmit={handleSaveIntegrations} className="space-y-4">
                      <div>
                        <h3 className="text-md font-medium text-gray-800 mb-2">Payment Gateway</h3>
                        <Select
                          label="Provider"
                          id="paymentProvider"
                          name="paymentProvider"
                          defaultValue="stripe"
                          options={[
                            { value: 'stripe', label: 'Stripe' },
                            { value: 'paypal', label: 'PayPal' },
                            { value: 'braintree', label: 'Braintree' },
                            { value: 'authorize', label: 'Authorize.net' }
                          ]}
                        />
                      </div>
                      <div>
                        <Input
                          label="API Key"
                          id="paymentApiKey"
                          name="paymentApiKey"
                          type="password"
                          defaultValue="sk_test_••••••••••••••••••••••••"
                        />
                      </div>
                      <div>
                        <Input
                          label="Secret Key"
                          id="paymentSecretKey"
                          name="paymentSecretKey"
                          type="password"
                          defaultValue="sk_test_••••••••••••••••••••••••"
                        />
                      </div>
                      
                      <div className="border-t border-gray-200 pt-4 mt-4">
                        <h3 className="text-md font-medium text-gray-800 mb-2">Email Service</h3>
                        <Select
                          label="Provider"
                          id="emailProvider"
                          name="emailProvider"
                          defaultValue="sendgrid"
                          options={[
                            { value: 'sendgrid', label: 'SendGrid' },
                            { value: 'mailchimp', label: 'Mailchimp' },
                            { value: 'ses', label: 'Amazon SES' },
                            { value: 'mailgun', label: 'Mailgun' }
                          ]}
                        />
                      </div>
                      <div>
                        <Input
                          label="API Key"
                          id="emailApiKey"
                          name="emailApiKey"
                          type="password"
                          defaultValue="SG.••••••••••••••••••••••••"
                        />
                      </div>
                      <div>
                        <Input
                          label="From Email"
                          id="fromEmail"
                          name="fromEmail"
                          type="email"
                          defaultValue="noreply@example.com"
                        />
                      </div>
                      
                      <div className="border-t border-gray-200 pt-4 mt-4">
                        <h3 className="text-md font-medium text-gray-800 mb-2">Analytics</h3>
                        <Input
                          label="Google Analytics ID"
                          id="gaId"
                          name="gaId"
                          defaultValue="UA-XXXXXXXXX-X"
                        />
                      </div>
                      
                      <div className="pt-4">
                        <button
                          type="submit"
                          className="px-4 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Save Changes
                        </button>
                      </div>
                    </form>
                  </div>
                )}
                
                {activeTab === 'appearance' && (
                  <div>
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Appearance Settings</h2>
                    <form onSubmit={handleSaveAppearance} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Theme
                        </label>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="border rounded-md p-2 cursor-pointer bg-blue-50 border-blue-500">
                            <div className="h-20 bg-white rounded-md border border-gray-200 mb-2 overflow-hidden">
                              <div className="h-6 bg-blue-600"></div>
                              <div className="p-2">
                                <div className="h-2 bg-gray-200 rounded mb-1"></div>
                                <div className="h-2 bg-gray-200 rounded w-2/3"></div>
                              </div>
                            </div>
                            <div className="text-center text-sm font-medium text-gray-900">Default</div>
                          </div>
                          <div className="border rounded-md p-2 cursor-pointer hover:bg-gray-50">
                            <div className="h-20 bg-white rounded-md border border-gray-200 mb-2 overflow-hidden">
                              <div className="h-6 bg-gray-800"></div>
                              <div className="p-2">
                                <div className="h-2 bg-gray-200 rounded mb-1"></div>
                                <div className="h-2 bg-gray-200 rounded w-2/3"></div>
                              </div>
                            </div>
                            <div className="text-center text-sm font-medium text-gray-900">Dark</div>
                          </div>
                          <div className="border rounded-md p-2 cursor-pointer hover:bg-gray-50">
                            <div className="h-20 bg-white rounded-md border border-gray-200 mb-2 overflow-hidden">
                              <div className="h-6 bg-green-600"></div>
                              <div className="p-2">
                                <div className="h-2 bg-gray-200 rounded mb-1"></div>
                                <div className="h-2 bg-gray-200 rounded w-2/3"></div>
                              </div>
                            </div>
                            <div className="text-center text-sm font-medium text-gray-900">Green</div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Primary Color
                        </label>
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 rounded-full bg-blue-600 border border-gray-300"></div>
                          <Input
                            id="primaryColor"
                            name="primaryColor"
                            defaultValue="#2563EB"
                            className="w-32"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Secondary Color
                        </label>
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 rounded-full bg-gray-800 border border-gray-300"></div>
                          <Input
                            id="secondaryColor"
                            name="secondaryColor"
                            defaultValue="#1F2937"
                            className="w-32"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Logo
                        </label>
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 bg-gray-100 rounded-md border border-gray-300 flex items-center justify-center">
                            <svg className="w-10 h-10 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <button
                            type="button"
                            className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            onClick={() => showToast.success('Logo upload dialog would open here')}
                          >
                            Upload New Logo
                          </button>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Favicon
                        </label>
                        <div className="flex items-center space-x-4">
                          <div className="w-8 h-8 bg-gray-100 rounded-md border border-gray-300 flex items-center justify-center">
                            <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <button
                            type="button"
                            className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            onClick={() => showToast.success('Favicon upload dialog would open here')}
                          >
                            Upload New Favicon
                          </button>
                        </div>
                      </div>
                      
                      <div>
                        <Textarea
                          label="Custom CSS"
                          id="customCss"
                          name="customCss"
                          rows={4}
                          placeholder="/* Add your custom CSS here */"
                        />
                      </div>
                      
                      <div className="pt-4">
                        <button
                          type="submit"
                          className="px-4 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Save Changes
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </SuperAdminLayout>
  );
};

export default SettingsPage;
