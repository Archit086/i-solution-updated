import { useCountUp } from '../hooks/useCountUp';
import { useAuth } from '../context/AuthContext';
import { LineChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

export default function Dashboard() {
  const { role } = useAuth();
  
  const [r1, v1] = useCountUp(12400, 1500);
  const [r2, v2] = useCountUp(842, 1200);
  const [r3, v3] = useCountUp(99, 1000);
  const [r4, v4] = useCountUp(94, 1800);

  const lineData = [
    { name: '1', uv: 400 }, { name: '5', uv: 300 }, { name: '10', uv: 550 },
    { name: '15', uv: 480 }, { name: '20', uv: 700 }, { name: '25', uv: 680 }, { name: '30', uv: 900 }
  ];

  const pieData = [
    { name: 'Ophthalmic', value: 400 }, { name: 'Cardiology', value: 300 },
    { name: 'Neurology', value: 300 }, { name: 'Pediatrics', value: 200 }
  ];
  const COLORS = ['#2BA8A0', '#F5A623', '#38A169', '#718096'];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl mb-6">Overview</h1>
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div ref={r1} className="card p-5 border-t-4 border-t-brand-teal flex flex-col relative overflow-hidden">
          <div className="absolute top-5 right-5 w-10 h-10 rounded-full bg-brand-light flex items-center justify-center text-brand-dark text-xl">📦</div>
          <span className="label-ui mb-2 text-text-muted">TOTAL PRODUCTS</span>
          <span className="text-[2rem] font-nunito font-extrabold text-text-dark leading-none mb-2">{v1}</span>
          <span className="text-sm font-semibold text-success-green">↑ 12% vs last month</span>
        </div>
        
        <div ref={r2} className="card p-5 border-t-4 border-t-accent-orange flex flex-col relative overflow-hidden">
          <div className="absolute top-5 right-5 w-10 h-10 rounded-full bg-accent-light flex items-center justify-center text-accent-dark text-xl">🛒</div>
          <span className="label-ui mb-2 text-text-muted">ACTIVE ORDERS</span>
          <span className="text-[2rem] font-nunito font-extrabold text-text-dark leading-none mb-2">{v2}</span>
          <span className="text-sm font-semibold text-danger-red">↓ 3% vs last month</span>
        </div>

        <div ref={r3} className="card p-5 border-t-4 border-t-success-green flex flex-col relative overflow-hidden">
          <div className="absolute top-5 right-5 w-10 h-10 rounded-full bg-success-light flex items-center justify-center text-success-green text-xl">📄</div>
          <span className="label-ui mb-2 text-text-muted">COMPLIANCE RATE</span>
          <span className="text-[2rem] font-nunito font-extrabold text-text-dark leading-none mb-2">{v3}.9%</span>
          <span className="text-sm font-semibold text-text-muted">Fully verified</span>
        </div>

        <div ref={r4} className="card p-5 border-t-4 border-t-warning-amber flex flex-col relative overflow-hidden">
          <div className="absolute top-5 right-5 w-10 h-10 rounded-full bg-warning-light flex items-center justify-center text-warning-amber text-xl">⚠️</div>
          <span className="label-ui mb-2 text-text-muted">HEALTHY STOCK</span>
          <span className="text-[2rem] font-nunito font-extrabold text-text-dark leading-none mb-2">{v4}%</span>
          <span className="text-sm font-semibold text-text-muted">Across all warehouses</span>
        </div>
      </div>

      {/* Charts */}
      {role === 'admin' && (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card lg:col-span-2 p-6">
          <h3 className="mb-6">Orders — Last 30 Days</h3>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData} margin={{ top: 5, right: 20, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EEF0F2" />
                <XAxis dataKey="name" tick={{fontSize: 12, fill: '#718096'}} axisLine={false} tickLine={false} />
                <YAxis tick={{fontSize: 12, fill: '#718096'}} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{borderRadius: '8px', border: '1px solid #EEF0F2', boxShadow: '0 4px 6px rgba(0,0,0,0.05)'}} />
                <Line type="monotone" dataKey="uv" stroke="#2BA8A0" strokeWidth={3} dot={{r: 4, fill: '#2BA8A0', strokeWidth: 0}} activeDot={{r: 6}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="card lg:col-span-1 p-6 flex flex-col">
          <h3 className="mb-4">Stock by Category</h3>
          <div className="h-[240px] w-full flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={2} dataKey="value" stroke="none">
                  {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}} />
                <Legend iconType="circle" wrapperStyle={{fontSize: '12px', color: '#4A5568', marginTop: '10px'}} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      )}

      {/* Table */}
      <div className="card p-0 overflow-hidden">
        <div className="p-5 border-b border-grey-light flex justify-between items-center bg-pure-white">
          <h3 className="mb-0">Recent Orders</h3>
          <a href="#" className="font-nunito font-bold text-accent-orange text-sm hover:underline">View All →</a>
        </div>
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap min-w-[600px]">
            <thead>
              <tr className="bg-off-white">
                <th className="p-4 label-ui text-text-muted font-normal border-b border-grey-light">Order ID</th>
                <th className="p-4 label-ui text-text-muted font-normal border-b border-grey-light">Product</th>
                <th className="p-4 label-ui text-text-muted font-normal border-b border-grey-light">Qty</th>
                <th className="p-4 label-ui text-text-muted font-normal border-b border-grey-light">Status</th>
                <th className="p-4 label-ui text-text-muted font-normal border-b border-grey-light">Date</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((i) => (
                <tr key={i} className={`hover:bg-brand-light transition-colors ${i % 2 === 0 ? 'bg-off-white' : 'bg-pure-white'}`}>
                  <td className="p-4 mono-id border-b border-grey-light">#ORD-98{i}4A</td>
                  <td className="p-4 font-open font-semibold text-text-dark border-b border-grey-light">IsoTears Premium {i}</td>
                  <td className="p-4 font-open border-b border-grey-light text-text-body">{i * 12}</td>
                  <td className="p-4 border-b border-grey-light">
                    {i === 2 ? <span className="badge-pending tracking-normal">Processing</span> : <span className="badge-approved tracking-normal">Shipped</span>}
                  </td>
                  <td className="p-4 font-open text-text-muted text-sm border-b border-grey-light">Oct 1{i}, 2025</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
