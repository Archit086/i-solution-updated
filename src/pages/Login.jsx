import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (email === 'admin@example.com') {
        await login('fake-jwt-token', { role: 'admin', name: 'Admin User' });
        navigate('/dashboard');
        toast.success('Welcome back, Admin!');
        return;
      }

      await login('fake-jwt-token', { role: 'customer', name: 'Customer User' });
      navigate('/dashboard');
      toast.success('Logged in securely.');
    } catch {
      toast.error('Invalid credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-off-white font-open">
      {/* Brand Panel (Hidden on Mobile) */}
      <div className="hidden lg:flex w-1/2 bg-brand-dark text-pure-white p-20 flex-col justify-between relative overflow-hidden">
        {/* Subtle Background Elements */}
        <div className="absolute top-0 right-0 w-full h-[500px] bg-brand-mid rounded-full mix-blend-overlay filter blur-[100px] opacity-20"></div>
        <div className="absolute bottom-0 left-[-20%] w-[60%] h-[60%] bg-accent-dark rounded-full mix-blend-overlay filter blur-[120px] opacity-20"></div>

        <div className="relative z-10">
          <button className="text-[1.5rem] font-poppins font-bold tracking-tight mb-20 hover:text-brand-light transition-colors" onClick={() => navigate('/')}>
            I-Solution<span className="text-accent-orange">.</span>
          </button>
          
          <h1 className="text-[3.5rem] font-poppins font-semibold leading-[1.1] mb-6 tracking-tight">
            Secure, verified access to global supply chains.
          </h1>
          <p className="body-lg text-grey-mid max-w-md">
            Manage your ISO compliant pharmaceutical inventory with absolute transparency and confidence.
          </p>
        </div>
        
        <div className="relative z-10 flex items-center justify-between">
          <div className="font-poppins font-medium text-grey-mid">Trusted Pharma Platform</div>
          <p className="body-sm text-grey-mid opacity-60">© 2026 I-Solution</p>
        </div>
      </div>

      {/* Form Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 md:p-20 relative">
        <div className="w-full max-w-md reveal-item is-visible">
          {/* Mobile Header */}
          <div className="lg:hidden mb-12 text-center">
            <h1 className="text-[2.5rem] font-poppins font-bold tracking-tight mb-2 text-brand-dark">
              I-Solution<span className="text-accent-orange">.</span>
            </h1>
          </div>

          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-[2rem] font-poppins font-semibold text-text-dark mb-2">Sign In</h2>
            <p className="text-text-muted">Please enter your credentials.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="label-ui mb-2 block">Email Address</label>
              <input 
                type="email" 
                required 
                className="w-full bg-pure-white border border-grey-light rounded-[8px] py-[12px] px-[16px] font-open text-text-dark transition-all duration-300 ease-pharma focus:border-brand-mid focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)] outline-none" 
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div>
              <label className="label-ui mb-2 flex justify-between">
                Password
                <a href="#" className="text-brand-mid font-medium capitalize hover:underline">Forgot?</a>
              </label>
              <input 
                type="password" 
                required 
                className="w-full bg-pure-white border border-grey-light rounded-[8px] py-[12px] px-[16px] font-open text-text-dark transition-all duration-300 ease-pharma focus:border-brand-mid focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)] outline-none" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button 
              type="submit" 
              className="btn-primary w-full h-[50px] flex justify-center items-center mt-4"
              disabled={loading}
            >
              {loading ? <span className="w-6 h-6 border-[3px] border-pure-white border-t-transparent rounded-full animate-spin"></span> : 'Sign In'}
            </button>
          </form>

          <div className="mt-8 text-center text-text-muted text-sm">
            Don't have an account? <button onClick={() => navigate('/register')} className="font-poppins font-semibold text-brand-mid hover:text-brand-dark transition-colors ml-1">Request Access</button>
          </div>
        </div>
      </div>
    </div>
  );
}
