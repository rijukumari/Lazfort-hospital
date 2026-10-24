import React from 'react';
import Spinner from './Spinner';
import EmptyState from './EmptyState';
import Pagination from './Pagination';

export default function DataTable({
  columns = [],
  data = [],
  loading = false,
  emptyMessage = 'No records found',
  emptyDescription = 'There are no items matching this criteria.',
  emptyAction,
  pagination, // { currentPage, totalPages, onPageChange, totalItems }
  className = '',
  keyExtractor = (item, idx) => item.id || idx,
  onRowClick
}) {
  return (
    <div className={`space-y-3 ${className}`}>
      <div className="overflow-x-auto border border-slate-200/90 rounded-2xl sm:rounded-3xl bg-white shadow-xs">
        <table className="w-full text-left text-xs sm:text-sm border-collapse">
          <thead className="bg-slate-50/80 text-slate-700 font-extrabold uppercase tracking-wider text-[11px] border-b border-slate-200/80">
            <tr>
              {columns.map((col, idx) => (
                <th
                  key={col.key || idx}
                  className={`py-3.5 px-4 ${col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : 'text-left'} ${col.className || ''}`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr>
                <td colSpan={columns.length} className="py-12 text-center text-slate-500">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Spinner size="md" />
                    <span className="text-xs font-semibold">Loading data...</span>
                  </div>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="py-8">
                  <EmptyState title={emptyMessage} description={emptyDescription} action={emptyAction} compact />
                </td>
              </tr>
            ) : (
              data.map((row, rowIdx) => (
                <tr
                  key={keyExtractor(row, rowIdx)}
                  onClick={() => onRowClick && onRowClick(row)}
                  className={`hover:bg-slate-50/70 transition ${onRowClick ? 'cursor-pointer' : ''}`}
                >
                  {columns.map((col, colIdx) => (
                    <td
                      key={col.key || colIdx}
                      className={`py-3.5 px-4 font-medium text-slate-800 ${col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : 'text-left'} ${col.cellClassName || ''}`}
                    >
                      {col.render ? col.render(row, rowIdx) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {pagination && pagination.totalPages > 1 && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={pagination.onPageChange}
          totalItems={pagination.totalItems}
        />
      )}
    </div>
  );
}
