import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Orders() {
  const { role } = useAuth();
  const tabs = ['All', 'Pending', 'Shipped', 'Delivered', 'Cancelled'];
  const [activeTab, setActiveTab] = useState(0);

  const orders = [
    { id: 101, prod: 'IsoTears', qty: 15, customer: 'PharmaPlus', status: 'Pending', date: '2025-10-01' },
    { id: 102, prod: 'CardioMax', qty: 2, customer: 'HealthClinic', status: 'Shipped', date: '2025-10-02' },
  ];

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl m-0">{role === 'customer' ? 'My Orders' : 'All Orders'}</h1>
      </div>

      {/* Animated Tab Bar */}
      <div className="relative border-b border-grey-light mb-6 flex overflow-x-auto no-scrollbar mask-gradient">
        {tabs.map((tab, idx) => (
          <button
            key={idx}
            className={`px-5 py-3 font-nunito text-[0.9375rem] whitespace-nowrap transition-colors relative z-10 ${
              activeTab === idx ? 'text-brand-teal font-extrabold' : 'text-text-muted hover:text-text-dark font-bold'
            }`}
            onClick={() => setActiveTab(idx)}
          >
            {tab}
            {idx === 1 && <span className="ml-2 bg-warning-light text-warning-amber py-[2px] px-2 rounded-full text-[0.65rem]">3</span>}
          </button>
        ))}
        {/* Underline Indicator */}
        <div 
          className="absolute bottom-0 h-[3px] bg-brand-teal transition-all duration-300 left-0"
          style={{ width: '80px', transform: `translateX(${activeTab * 95}px)` }} // roughly, relies on fixed width tabs typically or ref based bounding boxes. This is a simplified CSS approx.
        ></div>
      </div>

      <div className="card p-0 overflow-hidden">
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left whitespace-nowrap">
            <thead className="bg-off-white">
              <tr>
                <th className="p-4 label-ui border-b border-grey-light">Order ID</th>
                <th className="p-4 label-ui border-b border-grey-light">Product</th>
                <th className="p-4 label-ui border-b border-grey-light">Qty</th>
                {role === 'admin' && <th className="p-4 label-ui border-b border-grey-light">Customer</th>}
                <th className="p-4 label-ui border-b border-grey-light">Status</th>
                <th className="p-4 label-ui border-b border-grey-light">Date</th>
                <th className="p-4 label-ui border-b border-grey-light"></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="hover:bg-brand-light transition-colors border-b border-grey-light last:border-0 cursor-pointer">
                  <td className="p-4 mono-id">#{o.id}</td>
                  <td className="p-4 font-semibold text-text-dark">{o.prod}</td>
                  <td className="p-4 text-text-body">{o.qty} {o.qty > 10 && <span className="badge-teal ml-2 text-[0.65rem]">Bulk</span>}</td>
                  {role === 'admin' && <td className="p-4 text-text-body">{o.customer}</td>}
                  <td className="p-4">
                    {o.status === 'Pending' && <span className="badge-pending tracking-normal">Pending</span>}
                    {o.status === 'Shipped' && <span className="badge-approved bg-[#EBF8FF] text-[#2B6CB0] tracking-normal">Shipped</span>}
                  </td>
                  <td className="p-4 text-text-muted font-open text-sm">{o.date}</td>
                  <td className="p-4 text-right">
                    <button className="text-brand-teal font-bold px-2 hover:underline">Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
