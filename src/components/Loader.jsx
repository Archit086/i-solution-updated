export default function Loader({ type = 'spinner', fullscreen = false, rows = 3 }) {
  const content = type === 'spinner' ? (
    <div className="w-10 h-10 border-4 border-grey-light border-t-brand-teal rounded-full animate-spin"></div>
  ) : (
    <div className="w-full flex-1 flex flex-col gap-4">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-12 bg-grey-light animate-pulse rounded overflow-hidden relative">
          <div className="absolute top-0 right-0 bottom-0 left-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-pure-white/40 to-transparent"></div>
        </div>
      ))}
    </div>
  );

  if (fullscreen) {
    return (
      <div className="fixed inset-0 bg-pure-white/80 backdrop-blur-sm flex items-center justify-center z-50">
        {content}
      </div>
    );
  }

  return content;
}
