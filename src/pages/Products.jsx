import { useState } from 'react';
import toast from 'react-hot-toast';

export default function Products() {
  const [slideOpen, setSlideOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [targetProduct, setTargetProduct] = useState(null);
  
  const [products] = useState(Array.from({length: 6}).map((_,i) => ({
    id: i, name: `PharmaProduct ${i}X`, category: i%2===0?'Ophthalmic':'Cardiology', price: 15+i, stock: i===3?5:i===5?0:42
  })));

  const handleEdit = (p) => { setTargetProduct(p); setSlideOpen(true); };
  const handleDelete = (p) => { setTargetProduct(p); setConfirmOpen(true); };

  const onConfirmDelete = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setLoading(false);
    setConfirmOpen(false);
    toast.success('Product deleted.');
  };

  const onSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    setSlideOpen(false);
    toast.success('Product saved.');
  };

  return (
    <div className="relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl m-0">Manage Products</h1>
          <span className="badge-teal text-xs">24 Total</span>
        </div>
        <div className="flex w-full sm:w-auto gap-3">
          <input type="text" placeholder="Search..." className="input flex-1 sm:w-64" />
          <button className="btn-orange whitespace-nowrap" onClick={() => {setTargetProduct(null); setSlideOpen(true);}}>Add Product</button>
        </div>
      </div>

      <div className="card p-0 overflow-hidden hidden md:block">
        <table className="w-full text-left whitespace-nowrap">
          <thead className="bg-off-white">
            <tr>
              <th className="p-4 label-ui border-b border-grey-light">Name</th>
              <th className="p-4 label-ui border-b border-grey-light">Category</th>
              <th className="p-4 label-ui border-b border-grey-light">Price</th>
              <th className="p-4 label-ui border-b border-grey-light">Stock</th>
              <th className="p-4 label-ui border-b border-grey-light text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-brand-light transition-colors border-b border-grey-light last:border-0">
                <td className="p-4 font-semibold text-text-dark">{p.name}</td>
                <td className="p-4"><span className="badge-teal tracking-normal">{p.category}</span></td>
                <td className="p-4 font-bold text-brand-dark">${p.price}</td>
                <td className="p-4">
                  {p.stock > 10 ? <span className="badge-approved tracking-normal">{p.stock} units</span>
                   : p.stock > 0 ? <span className="badge-pending tracking-normal">{p.stock} units</span>
                   : <span className="badge-danger tracking-normal animate-pulse-ring">Out of Stock</span>}
                </td>
                <td className="p-4 text-right">
                  <button onClick={() => handleEdit(p)} className="text-brand-teal hover:bg-brand-light p-2 rounded mr-2 transition-colors">✏️ Edit</button>
                  <button onClick={() => handleDelete(p)} className="text-danger-red hover:bg-danger-light p-2 rounded transition-colors">🗑 Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Mobile Card Layout */}
      <div className="md:hidden space-y-4">
        {products.map((p) => (
          <div key={p.id} className="card p-4">
            <div className="flex justify-between items-start mb-2">
              <span className="badge-teal text-[10px]">{p.category}</span>
              {p.stock > 10 ? <span className="badge-approved text-[10px]">{p.stock} in stock</span> : <span className="badge-danger text-[10px]">Low stock</span>}
            </div>
            <h3 className="text-[1.125rem] mb-1">{p.name}</h3>
            <div className="font-bold text-brand-teal text-lg mb-4">${p.price}</div>
            <div className="flex gap-2">
              <button className="btn-ghost flex-1 py-1" onClick={() => handleEdit(p)}>Edit</button>
              <button className="btn-danger flex-1 py-1" onClick={() => handleDelete(p)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* OVERLAYS */}
      {/* SlideOver */}
      {slideOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-[#1A2530]/40 backdrop-blur-sm" onClick={() => setSlideOpen(false)}></div>
          <div className="relative w-full md:w-[480px] bg-pure-white h-full shadow-[-10px_0_30px_rgba(0,0,0,0.1)] flex flex-col transform transition-transform animate-[slideIn_.3s_ease-out]">
            <div className="p-6 border-b border-grey-light flex justify-between items-center bg-off-white">
              <h2 className="text-[1.5rem] m-0">{targetProduct ? 'Edit Product' : 'Add Product'}</h2>
              <button className="text-2xl text-text-muted hover:text-text-dark" onClick={() => setSlideOpen(false)}>×</button>
            </div>
            <form className="p-6 flex-1 overflow-y-auto space-y-6" onSubmit={onSave}>
              <div>
                <label className="label-ui mb-2 block text-text-dark">Name</label>
                <input required type="text" className="input" defaultValue={targetProduct?.name} />
              </div>
              <div>
                <label className="label-ui mb-2 block text-text-dark">Category</label>
                <select className="input" defaultValue={targetProduct?.category}>
                  <option>Ophthalmic</option>
                  <option>Cardiology</option>
                </select>
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="label-ui mb-2 block text-text-dark">Price ($)</label>
                  <input required type="number" step="0.01" className="input" defaultValue={targetProduct?.price} />
                </div>
                <div className="flex-1">
                  <label className="label-ui mb-2 block text-text-dark">Stock</label>
                  <input required type="number" className="input" defaultValue={targetProduct?.stock} />
                </div>
              </div>
              <div>
                <label className="label-ui mb-2 block text-text-dark">Description</label>
                <textarea className="input min-h-[120px]" required></textarea>
              </div>
            </form>
            <div className="p-6 border-t border-grey-light flex justify-end gap-3 bg-off-white">
              <button className="btn-ghost" onClick={() => setSlideOpen(false)} type="button">Cancel</button>
              <button className="btn-primary w-[140px] flex justify-center items-center" onClick={onSave} disabled={loading}>
                {loading ? <span className="w-4 h-4 rounded-full border-2 border-pure-white border-t-transparent animate-spin"></span> : 'Save Product'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Modal */}
      {confirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#1A2530]/50 backdrop-blur-sm" onClick={() => setConfirmOpen(false)}></div>
          <div className="relative bg-pure-white rounded-xl p-8 max-w-sm w-full shadow-2xl animate-[scaleIn_.25s_ease-out]">
            <div className="w-16 h-16 rounded-full bg-danger-light text-danger-red flex items-center justify-center text-3xl mb-4 mx-auto">⚠️</div>
            <h3 className="text-center text-[1.5rem] mb-2">Delete Product?</h3>
            <p className="text-center text-text-body mb-8">Are you sure you want to delete <strong>{targetProduct?.name}</strong>? This cannot be undone.</p>
            <div className="flex gap-3">
              <button className="btn-ghost flex-1 py-3" onClick={() => setConfirmOpen(false)}>Cancel</button>
              <button className="btn-danger flex-1 py-3 flex justify-center items-center" onClick={onConfirmDelete} disabled={loading}>
                {loading ? <span className="w-4 h-4 rounded-full border-2 border-pure-white border-t-transparent animate-spin"></span> : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.92); } to { opacity: 1; transform: scale(1); } }
      `}}/>
    </div>
  );
}
