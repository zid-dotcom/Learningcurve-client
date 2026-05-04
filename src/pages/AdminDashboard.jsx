import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AppContext } from '../context/Appcontext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, RefreshCw, LogOut } from 'lucide-react';

const AdminDashboard = () => {
  const { BackendURL, atoken, setatoken } = useContext(AppContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get(`${BackendURL}/get`, {
        headers: {
          atoken: atoken
        }
      });
      
      if (Array.isArray(response.data)) {
        setData(response.data);
      } else if (response.data.data && Array.isArray(response.data.data)) {
        setData(response.data.data);
      } else {
        console.log('Unexpected data format:', response.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load data. Please check your session.');
      if (error.response?.status === 401 || error.response?.status === 403) {
        handleLogout();
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (atoken) {
      fetchData();
    } else {
      navigate('/adminlogin', { replace: true });
    }
  }, [atoken]);

  const handleLogout = () => {
    localStorage.removeItem('atoken');
    setatoken('');
    toast.info('Logged out successfully');
    window.location.replace('/adminlogin');
  };

  if (!atoken) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Admin Sidebar/Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-orange-600 to-amber-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg shadow-orange-100 shrink-0">
                <GraduationCap className="text-white w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <h1 className="text-lg sm:text-xl font-bold text-slate-800 whitespace-nowrap">
                Admin <span className="hidden min-[400px]:inline text-orange-600">Dashboard</span>
              </h1>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <button 
                onClick={fetchData}
                className="p-2 text-slate-500 hover:text-orange-600 transition-colors"
                title="Refresh Data"
              >
                <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-1.5 sm:gap-2 bg-red-50 text-red-600 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium hover:bg-red-100 transition-all border border-red-100 text-sm sm:text-base"
              >
                <LogOut className="w-3.5 h-3.5 sm:w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
                <span className="sm:hidden">Exit</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <p className="text-sm font-medium text-slate-500 mb-1">Total Inquiries</p>
            <p className="text-3xl font-bold text-slate-900">{data.length}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <p className="text-sm font-medium text-slate-500 mb-1">Recent (24h)</p>
            <p className="text-3xl font-bold text-orange-600">New</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <p className="text-sm font-medium text-slate-500 mb-1">Status</p>
            <p className="text-3xl font-bold text-green-600">Active</p>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
            <h2 className="font-bold text-slate-800">Student Inquiries</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-slate-500 text-sm font-semibold uppercase tracking-wider bg-slate-50/30">
                  <th className="px-6 py-4">Student Name</th>
                  <th className="px-6 py-4">Contact Info</th>
                  <th className="px-6 py-4">Location</th>
                  <th className="px-6 py-4">Description</th>
                  <th className="px-6 py-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-slate-500">
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-8 h-8 border-4 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
                        <span>Loading inquiries...</span>
                      </div>
                    </td>
                  </tr>
                ) : data.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-slate-500">
                      No inquiries found.
                    </td>
                  </tr>
                ) : (
                  data.map((item, index) => (
                    <tr key={item._id || index} className="hover:bg-slate-50/80 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-900">{item.name}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          <p className="font-medium text-slate-700">{item.mobile}</p>
                          <p className="text-slate-500">{item.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-50 text-orange-700 border border-orange-100">
                          {item.location}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-slate-600 max-w-xs truncate" title={item.description}>
                          {item.description}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500 font-medium">
                        {item.createdAt ? new Date(item.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : 
                         item.date ? new Date(item.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : 
                         'No Date'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
