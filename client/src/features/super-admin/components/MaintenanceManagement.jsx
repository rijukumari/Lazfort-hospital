import React, { useState } from 'react';
import {
  Wrench,
  Search,
  Filter,
  Plus,
  ArrowLeft,
  Calendar,
  Clock,
  Radio,
  CheckCircle2,
  AlertTriangle,
  Eye,
  CheckCheck
} from 'lucide-react';
import { useSaaS } from '../../../context/SaaSContext';

const initialMaintenanceWindows = [
  {
    id: 'MW-2026-10-26',
    title: 'MongoDB Atlas Multi-Region Replica Failover Drill & OS Patching',
    category: 'Database Cluster & Failover Drill',
    status: 'Planned',
    scheduledDate: '26-Oct-2026',
    windowTime: '02:00 AM - 02:30 AM IST',
    durationMinutes: 30,
    targetCluster: 'Atlas Primary Cluster Mumbai (ap-south-1)',
    targetNodes: 'shard-00-01, shard-00-02, shard-00-03',
    impactLevel: 'Zero Clinical Loss',
    impactDesc: 'Sub-second traffic cutover to warm secondary replica in Hyderabad. Zero write drop guaranteed.',
    broadcastActive: true,
    noticeMessage: 'MongoDB Atlas Multi-Region Replica Failover Drill & Operating System Patching. Automated tenant notification banner is active on all hospital portals.',
    leadEngineer: 'DevOps Lead (Vikramaditya Singhania)',
    preflightPassed: true,
    snapshotArmed: true,
    snapshotId: 'SNP-PREFLIGHT-9912',
    changeTicket: 'CHG-98421'
  },
  {
    id: 'MW-2026-11-04',
    title: 'HL7/FHIR Telemetry Ingress Gateway Microservice Rolling Update',
    category: 'Ingress Mesh & Microservices',
    status: 'Planned',
    scheduledDate: '04-Nov-2026',
    windowTime: '01:00 AM - 01:45 AM IST',
    durationMinutes: 45,
    targetCluster: 'Kubernetes EKS Health Ingress (Mumbai Zone-A)',
    targetNodes: 'k8s-pod-gateway-01 through 08',
    impactLevel: 'Zero Downtime',
    impactDesc: 'Rolling canary pod deployment with Envoy service mesh mutual TLS certificate renewal.',
    broadcastActive: false,
    noticeMessage: 'HL7/FHIR Gateway performance tuning scheduled. Consultations unaffected.',
    leadEngineer: 'Platform Architect',
    preflightPassed: true,
    snapshotArmed: false,
    snapshotId: 'N/A (Stateless Gateway)',
    changeTicket: 'CHG-98435'
  }
];

