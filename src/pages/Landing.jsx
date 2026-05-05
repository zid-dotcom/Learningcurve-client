import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContext } from '../context/Appcontext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, 
  Heart, 
  Home, 
  Palette, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  Mail,
  Phone,
  User,
  MapPin,
  GraduationCap,
  Award,
  BookOpen,
  Zap,
  Menu,
  X
} from 'lucide-react';

const Landing = () => {
  const { BackendURL } = useContext(AppContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    location: '',
    description: '',
    acceptTerms: false,
    acceptMarketing: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Close menu on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isMenuOpen) setIsMenuOpen(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMenuOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ 
      ...formData, 
      [name]: type === 'checkbox' ? checked : value 
    });
  };

  const scrollToForm = () => {
    setIsMenuOpen(false);
    // Use a small timeout to ensure the menu close animation doesn't interfere with the scroll
    setTimeout(() => {
      const element = document.getElementById('inquiry-form');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.acceptTerms) {
      toast.warning('Please accept the terms and conditions');
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await axios.post(`${BackendURL}/add`, formData);
      if (response.status === 200 || response.status === 201) {
        toast.success('Information submitted successfully!');
        setFormData({
          name: '',
          mobile: '',
          email: '',
          location: '',
          description: '',
          acceptTerms: false,
          acceptMarketing: false
        });
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast.error(error.response?.data || 'Error submitting form');
    } finally {
      setIsSubmitting(false);
    }
  };

  const features = [
    {
      icon: <Heart className="w-6 h-6 text-orange-600" />,
      title: "Holistic Development",
      desc: "Focusing on social, emotional, and cognitive growth for a well-rounded foundation."
    },
    {
      icon: <Home className="w-6 h-6 text-amber-500" />,
      title: "Home-like Environment",
      desc: "A warm, nurturing space where every child feels safe, loved, and at home."
    },
    {
      icon: <Palette className="w-6 h-6 text-orange-400" />,
      title: "Creative Learning",
      desc: "Encouraging curiosity through play-based activities and artistic expression."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-yellow-500" />,
      title: "Safe & Secure",
      desc: "State-of-the-art security and attentive care to ensure complete peace of mind."
    }
  ];

  return (
    <div className="min-h-screen bg-[#fffcf9] font-sans text-slate-900 overflow-x-hidden">
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 w-full bg-white/70 backdrop-blur-xl z-50 border-b border-orange-100/50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <div 
              onClick={() => navigate('/')}
              className="flex items-center gap-2 sm:gap-3 group cursor-pointer shrink-0"
            >
              <div className="w-8 h-8 sm:w-11 sm:h-11 bg-gradient-to-br from-orange-600 to-amber-600 rounded-lg sm:rounded-2xl flex items-center justify-center shadow-lg shadow-orange-100 group-hover:scale-105 transition-transform">
                <GraduationCap className="text-white w-4 h-4 sm:w-6 sm:h-6" />
              </div>
              <span className="text-lg sm:text-2xl font-black tracking-tight text-slate-800">
                <span className="sm:hidden">Learning <span className="text-orange-600">Curve</span></span>
                <span className="hidden sm:inline">The Learning <span className="text-orange-600">Curve</span></span>
              </span>
            </div>
            
            <div className="hidden md:flex items-center gap-6">
              <button 
                onClick={() => navigate('/adminlogin')} 
                className="text-sm font-bold text-slate-500 hover:text-orange-600 transition-colors whitespace-nowrap"
              >
                Admin Portal
              </button>
              <button 
                onClick={scrollToForm}
                className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-all shadow-lg active:scale-95 whitespace-nowrap"
              >
                Join Now
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-slate-600 hover:text-orange-600 transition-colors"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-b border-orange-100 overflow-hidden"
            >
              <div className="px-4 py-6 space-y-3">
                <button 
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMenuOpen(false);
                    navigate('/adminlogin');
                  }}
                  className="block w-full text-left px-4 py-2.5 text-base font-bold text-slate-600 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all"
                >
                  Admin Portal
                </button>
                <div className="pt-2 flex justify-start">
                  <button 
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      scrollToForm();
                    }}
                    className="px-8 py-3 bg-slate-900 text-white font-bold rounded-xl shadow-lg hover:bg-slate-800 active:scale-95 transition-all text-sm whitespace-nowrap"
                  >
                    Join Now
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-100/50 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-amber-50/50 rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 text-[10px] sm:text-xs font-bold tracking-widest text-orange-600 uppercase bg-orange-50 rounded-full border border-orange-100"
              >
                <MapPin className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                Jayanagar, Bengaluru
              </motion.span>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter mb-6 sm:mb-8 leading-[1.1] sm:leading-[1] text-slate-900">
                The Learning Curve <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-500">
                  Best Preschool & Daycare
                </span>
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-slate-600 mb-8 sm:mb-12 leading-relaxed max-w-2xl font-medium">
                Premier Daycare & Preschool services across 6 prime locations in Bengaluru, Karnataka. Providing a nurturing environment for your child's growth.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={scrollToForm}
                  className="w-full sm:w-auto px-8 py-4 sm:px-10 sm:py-5 bg-orange-600 text-white rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg hover:bg-orange-700 transition-all shadow-2xl shadow-orange-200 flex items-center justify-center gap-3 group"
                >
                  Start Your Journey
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
                <div className="flex flex-col gap-1 sm:ml-2">
                  <div className="flex -space-x-3 mb-1">
                    {[1,2,3,4].map(i => (
                      <div key={i} className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 sm:border-4 border-white bg-slate-${i*100+200} shadow-sm overflow-hidden`}>
                        <img src={`https://i.pravatar.cc/100?img=${i+20}`} alt="user" className="w-full h-full object-cover" />
                      </div>
                    ))}
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 sm:border-4 border-white bg-orange-600 flex items-center justify-center text-[8px] sm:text-[10px] font-bold text-white shadow-sm">
                      +2k
                    </div>
                  </div>
                  <span className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">Trusted by 2,000+ Students</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative block mt-12 lg:mt-0"
            >
              <div className="relative z-10 bg-white rounded-[2.5rem] p-3 shadow-2xl border border-orange-50 overflow-hidden group">
                <div className="aspect-[4/5] rounded-[2rem] overflow-hidden relative">
                  <img 
                    src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop" 
                    alt="Learning Environment" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-orange-950/20 to-transparent"></div>
                </div>
              </div>
              
              {/* Removed decorative floating badges as requested */}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-4 sm:mb-6 tracking-tight">Why The Learning Curve?</h2>
            <p className="text-base sm:text-lg text-slate-500 font-medium leading-relaxed">
              We've refined our process over years of experience to ensure every student gets the personalized attention they deserve.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] bg-[#fffcf9] hover:bg-white hover:shadow-2xl hover:shadow-orange-100 transition-all border border-orange-50"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-white shadow-sm flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-2 sm:mb-3">{feature.title}</h3>
                <p className="text-sm sm:text-base text-slate-500 font-medium leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Form Section */}
      <section id="inquiry-form" className="py-16 sm:py-32 bg-orange-600 relative overflow-hidden">
        {/* Decorative Circles */}
        <div className="absolute top-0 right-0 w-[40%] h-[80%] bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-[30%] h-[60%] bg-amber-400/20 rounded-full blur-3xl -ml-20 -mb-20"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-20 items-center">
            <div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 sm:mb-8 leading-tight">
                Take the first step <br />
                <span className="text-orange-100">towards mastery.</span>
              </h2>
              <div className="space-y-4 sm:space-y-6">
                {[
                  "Personalized curriculum tailored to you",
                  "Weekly 1-on-1 mentorship sessions",
                  "Lifetime access to our alumni network",
                  "Direct job placement assistance"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 sm:gap-4 text-white/90">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    </div>
                    <span className="font-bold text-base sm:text-lg">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white p-6 sm:p-8 md:p-12 rounded-[2rem] sm:rounded-[3rem] shadow-2xl relative"
            >
              <div className="absolute top-8 right-12 opacity-5">
                <Mail className="w-24 h-24 sm:w-32 sm:h-32 text-orange-600" />
              </div>

              <form onSubmit={handleSubmit} className="relative z-10 space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-300" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                        className="w-full pl-10 sm:pl-12 pr-4 sm:pr-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-orange-100 focus:border-orange-500 outline-none transition-all text-base sm:text-lg font-medium"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Phone</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-300" />
                      <input
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        required
                        placeholder="+91 XXXXX XXXXX"
                        className="w-full pl-10 sm:pl-12 pr-4 sm:pr-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-orange-100 focus:border-orange-500 outline-none transition-all text-base sm:text-lg font-medium"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-300" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                        className="w-full pl-10 sm:pl-12 pr-4 sm:pr-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-orange-100 focus:border-orange-500 outline-none transition-all text-base sm:text-lg font-medium"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-300" />
                      <select
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 sm:pl-12 pr-8 sm:pr-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-orange-100 focus:border-orange-500 outline-none transition-all text-base sm:text-lg font-medium appearance-none"
                      >
                        <option value="" disabled>Select Location</option>
                        <option value="Jayanagar">Jayanagar</option>
                      </select>
                      <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-300 rotate-90 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5 sm:space-y-2">
                  <label className="text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Your Goals</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows="3"
                    placeholder="Tell us what you want to achieve..."
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-orange-100 focus:border-orange-500 outline-none transition-all text-base sm:text-lg font-medium resize-none"
                  ></textarea>
                </div>

                <div className="space-y-3 sm:space-y-4 pt-2">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <div className="relative mt-1">
                      <input
                        type="checkbox"
                        name="acceptTerms"
                        checked={formData.acceptTerms}
                        onChange={handleChange}
                        className="peer sr-only"
                      />
                      <div className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-slate-200 rounded-lg group-hover:border-orange-500 peer-checked:bg-orange-600 peer-checked:border-orange-600 transition-all flex items-center justify-center">
                        <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                      </div>
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-slate-600 leading-tight select-none">
                      Accept terms & conditions, receive calls, notifications on WhatsApp
                    </span>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer group">
                    <div className="relative mt-1">
                      <input
                        type="checkbox"
                        name="acceptMarketing"
                        checked={formData.acceptMarketing}
                        onChange={handleChange}
                        className="peer sr-only"
                      />
                      <div className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-slate-200 rounded-lg group-hover:border-orange-500 peer-checked:bg-orange-600 peer-checked:border-orange-600 transition-all flex items-center justify-center">
                        <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                      </div>
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-slate-600 leading-tight select-none">
                      Hereby accept to send me newsletters for marketing and promotional content
                    </span>
                  </label>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 sm:py-5 rounded-xl sm:rounded-2xl font-black text-lg sm:text-xl text-white transition-all shadow-xl group relative overflow-hidden ${
                      isSubmitting ? 'bg-orange-400 cursor-not-allowed' : 'bg-orange-600 hover:bg-orange-700 active:scale-95'
                    }`}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 sm:w-6 sm:h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Processing...
                        </>
                      ) : (
                        <>
                          Submit Application
                          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 sm:py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 sm:gap-12 mb-12 sm:mb-16">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-orange-600 rounded-lg sm:rounded-xl flex items-center justify-center text-white shadow-lg">
                <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <span className="font-black text-slate-900 text-lg sm:text-xl tracking-tight">The Learning Curve</span>
            </div>
            <div className="flex gap-8 sm:gap-12">
              <a href="#" className="text-slate-500 font-bold hover:text-orange-600 transition-colors">Twitter</a>
              <a href="#" className="text-slate-500 font-bold hover:text-orange-600 transition-colors">LinkedIn</a>
              <a href="#" className="text-slate-500 font-bold hover:text-orange-600 transition-colors">Instagram</a>
            </div>
          </div>
          <div className="text-center pt-8 border-t border-slate-50">
            <p className="text-slate-400 text-xs sm:text-sm font-bold tracking-wide">
              &copy; {new Date().getFullYear()} The Learning Curve. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
