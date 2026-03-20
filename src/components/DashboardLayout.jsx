import { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useMediaQuery } from '../hooks/useMediaQuery';

export default function DashboardLayout() {
  const { user, role, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const navigate = useNavigate();

  useEffect(() => {
    if (isDesktop) setSidebarOpen(true);
    else setSidebarOpen(false);
  }, [isDesktop]);

  const navItems = {
    admin: [
      { path: '/dashboard', label: 'Dashboard', icon: '📊' },
      { path: '/dashboard/products', label: 'Products', icon: '📦' },
      { path: '/dashboard/orders', label: 'Orders', icon: '🛒' },
      { path: '/dashboard/compliance', label: 'Compliance', icon: '📄' },
      { path: '/dashboard/users', label: 'Users', icon: '👥' },
    ],
    authority: [
      { path: '/dashboard', label: 'Dashboard', icon: '📊' },
      { path: '/dashboard/compliance', label: 'Compliance Queue', icon: '📄' },
    ],
    customer: [
      { path: '/dashboard', label: 'Dashboard', icon: '📊' },
      { path: '/products', label: 'Browse Products', icon: '🔍' },
      { path: '/dashboard/orders', label: 'My Orders', icon: '📦' },
    ],
    distributor: [
      { path: '/dashboard', label: 'Dashboard', icon: '📊' },
      { path: '/products', label: 'Bulk Products', icon: '🔍' },
      { path: '/dashboard/orders', label: 'Order History', icon: '📦' },
    ]
  };

  const links = navItems[role] || navItems['customer'];

  return (
    <div className="min-h-screen bg-off-white flex">
      {/* Sidebar Drawer / Fixed */}
      <aside 
        className={`fixed top-0 left-0 h-full w-[260px] bg-off-white border-r border-grey-light transition-transform duration-300 ease-out z-40 flex flex-col
          ${sidebarOpen || isDesktop ? 'translate-x-[0]' : '-translate-x-full'}
        `}
      >
        <div className="p-6 h-16 flex items-center border-b border-grey-light">
          <div className="w-8 h-8 rounded-full bg-brand-teal flex items-center justify-center text-pure-white font-nunito font-bold mr-3 shadow-deep">I</div>
          <span className="font-nunito font-extrabold text-[1.25rem] text-brand-teal tracking-tight leading-none">I-Solution</span>
        </div>
        
        <nav className="flex-1 py-4 overflow-y-auto">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/dashboard'}
              className={({ isActive }) => 
                `flex items-center mx-3 py-3 px-5 rounded-lg gap-3 transition-colors duration-150 mb-1 font-nunito font-semibold text-[0.9375rem]
                ${isActive 
                  ? 'bg-brand-light border-l-4 border-brand-teal text-brand-dark' 
                  : 'text-text-body hover:bg-grey-light hover:text-text-dark'}`
              }
              onClick={() => !isDesktop && setSidebarOpen(false)}
            >
              <span className="text-xl">{link.icon}</span>
              {link.label}
            </NavLink>
          ))}
        </nav>
        
        <div className="p-4 border-t border-grey-light">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-brand-light text-brand-dark font-nunito font-bold flex items-center justify-center">
              {user?.email?.[0]?.toUpperCase() || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-open font-semibold text-[0.875rem] text-text-dark truncate">{user?.email || 'User'}</p>
              <span className="badge-teal text-[0.65rem] py-[2px] px-[8px] uppercase">{role}</span>
            </div>
            <button onClick={logout} className="text-danger-red hover:bg-danger-light p-2 rounded-lg transition-colors">
              ↪
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {!isDesktop && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-text-dark/40 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content wrapper */}
      <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${isDesktop ? 'ml-[260px]' : 'ml-0'}`}>
        {/* Top Navbar */}
        <header className="bg-pure-white h-16 border-b border-grey-light px-6 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center">
            {!isDesktop && (
              <button 
                onClick={() => setSidebarOpen(true)}
                className="mr-4 text-text-dark p-1"
              >
                ☰
              </button>
            )}
            <div className="text-text-muted font-open text-sm">Dashboard</div>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-text-muted hover:text-brand-teal transition">
              🔔
              <span className="absolute top-[4px] right-[4px] w-2 h-2 bg-danger-red rounded-full"></span>
            </button>
          </div>
        </header>

        {/* Dynamic Content */}
        <main className="p-4 md:p-6 lg:p-6 max-w-7xl mx-auto w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