export default function MaintenanceManagement() {
  const { showToast } = useSaaS();
  const [maintenanceWindows, setMaintenanceWindows] = useState(initialMaintenanceWindows);
  const [maintSubPage, setMaintSubPage] = useState('list'); // 'list' | 'schedule' | 'detail'
  const [selectedMaint, setSelectedMaint] = useState(null);
  const [maintSearch, setMaintSearch] = useState('');
  const [maintStatusFilter, setMaintStatusFilter] = useState('ALL');

  const [newMaintForm, setNewMaintForm] = useState({
    title: '',
    category: 'Database Cluster & Failover Drill',
    startTime: '2026-10-30T02:00',
    endTime: '2026-10-30T02:45',
    targetCluster: 'PostgreSQL Multi-AZ Primary (AWS Mumbai)',
    impactLevel: 'Zero Downtime',
    broadcastNotice: true,
    noticeMessage: 'Scheduled cloud maintenance: Zero-downtime database optimization in progress.',
    autoSnapshot: true,
    leadEngineer: 'Vikramaditya Singhania (Root)'
  });

  const filteredWindows = maintenanceWindows.filter(w => {
    const matchesSearch = !maintSearch ||
      w.id.toLowerCase().includes(maintSearch.toLowerCase()) ||
      w.title.toLowerCase().includes(maintSearch.toLowerCase()) ||
      w.targetCluster.toLowerCase().includes(maintSearch.toLowerCase()) ||
      w.category.toLowerCase().includes(maintSearch.toLowerCase());
    const matchesStatus = maintStatusFilter === 'ALL' || w.status === maintStatusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreateMaintenanceWindow = (e) => {
    e.preventDefault();
    if (!newMaintForm.title.trim()) {
      showToast('Please enter an operation title.', 'error');
      return;
    }

    const newWindow = {
      id: `MW-${Date.now().toString().slice(-6)}`,
      title: newMaintForm.title,
      category: newMaintForm.category,
      status: 'Planned',
      scheduledDate: newMaintForm.startTime.split('T')[0],
      windowTime: `${newMaintForm.startTime.split('T')[1]} - ${newMaintForm.endTime.split('T')[1]} IST`,
      durationMinutes: 45,
      targetCluster: newMaintForm.targetCluster,
      targetNodes: 'Multi-AZ Verified Cluster Pods',
      impactLevel: newMaintForm.impactLevel,
      impactDesc: 'Automated container draining and pre-flight health assurance enabled.',
      broadcastActive: newMaintForm.broadcastNotice,
      noticeMessage: newMaintForm.noticeMessage,
      leadEngineer: newMaintForm.leadEngineer,
      preflightPassed: true,
      snapshotArmed: newMaintForm.autoSnapshot,
      snapshotId: `SNP-AUTO-${Date.now().toString().slice(-4)}`,
      changeTicket: `CHG-${Math.floor(10000 + Math.random() * 90000)}`
    };

    setMaintenanceWindows(prev => [newWindow, ...prev]);
    setMaintSubPage('list');
    showToast(`Maintenance Window ${newWindow.id} scheduled & broadcasted!`, 'success');
  };

  // Schedule View
  if (maintSubPage === 'schedule') {
    return (
      <div className="space-y-6 animate-in fade-in duration-150">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm">
          <button
            type="button"
            onClick={() => setMaintSubPage('list')}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Maintenance Windows</span>
          </button>
          <span className="text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Requires L0 Root Authorization
          </span>
        </div>

        <form onSubmit={handleCreateMaintenanceWindow} className="bg-white rounded-3xl p-5 sm:p-8 border border-slate-200/80 shadow-sm space-y-5 text-xs max-w-3xl mx-auto">
          <h2 className="text-xl font-black text-slate-900 border-b pb-3">Schedule Cloud Maintenance Window</h2>
          <div>
            <label className="block font-bold text-slate-700 mb-1">Operation Title *</label>
            <input
              type="text"
              required
              value={newMaintForm.title}
              onChange={(e) => setNewMaintForm({ ...newMaintForm, title: e.target.value })}
              placeholder="e.g. Atlas Multi-Region Replica Failover Drill"
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white text-xs sm:text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Target Cluster</label>
              <input
                type="text"
                value={newMaintForm.targetCluster}
                onChange={(e) => setNewMaintForm({ ...newMaintForm, targetCluster: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Impact Level</label>
              <select
                value={newMaintForm.impactLevel}
                onChange={(e) => setNewMaintForm({ ...newMaintForm, impactLevel: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
              >
                <option value="Zero Downtime">Zero Downtime</option>
                <option value="Sub-Second Cutover">Sub-Second Cutover</option>
                <option value="Read-Only Window">Read-Only Window</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={() => setMaintSubPage('list')}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl text-xs shadow-md shadow-sky-600/30"
            >
              Schedule Window
            </button>
          </div>
        </form>
      </div>
    );
  }

  // Detail / Runbook View
  if (maintSubPage === 'detail' && selectedMaint) {
    return (
      <div className="space-y-6 animate-in fade-in duration-150">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm">
          <button
            type="button"
            onClick={() => setMaintSubPage('list')}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Maintenance Windows</span>
          </button>
          <span className="font-mono text-xs font-bold text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
            Window: {selectedMaint.id}
          </span>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-4 text-xs">
          <div className="border-b pb-4">
            <span className="font-mono text-sky-700 font-bold bg-sky-50 px-2 py-0.5 rounded text-[10px]">
              {selectedMaint.changeTicket}
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">{selectedMaint.title}</h2>
            <p className="text-slate-500 mt-1">{selectedMaint.impactDesc}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-50 rounded-2xl border">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Scheduled Time</span>
              <span className="font-bold text-slate-900 mt-1 block">{selectedMaint.scheduledDate}</span>
              <span className="font-mono text-sky-700">{selectedMaint.windowTime}</span>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Target Cluster</span>
              <span className="font-bold text-slate-900 mt-1 block">{selectedMaint.targetCluster}</span>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Lead Engineer</span>
              <span className="font-bold text-slate-900 mt-1 block">{selectedMaint.leadEngineer}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default List View
  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-amber-600 font-bold uppercase tracking-wider mb-1">
            <Wrench className="w-4 h-4" />
            <span>Infrastructure Engineering Operations</span>
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">Maintenance Management</h1>
          <p className="text-xs text-slate-500 mt-1">Schedule zero-downtime cluster patching, failover rehearsals, and tenant notification banners.</p>
        </div>
        <button
          type="button"
          onClick={() => setMaintSubPage('schedule')}
          className="px-4 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-md shadow-sky-600/25 transition active:scale-95 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Schedule Maintenance Window</span>
        </button>
      </div>

      <div className="space-y-4">
        {filteredWindows.map(w => (
          <div key={w.id} className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="font-mono font-bold text-sky-700 text-xs bg-sky-50 px-2.5 py-0.5 rounded-lg border border-sky-200">
                  {w.id}
                </span>
                <span className="text-xs font-semibold text-slate-500">&bull;</span>
                <span className="font-mono text-xs text-slate-600 font-bold">{w.category}</span>
                {w.broadcastActive && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1">
                    <Radio className="w-3 h-3 text-amber-600 animate-pulse" />
                    <span>Broadcast Active</span>
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-sky-50 text-sky-700 border border-sky-200">
                  {w.status}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedMaint(w);
                    setMaintSubPage('detail');
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs bg-slate-100 hover:bg-sky-50 text-slate-700 hover:text-sky-700 border border-slate-200 transition active:scale-95"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspect Runbook</span>
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="font-bold text-slate-900 text-base">{w.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{w.impactDesc}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Scheduled Window</span>
                <span className="font-bold text-slate-900 text-xs mt-0.5 block">{w.scheduledDate}</span>
                <span className="font-mono text-[11px] text-sky-700">{w.windowTime} ({w.durationMinutes}m)</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Target Cluster</span>
                <span className="font-bold text-slate-900 text-xs mt-0.5 block truncate">{w.targetCluster}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Lead Engineer</span>
                <span className="font-bold text-slate-900 text-xs mt-0.5 block truncate">{w.leadEngineer}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
