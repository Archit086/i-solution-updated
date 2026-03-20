import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';
import toast from 'react-hot-toast';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [imgRef, isImgVis] = useScrollReveal();
  const [stockWidth, setStockWidth] = useState(0);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(false);
  
  // Fake data based on ID
  const product = {
    id,
    name: 'IsoTears Premium Extra',
    category: 'Ophthalmic',
    price: 24.99,
    stock: 120,
    desc: 'Advanced lubrication formulation providing extended relief from dry eye symptoms. Manufactured in ISO-certified sterile environments.',
    complianceDate: '2025-10-15',
  };

  useEffect(() => {
    // Animate stock bar on mount
    const t = setTimeout(() => {
      setStockWidth(Math.min((product.stock / 200) * 100, 100)); // assuming 200 max capacity visually
    }, 100);
    return () => clearTimeout(t);
  }, [product.stock]);

  const handleOrder = async () => {
    setLoading(true);
    try {
      await new Promise(r => setTimeout(r, 1500));
      toast.success('Order placed successfully!');
      navigate('/dashboard/orders');
    } catch {
      toast.error('Failed to process order.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-pure-white min-h-screen">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-brand-teal to-brand-dark pt-12 pb-24 px-6 md:px-12 text-pure-white relative">
        <div className="max-w-7xl mx-auto flex flex-col gap-2">
          <div className="font-open text-[0.875rem] opacity-80 mb-2 hover:opacity-100 transition cursor-pointer" onClick={() => navigate('/products')}>
            ← Back to Products
          </div>
          <h1 className="text-[2.5rem] md:text-[3rem] text-pure-white lead">{product.name}</h1>
        </div>
        {/* SVG Wave */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg className="relative block w-[calc(100%+1.3px)] h-[60px]" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 1200 120">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C57.71,108.6,114.4,117.82,176.31,118.84,228.69,119.7,281.42,108.84,321.39,56.44Z" fill="#FFFFFF"></path>
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 flex flex-col lg:flex-row gap-12">
        {/* Left Column */}
        <div className="lg:w-[60%] flex flex-col gap-8">
          <div 
            ref={imgRef}
            className={`w-full aspect-[4/3] bg-brand-light rounded-2xl border border-grey-light flex items-center justify-center relative overflow-hidden reveal-item ${isImgVis ? 'is-visible' : ''}`}
          >
            <span className="text-[8rem] text-brand-mid animate-pulse">💊</span>
          </div>
          
          <div className="card">
            <h3 className="mb-4">Compliance Information</h3>
            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
              <span className="badge-approved text-[1rem] py-2 px-4 shadow-sm">✓ Cleared for Sale</span>
              <div className="flex flex-col">
                <span className="label-ui text-text-muted">CERTIFICATE EXPIRY</span>
                <span className="font-nunito font-semibold text-text-dark">{new Date(product.complianceDate).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (Sticky) */}
        <div className="lg:w-[40%]">
          <div className="sticky top-[100px] flex flex-col gap-6">
            <div className="flex gap-3">
              <span className="badge-teal">{product.category}</span>
              {product.stock > 0 ? <span className="badge-approved">In Stock</span> : <span className="badge-danger">Out of Stock</span>}
            </div>
            
            <h1 className="text-[2rem] leading-tight">{product.name}</h1>
            <div className="text-[clamp(2rem,4vw,3rem)] font-nunito font-extrabold text-brand-teal">${product.price}</div>
            
            <div className="h-[1px] w-full bg-grey-light"></div>
            
            <p className="body-lg text-text-body">{product.desc}</p>
            
            <div className="bg-off-white p-6 rounded-xl border border-grey-light mt-4">
              <div className="flex justify-between mb-2">
                <span className="font-nunito font-semibold text-text-dark">Stock Available</span>
                <span className="font-nunito font-bold text-brand-teal">{product.stock} Units</span>
              </div>
              <div className="h-3 w-full bg-grey-mid rounded-full overflow-hidden">
                <div 
                  className="h-full bg-brand-teal transition-all duration-[1200ms] ease-out" 
                  style={{ width: `${stockWidth}%` }}
                ></div>
              </div>
              
              <div className="mt-8">
                <label className="block label-ui text-text-dark mb-2">Quantity</label>
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center border-[1.5px] border-grey-light rounded-lg overflow-hidden bg-pure-white w-[140px]">
                    <button 
                      className="w-10 h-10 flex items-center justify-center text-text-muted hover:bg-brand-light hover:text-brand-dark transition-colors font-nunito text-lg"
                      onClick={() => setQty(Math.max(1, qty - 1))}
                    >−</button>
                    <input 
                      type="number" 
                      className="w-full h-10 text-center font-nunito font-bold text-text-dark focus:outline-none appearance-none" 
                      value={qty} 
                      onChange={(e) => setQty(Math.max(1, Math.min(product.stock, Number(e.target.value))))}
                      max={product.stock}
                      min={1}
                    />
                    <button 
                      className="w-10 h-10 flex items-center justify-center text-text-muted hover:bg-brand-light hover:text-brand-dark transition-colors font-nunito text-lg"
                      onClick={() => setQty(Math.min(product.stock, qty + 1))}
                    >+</button>
                  </div>
                  <span className="text-text-muted text-sm font-open">= ${(product.price * qty).toFixed(2)}</span>
                </div>
                
                <button 
                  onClick={handleOrder}
                  disabled={loading || product.stock === 0}
                  className="btn-orange w-full h-[50px] shadow-deep text-lg"
                >
                  {loading ? <span className="w-5 h-5 border-2 border-pure-white border-t-transparent flex mx-auto rounded-full animate-spin"></span> : 'Order Now'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
