import React, { useState } from 'react';
import { useSaaS } from '../../context/SaaSContext';
import Modal from '../../components/Modal';
import {
  LifeBuoy,
  BellRing,
  Cpu,
  Plus,
  Eye,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Send,
  RefreshCw,
  Sliders,
  Check,
  Server,
  Zap,
  Globe
} from 'lucide-react';

export default function SaaSSupportOperations({ initialTab = 'tickets' }) {
  const {
    tickets,
    updateTicketStatus,
    notifications,
    addNotification,
    integrations,
    updateIntegration,
    testIntegration,
    tenants
  } = useSaaS();

  const [activeSubTab, setActiveSubTab] = useState(initialTab); // 'tickets', 'notifications', 'integrations'

  // Ticket Details & Status Update Modals
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [ticketModalOpen, setTicketModalOpen] = useState(false);
  const [newStatus, setNewStatus] = useState('In Progress');

  // Notification Modals & Form
  const [createNotifOpen, setCreateNotifOpen] = useState(false);
  const [previewNotifOpen, setPreviewNotifOpen] = useState(false);
  const [notifForm, setNotifForm] = useState({
    title: '',
    message: '',
    target: 'All Hospital Tenants (24)',
    type: 'Announcement'
  });

  // Integration Config Modal
  const [selectedIntegration, setSelectedIntegration] = useState(null);
  const [integrationModalOpen, setIntegrationModalOpen] = useState(false);

  const handleOpenTicket = (t) => {
    setSelectedTicket(t);
    setNewStatus(t.status);
    setTicketModalOpen(true);
  };

  const handleUpdateTicket = (e) => {
    e.preventDefault();
    if (!selectedTicket) return;
    updateTicketStatus(selectedTicket.id, newStatus);
    setTicketModalOpen(false);
  };

  const handlePreviewSubmit = (e) => {
    e.preventDefault();
    if (!notifForm.title.trim() || !notifForm.message.trim()) return;
    setPreviewNotifOpen(true);
  };

  const handleSendNotification = () => {
    addNotification(notifForm);
    setPreviewNotifOpen(false);
    setCreateNotifOpen(false);
    setNotifForm({
      title: '',
      message: '',
      target: 'All Hospital Tenants (24)',
      type: 'Announcement'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-extrabold uppercase tracking-wider bg-sky-50 text-sky-700 border border-sky-200 px-3 py-0.5 rounded-full">
              Platform Support & Operations
            </span>
            <span className="text-xs text-slate-500 font-medium">
              &bull; Global Service Desk & Telemetry
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
            Support, Broadcasts & Integrations
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Resolve institutional hospital tickets, broadcast system notices, and manage platform communications.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200/80">
          <button
            onClick={() => setActiveSubTab('tickets')}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs transition flex items-center gap-1.5 ${
              activeSubTab === 'tickets' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <LifeBuoy className="w-3.5 h-3.5" />
            <span>Support Tickets ({tickets.length})</span>
          </button>
          <button
            onClick={() => setActiveSubTab('notifications')}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs transition flex items-center gap-1.5 ${
              activeSubTab === 'notifications' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BellRing className="w-3.5 h-3.5" />
            <span>Broadcasts ({notifications.length})</span>
          </button>
          <button
            onClick={() => setActiveSubTab('integrations')}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs transition flex items-center gap-1.5 ${
              activeSubTab === 'integrations' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Integrations ({integrations.length})</span>
          </button>
        </div>
      </div>

      {/* SUB-VIEW 1: SUPPORT TICKETS */}
      {activeSubTab === 'tickets' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-sm text-slate-900">Institutional Service Requests</h3>
              <p className="text-xs text-slate-500">Technical inquiries, PACS/HL7 issues, and plan upgrade requests.</p>
            </div>
            <span className="text-xs font-mono bg-sky-50 text-sky-700 px-3 py-1 rounded-full font-bold">
              Avg First Response: 18 mins
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/75 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-100">
                <tr>
                  <th className="p-4">Ticket ID</th>
                  <th className="p-4">Hospital Name</th>
                  <th className="p-4">Subject</th>
                  <th className="p-4">Priority</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Created Date</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {tickets.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50/80 transition">
                    <td className="p-4 font-mono font-bold text-sky-700">{t.id}</td>
                    <td className="p-4 font-bold text-slate-900">
                      <div>{t.hospital}</div>
                      <span className="text-[10px] text-slate-400 font-mono font-normal">{t.tenantId}</span>
                    </td>
                    <td className="p-4 text-slate-800 max-w-sm font-medium">{t.subject}</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] border ${
                        t.priority === 'Critical'
                          ? 'bg-rose-50 text-rose-700 border-rose-200'
                          : t.priority === 'High'
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : 'bg-slate-100 text-slate-700 border-slate-200'
                      }`}>
                        {t.priority}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] border ${
                        t.status === 'Resolved'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : t.status === 'In Progress'
                          ? 'bg-sky-50 text-sky-700 border-sky-200'
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}>
                        {t.status}
                      </span>
                    </td>
                    <td className="p-4 font-mono text-[11px] text-slate-500">{t.createdDate}</td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleOpenTicket(t)}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-sky-50 hover:text-sky-700 text-slate-700 font-bold rounded-xl transition inline-flex items-center gap-1.5"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View / Update</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUB-VIEW 2: PLATFORM NOTIFICATIONS */}
      {activeSubTab === 'notifications' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-sm text-slate-900">Broadcast Notifications & Maintenance Bulletins</h3>
              <p className="text-xs text-slate-500">Dispatch alerts across hospital administrative and clinical terminals.</p>
            </div>
            <button
              onClick={() => setCreateNotifOpen(true)}
              className="bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Compose Broadcast</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {notifications.map((n) => (
              <div key={n.id} className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-sky-700">{n.id}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-sky-50 text-sky-700 border border-sky-200">
                      {n.type}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono">{n.date}</span>
                </div>
                <h4 className="font-bold text-slate-900 text-sm">{n.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{n.message}</p>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Target: <strong>{n.target}</strong></span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{n.status}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-VIEW 3: INTEGRATION MANAGEMENT */}
      {activeSubTab === 'integrations' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {integrations.map((item) => (
            <div key={item.id} className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">{item.category}</span>
                  <h3 className="font-bold text-slate-900 text-base">{item.name}</h3>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  {item.status}
                </span>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Provider:</span>
                  <strong className="text-slate-800">{item.provider}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Monthly Quota:</span>
                  <span className="font-mono font-semibold text-slate-700">{item.monthlyQuota}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Usage This Month:</span>
                  <span className="font-mono font-bold text-sky-700">{item.used}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Last Healthcheck:</span>
                  <span className="font-mono text-slate-400">{item.lastTest}</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  onClick={() => testIntegration(item.id)}
                  className="px-3 py-1.5 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl transition flex items-center gap-1"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Test Ping</span>
                </button>
                <button
                  onClick={() => {
                    setSelectedIntegration(item);
                    setIntegrationModalOpen(true);
                  }}
                  className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition"
                >
                  Configure
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TICKET DETAILS MODAL */}
      <Modal
        isOpen={ticketModalOpen}
        onClose={() => setTicketModalOpen(false)}
        title="Support Ticket Resolution Desk"
        maxWidth="max-w-lg"
      >
        {selectedTicket && (
          <form onSubmit={handleUpdateTicket} className="space-y-4 text-xs text-slate-700">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
              <span className="font-mono font-bold text-sky-700">{selectedTicket.id}</span>
              <h3 className="text-base font-bold text-slate-900">{selectedTicket.subject}</h3>
              <p className="text-slate-500">From: {selectedTicket.hospital} &bull; Created: {selectedTicket.createdDate}</p>
            </div>

            <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-1">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Hospital Reported Issue:</span>
              <p className="text-slate-700 leading-relaxed">{selectedTicket.description}</p>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Update Ticket Status</label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
              >
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
                <option value="Closed">Closed</option>
              </select>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setTicketModalOpen(false)}
                className="px-4 py-2 border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl"
              >
                Update Status
              </button>
            </div>
          </form>
        )}
      </Modal>

      {/* CREATE NOTIFICATION MODAL */}
      <Modal
        isOpen={createNotifOpen}
        onClose={() => setCreateNotifOpen(false)}
        title="Compose Platform Notification"
        maxWidth="max-w-lg"
      >
        <form onSubmit={handlePreviewSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Notification Title</label>
            <input
              type="text"
              required
              value={notifForm.title}
              onChange={(e) => setNotifForm({ ...notifForm, title: e.target.value })}
              placeholder="e.g. Critical Gateway Maintenance Notice"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Notification Type</label>
              <select
                value={notifForm.type}
                onChange={(e) => setNotifForm({ ...notifForm, type: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
              >
                <option value="Announcement">Announcement</option>
                <option value="Maintenance">Maintenance Window</option>
                <option value="Security Alert">Security Alert</option>
                <option value="Critical">Critical Patch</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Target Hospitals</label>
              <select
                value={notifForm.target}
                onChange={(e) => setNotifForm({ ...notifForm, target: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
              >
                <option value="All Hospital Tenants (24)">All Hospital Tenants (24)</option>
                <option value="Enterprise Tenants Only">Enterprise Tenants Only</option>
                <option value="Professional & Basic Tenants">Professional & Basic Tenants</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Broadcast Message Body</label>
            <textarea
              required
              rows={4}
              value={notifForm.message}
              onChange={(e) => setNotifForm({ ...notifForm, message: e.target.value })}
              placeholder="Type message content displayed on hospital user dashboards..."
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setCreateNotifOpen(false)}
              className="px-4 py-2 border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl"
            >
              Preview Notification &rarr;
            </button>
          </div>
        </form>
      </Modal>

      {/* PREVIEW NOTIFICATION MODAL */}
      <Modal
        isOpen={previewNotifOpen}
        onClose={() => setPreviewNotifOpen(false)}
        title="Preview Hospital Broadcast Bulletin"
        maxWidth="max-w-md"
      >
        <div className="space-y-4 text-xs text-slate-700">
          <div className="p-5 bg-gradient-to-br from-slate-900 to-sky-950 text-white rounded-2xl border border-sky-500/20 shadow-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-sky-500/30 text-sky-300">
                {notifForm.type}
              </span>
              <span className="text-[10px] text-slate-400 font-mono">Today</span>
            </div>
            <h4 className="text-base font-black text-white">{notifForm.title}</h4>
            <p className="text-xs text-slate-300 leading-relaxed">{notifForm.message}</p>
            <div className="pt-2 border-t border-white/10 text-[10px] text-sky-300">
              Audience: {notifForm.target}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setPreviewNotifOpen(false)}
              className="px-4 py-2 border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50"
            >
              Back to Edit
            </button>
            <button
              type="button"
              onClick={handleSendNotification}
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md"
            >
              Send Broadcast Now
            </button>
          </div>
        </div>
      </Modal>

      {/* INTEGRATION CONFIG MODAL */}
      <Modal
        isOpen={integrationModalOpen}
        onClose={() => setIntegrationModalOpen(false)}
        title="Integration Gateway Configuration"
        maxWidth="max-w-md"
      >
        {selectedIntegration && (
          <div className="space-y-4 text-xs text-slate-700">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
              <span className="font-mono text-sky-700 font-bold">{selectedIntegration.id}</span>
              <h3 className="text-base font-bold text-slate-900">{selectedIntegration.name}</h3>
              <p className="text-slate-500">Provider: {selectedIntegration.provider}</p>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">API Key / Secret Token</label>
              <input
                type="password"
                defaultValue="sk_live_enterprise_lazfort_gateway_token_99x"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Webhook Endpoint URL</label>
              <input
                type="text"
                defaultValue="https://api.lazfort.com/webhooks/gateway/events"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono"
              />
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIntegrationModalOpen(false)}
                className="px-4 py-2 border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  updateIntegration(selectedIntegration.id, { lastTest: new Date().toLocaleTimeString() + ' IST' });
                  setIntegrationModalOpen(false);
                }}
                className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl"
              >
                Save Configuration
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
