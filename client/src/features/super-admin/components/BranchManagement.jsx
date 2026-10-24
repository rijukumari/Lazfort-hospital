import React, { useState } from 'react';
import {
  GitFork,
  Building2,
  Plus,
  Search,
  Filter,
  Download,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  Eye,
  SlidersHorizontal,
  MapPin,
  LayoutGrid,
  List,
  Save,
  X
} from 'lucide-react';
import { useSaaS } from '../../../context/SaaSContext';

export default function BranchManagement() {
  const { branches, setBranches, tenants, showToast } = useSaaS();

  const [branchSubPage, setBranchSubPage] = useState('list'); // 'list' | 'provision' | 'detail' | 'topology'
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [branchViewMode, setBranchViewMode] = useState('table'); // 'table' | 'cards'
  const [branchSearch, setBranchSearch] = useState('');
  const [branchFilterHospital, setBranchFilterHospital] = useState('ALL');
  const [branchFilterCity, setBranchFilterCity] = useState('ALL');
  const [branchFilterType, setBranchFilterType] = useState('ALL');

  const [newBranchForm, setNewBranchForm] = useState({
    hospital: 'Lazfort Memorial Hospital',
    name: '',
    city: 'Bengaluru',
    beds: 50,
    isMain: false,
    address: '',
    status: 'Active'
  });

  const filteredBranches = branches.filter(b => {
    const matchesSearch = !branchSearch ||
      b.name.toLowerCase().includes(branchSearch.toLowerCase()) ||
      b.hospital.toLowerCase().includes(branchSearch.toLowerCase()) ||
      b.city.toLowerCase().includes(branchSearch.toLowerCase()) ||
      b.id.toLowerCase().includes(branchSearch.toLowerCase());
    const matchesHospital = branchFilterHospital === 'ALL' || b.hospital === branchFilterHospital;
    const matchesCity = branchFilterCity === 'ALL' || b.city === branchFilterCity;
    const matchesType = branchFilterType === 'ALL' || (branchFilterType === 'MAIN' ? b.isMain : !b.isMain);
    return matchesSearch && matchesHospital && matchesCity && matchesType;
  });

  const totalNetworkBeds = branches.reduce((acc, b) => acc + (Number(b.beds) || 0), 0);
  const mainCount = branches.filter(b => b.isMain).length;
  const satelliteCount = branches.filter(b => !b.isMain).length;
  const uniqueCities = Array.from(new Set(branches.map(b => b.city)));
  const uniqueHospitals = Array.from(new Set(branches.map(b => b.hospital)));

  const handleExportCSV = () => {
    const headers = ['Branch ID', 'Hospital Group', 'Campus Name', 'City', 'Bed Capacity', 'Campus Type', 'Status'];
    const rows = filteredBranches.map(b => [
      b.id,
      `"${b.hospital}"`,
      `"${b.name}"`,
      `"${b.city}"`,
      b.beds,
      b.isMain ? 'Main Campus' : 'Satellite OPD',
      b.status
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `lazfort_campus_topology_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Campus topology CSV exported successfully.', 'success');
  };

  const handleCreateBranch = (e) => {
    e.preventDefault();
    if (!newBranchForm.name.trim()) {
      showToast('Please enter a campus name.', 'error');
      return;
    }
    const matchingTenant = tenants.find(t => t.name.toLowerCase().includes(newBranchForm.hospital.toLowerCase())) || tenants[0];
    const newBranch = {
      id: `BR-0${branches.length + 1}`,
      tenantId: matchingTenant?.id || 'TEN-LZF-001',
      hospital: newBranchForm.hospital,
      name: newBranchForm.name,
      city: newBranchForm.city,
      beds: Number(newBranchForm.beds) || 25,
      isMain: Boolean(newBranchForm.isMain),
      status: newBranchForm.status,
      address: newBranchForm.address || `${newBranchForm.name}, ${newBranchForm.city}`
    };

    setBranches(prev => [newBranch, ...prev]);
    setBranchSubPage('list');
    setNewBranchForm({
      hospital: 'Lazfort Memorial Hospital',
      name: '',
      city: 'Bengaluru',
      beds: 50,
      isMain: false,
      address: '',
      status: 'Active'
    });
    showToast(`Campus "${newBranch.name}" created successfully!`, 'success');
  };

  const handleToggleBranchStatus = (branchId) => {
    setBranches(prev => prev.map(b => {
      if (b.id === branchId) {
        const nextStatus = b.status === 'Active' ? 'Maintenance' : 'Active';
        showToast(`Campus ${b.id} status set to ${nextStatus}.`);
        return { ...b, status: nextStatus };
      }
      return b;
    }));
  };

  // Subpage 1: Provision Campus
  if (branchSubPage === 'provision') {
    return (
      <div className="space-y-6 animate-in fade-in duration-150">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm">
          <button
            type="button"
            onClick={() => setBranchSubPage('list')}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition shadow-sm active:scale-95"
          >
            <ArrowLeft className="w-4 h-4 text-slate-600" />
            <span>Back to Campus Directory</span>
          </button>
          <span className="text-xs font-bold text-sky-700 bg-sky-50 border border-sky-200 px-3 py-1 rounded-full">
            Provisioning Engine &bull; Active
          </span>
        </div>

        <form onSubmit={handleCreateBranch} className="bg-white rounded-3xl p-5 sm:p-8 border border-slate-200/80 shadow-sm space-y-6 text-xs max-w-3xl mx-auto">
          <h2 className="text-xl font-black text-slate-900 border-b pb-3">Provision New Hospital Campus Node</h2>
          <div className="space-y-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Parent Tenant Organization *</label>
              <select
                value={newBranchForm.hospital}
                onChange={(e) => setNewBranchForm({ ...newBranchForm, hospital: e.target.value })}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:bg-white text-xs sm:text-sm"
              >
                {tenants.map(t => (
                  <option key={t.id} value={t.name}>{t.name} ({t.id})</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Campus / Branch Name *</label>
                <input
                  type="text"
                  required
                  value={newBranchForm.name}
                  onChange={(e) => setNewBranchForm({ ...newBranchForm, name: e.target.value })}
                  placeholder="e.g. Whitefield Specialty OPD Centre"
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white text-xs sm:text-sm"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">City *</label>
                <input
                  type="text"
                  required
                  value={newBranchForm.city}
                  onChange={(e) => setNewBranchForm({ ...newBranchForm, city: e.target.value })}
                  placeholder="e.g. Bengaluru"
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white text-xs sm:text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Bed Capacity *</label>
                <input
                  type="number"
                  min="0"
                  value={newBranchForm.beds}
                  onChange={(e) => setNewBranchForm({ ...newBranchForm, beds: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-mono focus:bg-white text-xs sm:text-sm"
                />
              </div>
              <div className="flex items-center pt-6">
                <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-800">
                  <input
                    type="checkbox"
                    checked={newBranchForm.isMain}
                    onChange={(e) => setNewBranchForm({ ...newBranchForm, isMain: e.target.checked })}
                    className="w-4 h-4 rounded text-sky-600"
                  />
                  <span>Designate as Main Flagship Campus</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Physical Street Address</label>
              <input
                type="text"
                value={newBranchForm.address}
                onChange={(e) => setNewBranchForm({ ...newBranchForm, address: e.target.value })}
                placeholder="Plot 42, Outer Ring Road, Tech Corridor"
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white text-xs sm:text-sm"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={() => setBranchSubPage('list')}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl transition shadow-md shadow-sky-600/30 text-xs"
            >
              Create Campus Node
            </button>
          </div>
        </form>
      </div>
    );
  }

  // Subpage 2: Detail
  if (branchSubPage === 'detail' && selectedBranch) {
    return (
      <div className="space-y-6 animate-in fade-in duration-150">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm">
          <button
            type="button"
            onClick={() => setBranchSubPage('list')}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition shadow-sm active:scale-95"
          >
            <ArrowLeft className="w-4 h-4 text-slate-600" />
            <span>Back to Campus Directory</span>
          </button>
          <span className="font-mono text-xs font-bold text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
            Node: {selectedBranch.id}
          </span>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
            <div>
              <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded uppercase">
                {selectedBranch.isMain ? 'Main Flagship Campus' : 'Satellite OPD Hub'}
              </span>
              <h2 className="text-2xl font-black text-slate-900 mt-1">{selectedBranch.name}</h2>
              <p className="text-xs text-slate-500">{selectedBranch.hospital} &bull; {selectedBranch.city}</p>
            </div>
            <button
              type="button"
              onClick={() => handleToggleBranchStatus(selectedBranch.id)}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition"
            >
              Toggle Maintenance Status
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
            <div className="p-4 bg-slate-50 rounded-2xl border">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Bed Capacity</span>
              <span className="text-xl font-black text-slate-900 font-mono mt-1 block">{selectedBranch.beds} Beds</span>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Operating Status</span>
              <span className="text-xl font-black text-emerald-600 mt-1 block">{selectedBranch.status}</span>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Location</span>
              <span className="text-xs font-bold text-slate-800 mt-1 block">{selectedBranch.address || `${selectedBranch.name}, ${selectedBranch.city}`}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default Subpage: Main Campus Directory
  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Hero Header */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-sky-600 font-bold uppercase tracking-wider mb-1">
            <GitFork className="w-4 h-4" />
            <span>Multi-Campus Topology Mesh</span>
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">Hospital Branch Management</h1>
          <p className="text-xs text-slate-500 mt-1">Configure multi-campus facilities, bed capacities, and departmental allocations.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleExportCSV}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
          <button
            type="button"
            onClick={() => setBranchSubPage('provision')}
            className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs flex items-center gap-1.5 transition shadow-sm active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Provision New Campus</span>
          </button>
        </div>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Total Campuses</span>
          <div className="text-2xl sm:text-3xl font-black font-mono text-slate-900">{branches.length}</div>
          <span className="text-[10px] text-sky-600 font-bold block">{uniqueHospitals.length} Hospital Groups</span>
        </div>
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Total Beds</span>
          <div className="text-2xl sm:text-3xl font-black font-mono text-slate-900">{totalNetworkBeds}</div>
          <span className="text-[10px] text-emerald-600 font-bold block">100% Monitored</span>
        </div>
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Flagship Campuses</span>
          <div className="text-2xl sm:text-3xl font-black font-mono text-purple-700">{mainCount}</div>
          <span className="text-[10px] text-slate-500 font-medium block">Main Tier Nodes</span>
        </div>
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Satellite OPDs</span>
          <div className="text-2xl sm:text-3xl font-black font-mono text-indigo-700">{satelliteCount}</div>
          <span className="text-[10px] text-indigo-600 font-bold block">Daycare / Clinics</span>
        </div>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="bg-white rounded-2xl p-3.5 sm:p-4 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="relative w-full md:flex-1 md:min-w-[200px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={branchSearch}
            onChange={(e) => setBranchSearch(e.target.value)}
            placeholder="Search campuses by name, city, hospital or ID..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full md:w-auto text-xs">
          <div className="grid grid-cols-2 gap-2 flex-1 sm:flex-none">
            <select
              value={branchFilterHospital}
              onChange={(e) => setBranchFilterHospital(e.target.value)}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <option value="ALL">All Hospital Groups</option>
              {uniqueHospitals.map(h => (
                <option key={h} value={h}>{h}</option>
              ))}
            </select>

            <select
              value={branchFilterCity}
              onChange={(e) => setBranchFilterCity(e.target.value)}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <option value="ALL">All Cities</option>
              {uniqueCities.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-end border border-slate-200 rounded-xl p-0.5 bg-slate-50 shrink-0 self-end sm:self-auto">
            <button
              type="button"
              onClick={() => setBranchViewMode('table')}
              className={`p-1.5 sm:p-2 rounded-lg flex items-center gap-1.5 ${
                branchViewMode === 'table' ? 'bg-white shadow-xs text-sky-600 font-bold' : 'text-slate-400'
              }`}
              title="Table View"
            >
              <List className="w-4 h-4" />
              <span className="hidden sm:inline text-xs">Table</span>
            </button>
            <button
              type="button"
              onClick={() => setBranchViewMode('cards')}
              className={`p-1.5 sm:p-2 rounded-lg flex items-center gap-1.5 ${
                branchViewMode === 'cards' ? 'bg-white shadow-xs text-sky-600 font-bold' : 'text-slate-400'
              }`}
              title="Card View"
            >
              <LayoutGrid className="w-4 h-4" />
              <span className="hidden sm:inline text-xs">Cards</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content Render: Table or Card Grid */}
      {branchViewMode === 'table' ? (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          {/* MOBILE CARDS VIEW (Visible strictly on mobile screens < 768px for perfect touch UX) */}
          <div className="md:hidden divide-y divide-slate-100">
            {filteredBranches.length === 0 ? (
              <div className="p-8 text-center text-slate-400">
                <Building2 className="w-10 h-10 mx-auto text-slate-300 mb-2" />
                <p className="font-bold text-slate-700 text-sm">No campuses match your filters</p>
                <p className="text-xs text-slate-400 mt-1">Try resetting your search query or filters above.</p>
              </div>
            ) : (
              filteredBranches.map(b => (
                <div key={b.id} className="p-4 space-y-3 bg-white hover:bg-slate-50/50 transition">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2.5 min-w-0">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                        b.isMain ? 'bg-purple-100 text-purple-700' : 'bg-sky-100 text-sky-700'
                      }`}>
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-bold text-slate-900 text-sm leading-snug truncate">{b.name}</h3>
                        <p className="text-[11px] text-slate-500 truncate mt-0.5">{b.hospital}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${
                      b.isMain ? 'bg-purple-50 text-purple-700 border border-purple-200' : 'bg-sky-50 text-sky-700 border border-sky-200'
                    }`}>
                      {b.isMain ? 'Flagship' : 'Satellite'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1 text-slate-600">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="font-mono font-bold text-sky-700 text-[10px] bg-sky-50 px-1.5 py-0.5 rounded border border-sky-100">
                        {b.id}
                      </span>
                      <span className="flex items-center gap-1 text-slate-500 truncate">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        {b.city}
                      </span>
                    </div>
                    <span className="font-mono font-bold text-slate-900 shrink-0">{b.beds} Beds</span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      b.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      {b.status}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedBranch(b);
                        setBranchSubPage('detail');
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-50 text-sky-700 hover:bg-sky-100 font-bold text-xs transition"
                    >
                      <span>View Details</span>
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* DESKTOP & TABLET TABLE VIEW (Visible on md+ screens >= 768px with full columns) */}
          <div className="hidden md:block overflow-x-auto w-full custom-scrollbar">
            <table className="w-full text-left text-xs min-w-[760px]">
              <thead className="bg-slate-50/90 text-slate-600 uppercase font-bold border-b border-slate-200 tracking-wider">
                <tr>
                  <th className="p-4">Campus Node</th>
                  <th className="p-4">Parent Tenant</th>
                  <th className="p-4">Metro City</th>
                  <th className="p-4">Bed Capacity</th>
                  <th className="p-4">Campus Type</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredBranches.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="p-10 text-center text-slate-400">
                      <Building2 className="w-10 h-10 mx-auto text-slate-300 mb-2" />
                      <p className="font-bold text-slate-700 text-sm">No campuses match your filters</p>
                      <p className="text-xs text-slate-400 mt-1">Try resetting your search query or filters above.</p>
                    </td>
                  </tr>
                ) : (
                  filteredBranches.map(b => (
                    <tr key={b.id} className="hover:bg-slate-50/70 transition">
                      <td className="p-4">
                        <div className="flex items-start gap-3">
                          <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                            b.isMain ? 'bg-purple-100 text-purple-700' : 'bg-sky-100 text-sky-700'
                          }`}>
                            <Building2 className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 text-sm">{b.name}</div>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="font-mono font-bold text-sky-700 text-[11px] bg-sky-50 px-1.5 py-0.5 rounded border border-sky-100">
                                {b.id}
                              </span>
                              <span className="text-[11px] text-slate-400 truncate max-w-[200px]">
                                {b.address || `${b.name}, ${b.city}`}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 font-semibold text-slate-800">{b.hospital}</td>
                      <td className="p-4 text-slate-600 font-medium">{b.city}</td>
                      <td className="p-4 font-mono font-bold text-slate-900">{b.beds} Beds</td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          b.isMain ? 'bg-purple-50 text-purple-700 border border-purple-200' : 'bg-sky-50 text-sky-700 border border-sky-200'
                        }`}>
                          {b.isMain ? 'Flagship Main' : 'Satellite OPD'}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          b.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}>
                          {b.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedBranch(b);
                              setBranchSubPage('detail');
                            }}
                            className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-900 transition"
                            title="Inspect campus"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {filteredBranches.map(b => (
            <div key={b.id} className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <span className="font-mono text-[10px] font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-100">
                    {b.id}
                  </span>
                  <h3 className="font-bold text-slate-900 text-sm mt-1 truncate">{b.name}</h3>
                  <p className="text-[11px] text-slate-500 truncate">{b.hospital}</p>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${
                  b.isMain ? 'bg-purple-50 text-purple-700 border border-purple-200' : 'bg-sky-50 text-sky-700 border border-sky-200'
                }`}>
                  {b.isMain ? 'Main' : 'Satellite'}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs pt-2 border-t text-slate-600">
                <span className="truncate">{b.city} &bull; {b.beds} Beds</span>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedBranch(b);
                    setBranchSubPage('detail');
                  }}
                  className="text-sky-600 font-bold hover:underline shrink-0"
                >
                  View Details &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
