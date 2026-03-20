import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { useDebounce } from '../hooks/useDebounce';
import Pagination from '../components/Pagination';

export default function ProductList() {
  const isDesktop = useMediaQuery('(min-width: 1280px)');
  const [filterOpen, setFilterOpen] = useState(false);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  
  // Fake data for UI preview
  const products = Array.from({length: 9}).map((_, i) => ({
    id: i,
    name: 'IsoTears Premium Extra ' + i,
    category: 'Ophthalmic',
    price: 24.99 + i,
    stock: i === 2 ? 5 : (i === 5 ? 0 : 75)
  }));

  useEffect(() => {
    // Fake API call
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, [debouncedSearch, page]);

  return (
    <div className="bg-off-white min-h-screen">
      {/* Navbar duplicate for public layout */}
      <nav className="h-16 flex items-center justify-between px-6 bg-pure-white border-b border-grey-light sticky top-0 z-40">
        <Link to="/" className="font-nunito font-extrabold text-[1.25rem] text-text-dark flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-brand-light flex items-center justify-center text-brand-dark">I</div>
          I-Solution
        </Link>
        <div className="flex gap-4">
          <Link to="/login" className="btn-ghost py-2">Login</Link>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto flex">
        {/* Filter Sidebar (Desktop) / Bottom Sheet (Mobile) */}
        <div className={`
          ${isDesktop ? 'w-[260px] border-r border-grey-light min-h-[calc(100vh-64px)]' : 
            `fixed inset-x-0 bottom-0 z-50 bg-pure-white rounded-t-2xl shadow-[0_-8px_30px_rgba(0,0,0,0.12)] transition-transform duration-300 ${filterOpen ? 'translate-y-0' : 'translate-y-full'}`
          }
          bg-off-white flex flex-col p-6
        `}>
          {!isDesktop && (
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl">Filters</h3>
              <button onClick={() => setFilterOpen(false)} className="text-2xl text-text-muted">×</button>
            </div>
          )}
          
          <div className="flex justify-between items-baseline mb-6">
            <h3 className="hidden xl:block">Filters</h3>
            <button className="text-danger-red text-sm font-semibold hover:underline">Clear All</button>
          </div>
          
          <div className="mb-8">
            <h4 className="text-text-muted text-sm uppercase tracking-wider mb-4">Category</h4>
            <div className="space-y-3">
              {['All', 'Ophthalmic', 'Cardiology', 'Neurology'].map(cat => (
                <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                  <input type="radio" name="cat" className="w-4 h-4 text-brand-teal focus:ring-brand-teal accent-brand-teal" defaultChecked={cat==='All'} />
                  <span className="font-nunito font-semibold text-text-body group-hover:text-brand-teal transition-colors">{cat}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-text-muted text-sm uppercase tracking-wider mb-4">Price Range</h4>
            <input type="range" className="w-full accent-brand-teal" />
            <div className="flex justify-between text-sm text-text-muted mt-2">
              <span>$0</span>
              <span>$500+</span>
            </div>
          </div>

          {!isDesktop && (
            <button className="btn-primary w-full mt-8 py-3" onClick={() => setFilterOpen(false)}>Apply Filters</button>
          )}
        </div>

        {/* Overlay for mobile filter */}
        {!isDesktop && filterOpen && (
          <div className="fixed inset-0 bg-text-dark/40 z-40" onClick={() => setFilterOpen(false)} />
        )}

        {/* Main Area */}
        <div className="flex-1 p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <h1 className="text-[1.75rem] md:text-[2rem]">All Products</h1>
              <span className="badge-teal">42 Results</span>
            </div>
            
            <div className="flex gap-3">
              {!isDesktop && (
                <button onClick={() => setFilterOpen(true)} className="btn-ghost flex-1">Filters</button>
              )}
              <input 
                type="text" 
                placeholder="Search catalog..." 
                className="input md:w-[280px]"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {loading ? (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({length: 6}).map((_,i) => (
                  <div key={i} className="card h-[380px] p-0 flex flex-col justify-end">
                    <div className="h-1/2 bg-grey-light animate-pulse w-full"></div>
                    <div className="p-6 flex-1 flex flex-col gap-3">
                      <div className="h-6 w-1/3 bg-grey-light animate-pulse rounded"></div>
                      <div className="h-8 w-3/4 bg-grey-light animate-pulse rounded"></div>
                    </div>
                  </div>
                ))}
             </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20 bg-pure-white rounded-xl border border-grey-light">
               <div className="text-6xl text-brand-mid mb-4">💊</div>
               <h3 className="mb-2">No products found</h3>
               <button className="btn-ghost mt-4">Clear filters</button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((p) => (
                  <Link to={`/products/${p.id}`} key={p.id} className="product-card group block">
                    <div className="w-full aspect-[4/3] bg-brand-light flex items-center justify-center overflow-hidden">
                      <span className="text-6xl text-brand-mid group-hover:scale-110 transition-transform">💊</span>
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                         <span className="badge-teal text-[10px]">{p.category}</span>
                         {p.stock > 10 ? <span className="badge-approved text-[10px]">In Stock</span>
                          : p.stock > 0 ? <span className="badge-pending text-[10px]">Low Src</span>
                          : <span className="badge-danger text-[10px]">Out</span>}
                      </div>
                      <h3 className="mb-2 line-clamp-1 group-hover:text-brand-teal transition-colors">{p.name}</h3>
                      <div className="flex justify-between items-center mt-4 pt-4 border-t border-grey-light">
                        <span className="font-nunito font-extrabold text-[1.25rem] text-text-dark">${p.price}</span>
                        <span className="font-nunito font-bold text-accent-orange text-[0.875rem]">View Details →</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <Pagination currentPage={page} totalPages={5} onPageChange={setPage} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
