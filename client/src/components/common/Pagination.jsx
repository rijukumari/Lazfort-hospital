import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  totalItems,
  className = ''
}) {
  const handlePrev = () => {
    if (currentPage > 1 && onPageChange) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages && onPageChange) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className={`flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600 px-1 py-1 ${className}`}>
      {totalItems !== undefined && (
        <span className="text-[11px] text-slate-500 font-medium">
          Showing page <strong className="text-slate-800">{currentPage}</strong> of <strong className="text-slate-800">{totalPages}</strong> ({totalItems} total)
        </span>
      )}

      <div className="flex items-center gap-1.5 self-center sm:self-auto ml-auto">
        <button
          type="button"
          onClick={handlePrev}
          disabled={currentPage <= 1}
          className="p-2 bg-white hover:bg-slate-50 border border-slate-200/90 rounded-xl text-slate-700 disabled:opacity-40 disabled:pointer-events-none transition shadow-xs flex items-center gap-1 font-semibold"
          title="Previous Page"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Previous</span>
        </button>

        <span className="px-3 py-1.5 font-bold text-slate-800 bg-slate-100 rounded-xl">
          {currentPage} / {totalPages}
        </span>

        <button
          type="button"
          onClick={handleNext}
          disabled={currentPage >= totalPages}
          className="p-2 bg-white hover:bg-slate-50 border border-slate-200/90 rounded-xl text-slate-700 disabled:opacity-40 disabled:pointer-events-none transition shadow-xs flex items-center gap-1 font-semibold"
          title="Next Page"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
