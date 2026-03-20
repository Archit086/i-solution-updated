export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      <button 
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 bg-pure-white border border-grey-light rounded disabled:opacity-50"
      >
        ← Prev
      </button>
      
      {pages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded border transition-colors ${
            currentPage === page 
              ? 'bg-brand-teal text-pure-white border-brand-teal' 
              : 'bg-pure-white border-grey-light text-text-body hover:bg-grey-light'
          }`}
        >
          {page}
        </button>
      ))}

      <button 
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 bg-pure-white border border-grey-light rounded disabled:opacity-50"
      >
        Next →
      </button>
    </div>
  );
}
