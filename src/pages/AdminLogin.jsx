import React, { useContext, useState } from 'react';
import { AppContext } from '../context/Appcontext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';

const AdminLogin = () => {
    const { BackendURL, setatoken } = useContext(AppContext);
    const [inp, setinp] = useState({
        email: "", 
        password: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.post(`${BackendURL}/adminlogin`, inp);
            if (response.status === 200) {
                const token = response.data.token;
                setatoken(token);
                localStorage.setItem('atoken', token);
                toast.success('Welcome back, Admin!');
                navigate('/adminpanel', { replace: true });
            }
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data || 'Invalid credentials');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
            <div className="max-w-md w-full">
                {/* Logo / Brand */}
                <div className="text-center mb-8 sm:mb-10">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-orange-600 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-orange-100">
                        <GraduationCap className="text-white w-7 h-7 sm:w-8 sm:h-8" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">The Learning <span className="text-orange-600">Curve</span></h2>
                    <p className="text-slate-500 mt-2 font-medium tracking-wide text-sm sm:text-base">Administrative Access</p>
                </div>

                {/* Login Card */}
                <div className="bg-white p-6 sm:p-8 rounded-[2rem] sm:rounded-3xl shadow-xl border border-slate-100">
                    <h1 className="text-lg sm:text-xl font-bold text-slate-800 mb-6 text-center">Login to Dashboard</h1>
                    
                    <form onSubmit={handleLogin} className="space-y-4 sm:space-y-6">
                        <div className="space-y-1.5 sm:space-y-2">
                            <label className="text-xs sm:text-sm font-semibold text-slate-700">Email Address</label>
                            <input 
                                onChange={(e) => setinp({ ...inp, email: e.target.value })} 
                                value={inp.email} 
                                placeholder="admin@learningcurve.com" 
                                className="w-full px-4 py-2.5 sm:py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-sm sm:text-base" 
                                type="email" 
                                required 
                            />
                        </div>
                        <div className="space-y-1.5 sm:space-y-2">
                            <label className="text-xs sm:text-sm font-semibold text-slate-700">Password</label>
                            <input 
                                onChange={(e) => setinp({ ...inp, password: e.target.value })} 
                                value={inp.password} 
                                placeholder="••••••••" 
                                className="w-full px-4 py-2.5 sm:py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-sm sm:text-base" 
                                type="password" 
                                required 
                            />
                        </div>

                        <button 
                            type="submit"
                            disabled={isLoading}
                            className={`w-full py-3.5 sm:py-4 rounded-xl font-bold text-white transition-all shadow-lg text-sm sm:text-base ${
                                isLoading ? 'bg-orange-400 cursor-not-allowed' : 'bg-orange-600 hover:bg-orange-700 hover:shadow-orange-200'
                            }`}
                        >
                            {isLoading ? 'Authenticating...' : 'Sign In'}
                        </button>
                    </form>

                    <div className="mt-6 sm:mt-8 text-center">
                        <button 
                            onClick={() => navigate('/')} 
                            className="text-xs sm:text-sm font-medium text-slate-400 hover:text-orange-600 transition-colors"
                        >
                            ← Back to Home
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
