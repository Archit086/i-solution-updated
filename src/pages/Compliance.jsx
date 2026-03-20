import { useState } from 'react';
import toast from 'react-hot-toast';

export default function Compliance() {
  const [activeTab, setActiveTab] = useState('Pending');
  
  const [pending, setPending] = useState([
    { id: 1, title: 'ISO 9001:2015 Recertification', uploadedBy: 'Sarah Jenkins', role: 'Distributor', date: '2025-10-14', type: 'Certificate' },
    { id: 2, title: 'Q3 Batch Audit Report', uploadedBy: 'Michael Chang', role: 'Authority', date: '2025-10-15', type: 'Audit' },
  ]);

  const [approved, setApproved] = useState([
    { id: 3, title: 'Vendor Safety Protocol V4', uploadedBy: 'Admin System', role: 'Admin', date: '2025-09-01', type: 'Protocol' }
  ]);

  const [approvingId, setApprovingId] = useState(null);

  const handleApprove = async (doc) => {
    setApprovingId(doc.id);
    try {
      // Fake API delay
      await new Promise(r => setTimeout(r, 1200));
      
      const el = document.getElementById(`doc-${doc.id}`);
      if (el) {
        el.style.transition = 'all 400ms ease';
        el.style.opacity = '0';
        el.style.transform = 'translateY(-16px)';
        el.style.borderColor = '#2BA8A0';
      }
      
      await new Promise(r => setTimeout(r, 400));
      
      setPending(prev => prev.filter(p => p.id !== doc.id));
      setApproved(prev => [{...doc, date: new Date().toISOString().split('T')[0]}, ...prev]);
      toast.success('Compliance record approved');
    } catch {
      toast.error('Failed to approve record');
    } finally {
      setApprovingId(null);
    }
  };

  const renderTabButton = (name, count) => (
    <button
      onClick={() => setActiveTab(name)}
      className={`relative px-6 py-4 font-nunito text-[1rem] font-bold transition-colors ${
        activeTab === name ? 'text-brand-teal' : 'text-text-muted hover:text-text-dark'
      }`}
    >
      {name}
      {count !== undefined && (
        <span className={`ml-2 text-xs py-[2px] px-2 rounded-full ${
          activeTab === name ? 'bg-brand-light text-brand-dark' : 'bg-grey-light text-text-muted'
        }`}>{count}</span>
      )}
      {activeTab === name && (
        <div className="absolute bottom-0 left-0 w-full h-[3px] bg-brand-teal"></div>
      )}
    </button>
  );

  return (
    <div className="max-w-5xl">
      <h1 className="text-2xl mb-6">Compliance Review</h1>
      
      <div className="flex border-b border-grey-light mb-8">
        {renderTabButton('Pending', pending.length)}
        {renderTabButton('Approved', approved.length)}
      </div>

      {activeTab === 'Pending' && (
        <div className="space-y-6">
          {pending.length === 0 ? (
            <div className="text-center py-20 bg-pure-white rounded-xl border border-grey-light">
              <div className="w-16 h-16 rounded-full bg-success-light text-success-green flex items-center justify-center text-3xl mb-4 mx-auto">✓</div>
              <h3 className="mb-2">All compliance records reviewed</h3>
              <p className="text-text-muted">You're all caught up!</p>
            </div>
          ) : (
            pending.map(doc => (
              <div key={doc.id} id={`doc-${doc.id}`} className="card relative transition-all duration-400">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-[1.25rem] m-0 pr-4">{doc.title}</h3>
                  <span className="badge-pending animate-pulse-ring whitespace-nowrap">PENDING</span>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-6 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-light text-brand-teal flex items-center justify-center font-bold font-nunito">
                      {doc.uploadedBy.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-text-dark text-sm">{doc.uploadedBy}</div>
                      <div className="flex items-center gap-2">
                        <span className="badge-teal text-[10px] uppercase font-bold">{doc.role}</span>
                        <span className="text-text-muted text-xs font-open">{doc.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="hidden sm:block w-[1px] h-10 bg-grey-light"></div>
                  <div className="flex items-center">
                    <span className="badge-teal text-xs">Type: {doc.type}</span>
                  </div>
                </div>

                <div className="bg-off-white rounded-lg p-4 border border-grey-light mb-6 flex items-center gap-3">
                  <span className="text-2xl">📄</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-text-dark truncate">{doc.title.replace(/\s+/g, '_')}.pdf</div>
                    <div className="text-text-muted text-xs">2.4 MB</div>
                  </div>
                  <a href="#" className="font-nunito font-bold text-brand-teal text-sm hover:underline whitespace-nowrap">
                    View Document ↗
                  </a>
                </div>

                <button 
                  onClick={() => handleApprove(doc)}
                  disabled={!!approvingId}
                  className="btn-orange w-full h-12 shadow-deep flex items-center justify-center text-[1rem]"
                >
                  {approvingId === doc.id ? (
                    <span className="flex items-center gap-2">
                      <span className="w-5 h-5 border-2 border-pure-white border-t-transparent rounded-full animate-spin"></span>
                      Approving...
                    </span>
                  ) : 'Approve Record'}
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === 'Approved' && (
        <div className="space-y-6">
          {approved.map(doc => (
            <div key={doc.id} className="card border-l-4 border-l-success-green">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-[1.25rem] m-0">{doc.title}</h3>
                <span className="badge-approved">APPROVED</span>
              </div>
              
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-brand-light text-brand-teal flex items-center justify-center font-bold font-nunito text-xs">
                  {doc.uploadedBy.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-text-dark text-sm">{doc.uploadedBy}</div>
                  <div className="text-text-muted text-xs font-open">Approved on {doc.date}</div>
                </div>
              </div>

              <div className="bg-off-white rounded-lg p-3 border border-grey-light flex items-center gap-3 w-fit pr-6">
                <span className="text-xl">📄</span>
                <a href="#" className="font-nunito font-bold text-brand-teal text-sm hover:underline">
                  View Document ↗
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
