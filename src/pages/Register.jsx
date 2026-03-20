import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [pass, setPass] = useState('');
  const [role, setRole] = useState('customer');

  const getStrength = (p) => {
    let s = 0;
    if (p.length > 5) s += 1;
    if (p.length > 8) s += 1;
    if (/[A-Z]/.test(p)) s += 1;
    if (/[0-9]/.test(p)) s += 1;
    return s;
  };

  const str = getStrength(pass);
  const strColor = str < 2 ? 'bg-danger-red' : str < 4 ? 'bg-warning-amber' : 'bg-success-green';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    toast.success('Request submitted for approval.');
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex bg-off-white font-open">
      {/* Brand Panel (Hidden on Mobile) */}
      <div className="hidden lg:flex w-[40%] bg-brand-dark text-pure-white p-20 flex-col justify-between relative overflow-hidden">
        {/* Subtle Background Elements */}
        <div className="absolute top-0 right-0 w-full h-[500px] bg-brand-mid rounded-full mix-blend-overlay filter blur-[100px] opacity-20"></div>
        <div className="absolute bottom-0 left-[-20%] w-[60%] h-[60%] bg-accent-dark rounded-full mix-blend-overlay filter blur-[120px] opacity-20"></div>

        <div className="relative z-10">
          <button className="text-[1.5rem] font-poppins font-bold tracking-tight mb-20 hover:text-brand-light transition-colors" onClick={() => navigate('/')}>
            I-Solution<span className="text-accent-orange">.</span>
          </button>
          
          <h1 className="text-[3rem] font-poppins font-semibold leading-[1.1] mb-6 tracking-tight">
            Join the verified global pharmacy network.
          </h1>
          <p className="body-lg text-grey-mid max-w-sm">
            Access institutional-grade routing, inventory, and ISO certifications.
          </p>
        </div>
        
        <div className="relative z-10 flex items-center justify-between">
          <div className="font-poppins font-medium text-grey-mid">Trusted Pharma Platform</div>
        </div>
      </div>

      {/* Form Panel */}
      <div className="w-full lg:w-[60%] flex items-center justify-center p-6 sm:p-12 md:p-20 overflow-y-auto">
        <div className="w-full max-w-xl reveal-item is-visible pt-10 pb-10">
          {/* Mobile Header */}
          <div className="lg:hidden mb-12 text-center">
            <h1 className="text-[2.5rem] font-poppins font-bold tracking-tight mb-2 text-brand-dark">
              I-Solution<span className="text-accent-orange">.</span>
            </h1>
          </div>

          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-[2rem] font-poppins font-semibold text-text-dark mb-2">Request Access</h2>
            <p className="text-text-muted">Apply for an institutional distributor or facility account.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="label-ui mb-2 block">First Name</label>
                <input type="text" required className="w-full bg-pure-white border border-grey-light rounded-[8px] py-[12px] px-[16px] font-open text-text-dark transition-all duration-300 ease-pharma focus:border-brand-mid focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)] outline-none" placeholder="Sarah" />
              </div>
              <div>
                <label className="label-ui mb-2 block">Last Name</label>
                <input type="text" required className="w-full bg-pure-white border border-grey-light rounded-[8px] py-[12px] px-[16px] font-open text-text-dark transition-all duration-300 ease-pharma focus:border-brand-mid focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)] outline-none" placeholder="Jenkins" />
              </div>
            </div>

            <div>
              <label className="label-ui mb-2 block">Work Email</label>
              <input type="email" required className="w-full bg-pure-white border border-grey-light rounded-[8px] py-[12px] px-[16px] font-open text-text-dark transition-all duration-300 ease-pharma focus:border-brand-mid focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)] outline-none" placeholder="sarah@pharmaplus.com" />
            </div>

            <div>
              <label className="label-ui mb-2 block">Account Type</label>
              <div className="flex bg-grey-light p-1 rounded-[10px]">
                <button type="button" onClick={() => setRole('customer')} className={`flex-1 py-2 text-sm font-poppins font-medium rounded-[8px] transition-all ${role==='customer' ? 'bg-pure-white shadow-sm text-text-dark' : 'text-text-muted'}`}>Facility / Hospital</button>
                <button type="button" onClick={() => setRole('distributor')} className={`flex-1 py-2 text-sm font-poppins font-medium rounded-[8px] transition-all ${role==='distributor' ? 'bg-pure-white shadow-sm text-text-dark' : 'text-text-muted'}`}>Distributor</button>
              </div>
            </div>
            
            <div>
              <label className="label-ui mb-2 block">Create Password</label>
              <input 
                type="password" 
                required 
                className="w-full bg-pure-white border border-grey-light rounded-[8px] py-[12px] px-[16px] font-open text-text-dark transition-all duration-300 ease-pharma focus:border-brand-mid focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)] outline-none mb-3" 
                placeholder="••••••••"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
              />
              {pass && (
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-[6px] bg-grey-light rounded-full overflow-hidden flex">
                    <div className={`h-full transition-all duration-300 ease-pharma ${strColor}`} style={{width: `${(str/4)*100}%`}}></div>
                  </div>
                  <span className="text-xs font-open text-text-muted w-16 text-right">
                    {str < 2 ? 'Weak' : str < 4 ? 'Moderate' : 'Strong'}
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-start gap-3 mt-8">
              <input type="checkbox" required className="mt-1 w-4 h-4 rounded border-grey-mid text-brand-mid focus:ring-brand-mid accent-brand-mid" />
              <span className="text-[0.875rem] text-text-muted leading-relaxed">
                I verify that I represent a licensed pharmaceutical entity and agree to the <a href="#" className="font-medium text-brand-mid hover:underline">Terms of Service</a>.
              </span>
            </div>

            <button 
              type="submit" 
              className="btn-primary w-full h-[50px] flex justify-center items-center mt-6"
              disabled={loading}
            >
              {loading ? <span className="w-5 h-5 border-[2px] border-pure-white border-t-transparent rounded-full animate-spin"></span> : 'Submit Application'}
            </button>
          </form>

          <div className="mt-8 text-center text-text-muted text-sm">
            Already verified? <button onClick={() => navigate('/login')} className="font-poppins font-semibold text-brand-mid hover:text-brand-dark transition-colors ml-1">Sign In instead</button>
          </div>
        </div>
      </div>
    </div>
  );
}
