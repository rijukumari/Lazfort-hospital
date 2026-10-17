import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import Modal from '../components/Modal';
import {
  FileSpreadsheet,
  PlusCircle,
  Search,
  Filter,
  CheckCircle,
  Tag
} from 'lucide-react';

export default function ServiceTariffs() {
  const [services, setServices] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [isAddOpen, setIsAddOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    serviceCode: '',
    name: '',
    category: 'consultation',
    department: 'General Medicine',
    standardPrice: '',
    taxPercent: 0,
    description: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const fetchTariffs = async () => {
    try {
      setLoading(true);
      const url = `/catalog/services?${categoryFilter ? `category=${categoryFilter}&` : ''}${search ? `search=${encodeURIComponent(search)}` : ''}`;
      const [srvRes, depRes] = await Promise.all([
        api.get(url),
        api.get('/catalog/departments')
      ]);
      if (srvRes.success) setServices(srvRes.services);
      if (depRes.success) setDepartments(depRes.departments);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTariffs();
  }, [categoryFilter, search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const res = await api.post('/catalog/services', formData);
      if (res.success) {
        setIsAddOpen(false);
        fetchTariffs();
        setFormData({
          serviceCode: '',
          name: '',
          category: 'consultation',
          department: 'General Medicine',
          standardPrice: '',
          taxPercent: 0,
          description: ''
        });
      } else {
        setError(res.message);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-brand-600" />
            <span>Hospital Tariffs & Billable Service Catalogue (FR-009)</span>
          </h2>
          <p className="text-xs text-slate-500">
            Define consultation fees, laboratory investigations, radiology and nursing procedure rates
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 font-medium text-slate-700"
          >
            <option value="">All Categories</option>
            <option value="consultation">Consultation</option>
            <option value="laboratory">Laboratory</option>
            <option value="radiology">Radiology & Imaging</option>
            <option value="procedure">Clinical Procedures</option>
            <option value="nursing">Nursing Care</option>
          </select>

          <button
            onClick={() => setIsAddOpen(true)}
            className="bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-md shadow-brand-500/20 transition flex items-center space-x-1.5 shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add Billable Tariff</span>
          </button>
        </div>
      </div>

      {/* Services Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Service Code</th>
                <th className="py-3 px-4">Service Description</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4 text-right">Standard Price (₹)</th>
                <th className="py-3 px-4 text-right">GST Rate</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan="7" className="py-8 text-center text-slate-400">Loading hospital tariffs...</td>
                </tr>
              ) : services.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-8 text-center text-slate-400">No tariff entries found.</td>
                </tr>
              ) : (
                services.map((s) => (
                  <tr key={s.serviceCode} className="hover:bg-slate-50/70 transition">
                    <td className="py-3.5 px-4 font-mono font-bold text-brand-700">
                      {s.serviceCode}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-900">
                      {s.name}
                      {s.description && (
                        <span className="block text-[11px] text-slate-400 font-normal mt-0.5">{s.description}</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 capitalize">
                      <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-700 border border-slate-200">
                        {s.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      {s.department}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-900">
                      ₹{s.standardPrice.toFixed(2)}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono text-slate-600">
                      {s.taxPercent}%
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800">
                        Active
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Tariff Modal */}
      <Modal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        title="Configure New Hospital Service Tariff"
        maxWidth="max-w-xl"
      >
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700">
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Service Code *</label>
              <input
                type="text"
                required
                placeholder="e.g. SRV-LAB-05"
                value={formData.serviceCode}
                onChange={e => setFormData({ ...formData, serviceCode: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl uppercase font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Category *</label>
              <select
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
              >
                <option value="consultation">Consultation</option>
                <option value="laboratory">Laboratory</option>
                <option value="radiology">Radiology</option>
                <option value="procedure">Procedure</option>
                <option value="nursing">Nursing</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Service Name / Description *</label>
            <input
              type="text"
              required
              placeholder="e.g. Serum Creatinine & Electrolytes Panel"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Department</label>
              <select
                value={formData.department}
                onChange={e => setFormData({ ...formData, department: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
              >
                {departments.map(d => (
                  <option key={d.deptId} value={d.name}>{d.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Standard Price (₹) *</label>
              <input
                type="number"
                required
                min="0"
                placeholder="e.g. 500"
                value={formData.standardPrice}
                onChange={e => setFormData({ ...formData, standardPrice: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono font-bold"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">GST Tax Rate (%)</label>
            <input
              type="number"
              min="0"
              max="28"
              value={formData.taxPercent}
              onChange={e => setFormData({ ...formData, taxPercent: Number(e.target.value) })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsAddOpen(false)}
              className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="bg-brand-600 hover:bg-brand-700 text-white font-semibold px-5 py-2 rounded-xl shadow-md shadow-brand-500/20 disabled:opacity-50"
            >
              {submitting ? 'Saving...' : 'Save Tariff'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
