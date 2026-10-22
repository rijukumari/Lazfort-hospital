import React, { useState } from 'react';
import { useSaaS } from '../../context/SaaSContext';
import Modal from '../../components/Modal';
import {
  CreditCard,
  Plus,
  Check,
  CheckCircle2,
  AlertCircle,
  Edit2,
  Eye,
  Power,
  Layers,
  Sparkles,
  ShieldCheck,
  Boxes
} from 'lucide-react';

export default function SaaSSubscriptionPlans() {
  const { plans, addPlan, updatePlan, togglePlanStatus } = useSaaS();

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    tier: 'Professional',
    monthlyPrice: 35000,
    yearlyPrice: 350000,
    maxUsers: 50,
    maxBranches: 3,
    storageLimit: '250 GB',
    description: '',
    modulesText: 'Patient Registration, Appointments & Queue, OPD Consult, Billing'
  });
  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Plan Name is required';
    if (!formData.monthlyPrice || formData.monthlyPrice <= 0) errs.monthlyPrice = 'Valid monthly price is required';
    if (!formData.yearlyPrice || formData.yearlyPrice <= 0) errs.yearlyPrice = 'Valid yearly price is required';
    if (!formData.maxUsers || formData.maxUsers <= 0) errs.maxUsers = 'Maximum users is required';
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const modules = formData.modulesText.split(',').map(m => m.trim()).filter(Boolean);
    addPlan({
      ...formData,
      modules
    });

    setCreateModalOpen(false);
    setFormData({
      name: '',
      tier: 'Professional',
      monthlyPrice: 35000,
      yearlyPrice: 350000,
      maxUsers: 50,
      maxBranches: 3,
      storageLimit: '250 GB',
      description: '',
      modulesText: 'Patient Registration, Appointments & Queue, OPD Consult, Billing'
    });
    setFormErrors({});
  };

  const handleOpenEdit = (plan) => {
    setSelectedPlan(plan);
    setFormData({
      name: plan.name,
      tier: plan.tier,
      monthlyPrice: plan.monthlyPrice,
      yearlyPrice: plan.yearlyPrice,
      maxUsers: plan.maxUsers,
      maxBranches: plan.maxBranches,
      storageLimit: plan.storageLimit,
      description: plan.description || '',
      modulesText: (plan.modules || []).join(', ')
    });
    setEditModalOpen(true);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!selectedPlan) return;
    const modules = formData.modulesText.split(',').map(m => m.trim()).filter(Boolean);
    updatePlan(selectedPlan.id, {
      ...formData,
      modules
    });
    setEditModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-extrabold uppercase tracking-wider bg-purple-50 text-purple-700 border border-purple-200 px-3 py-0.5 rounded-full">
              Subscription Architecture
            </span>
            <span className="text-xs text-slate-500 font-medium">
              &bull; {plans.length} Tier Configurations
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
            Subscription Plans
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Pricing tiers, quotas, feature gating, and commercial hospital subscription models.
          </p>
        </div>

        <button
          onClick={() => {
            setFormErrors({});
            setCreateModalOpen(true);
          }}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md shadow-purple-600/20 transition flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Plan</span>
        </button>
      </div>

      {/* Plan Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const isEnterprise = plan.tier === 'Enterprise';

          return (
            <div
              key={plan.id}
              className={`bg-white rounded-3xl border shadow-sm p-6 flex flex-col justify-between transition relative overflow-hidden ${
                isEnterprise
                  ? 'border-purple-300 ring-2 ring-purple-500/10'
                  : 'border-slate-200/80'
              }`}
            >
              {isEnterprise && (
                <div className="absolute top-0 right-0 bg-purple-600 text-white text-[10px] uppercase font-black px-4 py-1 rounded-bl-xl tracking-wider">
                  Flagship Network
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                    plan.status === 'Active'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-slate-100 text-slate-600 border-slate-200'
                  }`}>
                    {plan.status}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-400">{plan.id}</span>
                </div>

                <div>
                  <h3 className="text-lg font-black text-slate-900">{plan.name}</h3>
                  <p className="text-xs text-slate-500 mt-1 min-h-[36px]">{plan.description}</p>
                </div>

                {/* Price */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black font-mono text-slate-900">
                      ₹{plan.monthlyPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-slate-500">/ month</span>
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                    ₹{plan.yearlyPrice.toLocaleString('en-IN')} billed annually
                  </div>
                </div>

                {/* Quotas */}
                <div className="grid grid-cols-3 gap-2 text-center text-xs py-1">
                  <div className="p-2 bg-slate-50/60 rounded-xl">
                    <span className="text-[10px] text-slate-400 block uppercase">Max Users</span>
                    <strong className="text-slate-800 font-mono">{plan.maxUsers}</strong>
                  </div>
                  <div className="p-2 bg-slate-50/60 rounded-xl">
                    <span className="text-[10px] text-slate-400 block uppercase">Branches</span>
                    <strong className="text-slate-800 font-mono">{plan.maxBranches}</strong>
                  </div>
                  <div className="p-2 bg-slate-50/60 rounded-xl">
                    <span className="text-[10px] text-slate-400 block uppercase">Storage</span>
                    <strong className="text-slate-800 font-mono">{plan.storageLimit}</strong>
                  </div>
                </div>

                {/* Included Modules */}
                <div className="space-y-1.5 pt-2 border-t border-slate-100">
                  <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                    Included Modules ({plan.modules?.length || 0})
                  </span>
                  <div className="space-y-1">
                    {(plan.modules || []).slice(0, 5).map((mod, idx) => (
                      <div key={idx} className="flex items-center text-xs text-slate-600 gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate">{mod}</span>
                      </div>
                    ))}
                    {(plan.modules?.length || 0) > 5 && (
                      <span className="text-[11px] text-purple-600 font-semibold block pt-0.5">
                        + {plan.modules.length - 5} more enterprise modules
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      setSelectedPlan(plan);
                      setViewModalOpen(true);
                    }}
                    className="p-2 border border-slate-200 rounded-xl text-slate-600 hover:text-purple-600 hover:bg-purple-50 transition"
                    title="View Plan"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleOpenEdit(plan)}
                    className="p-2 border border-slate-200 rounded-xl text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition"
                    title="Edit Plan"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={() => togglePlanStatus(plan.id)}
                  className={`px-3 py-1.5 rounded-xl font-bold text-xs transition flex items-center gap-1.5 ${
                    plan.status === 'Active'
                      ? 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
                      : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                  }`}
                >
                  <Power className="w-3.5 h-3.5" />
                  <span>{plan.status === 'Active' ? 'Deactivate' : 'Activate'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* CREATE PLAN MODAL */}
      <Modal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        title="Create New Subscription Plan"
        maxWidth="max-w-xl"
      >
        <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Plan Title <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Specialty Cardiology Clinic"
              className={`w-full p-2.5 bg-slate-50 border rounded-xl text-xs ${
                formErrors.name ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
              }`}
            />
            {formErrors.name && <p className="text-[11px] text-rose-500 mt-0.5">{formErrors.name}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Tier Category</label>
              <select
                value={formData.tier}
                onChange={(e) => setFormData({ ...formData, tier: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
              >
                <option value="Basic">Basic</option>
                <option value="Professional">Professional</option>
                <option value="Enterprise">Enterprise</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Max Users</label>
              <input
                type="number"
                min="1"
                value={formData.maxUsers}
                onChange={(e) => setFormData({ ...formData, maxUsers: parseInt(e.target.value) || 20 })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Monthly Price (INR) <span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                min="0"
                value={formData.monthlyPrice}
                onChange={(e) => setFormData({ ...formData, monthlyPrice: parseInt(e.target.value) || 0 })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Yearly Price (INR) <span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                min="0"
                value={formData.yearlyPrice}
                onChange={(e) => setFormData({ ...formData, yearlyPrice: parseInt(e.target.value) || 0 })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Max Branches</label>
              <input
                type="number"
                min="1"
                value={formData.maxBranches}
                onChange={(e) => setFormData({ ...formData, maxBranches: parseInt(e.target.value) || 1 })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Storage Allocation</label>
              <select
                value={formData.storageLimit}
                onChange={(e) => setFormData({ ...formData, storageLimit: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              >
                <option value="50 GB">50 GB</option>
                <option value="250 GB">250 GB</option>
                <option value="1 TB">1 TB</option>
                <option value="2 TB">2 TB</option>
                <option value="5 TB">5 TB</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Included Modules (comma-separated)
            </label>
            <textarea
              rows={2}
              value={formData.modulesText}
              onChange={(e) => setFormData({ ...formData, modulesText: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Plan Description</label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Brief target demographic and feature highlights..."
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setCreateModalOpen(false)}
              className="px-4 py-2 border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-md"
            >
              Save & Activate Plan
            </button>
          </div>
        </form>
      </Modal>

      {/* VIEW PLAN MODAL */}
      <Modal
        isOpen={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        title="Subscription Plan Specifications"
        maxWidth="max-w-md"
      >
        {selectedPlan && (
          <div className="space-y-4 text-xs text-slate-700">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
              <span className="font-mono font-bold text-purple-700">{selectedPlan.id}</span>
              <h3 className="text-base font-bold text-slate-900">{selectedPlan.name}</h3>
              <p className="text-slate-500">{selectedPlan.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-white border border-slate-200 rounded-xl">
                <span className="text-[10px] text-slate-400 block uppercase">Monthly Fee</span>
                <span className="font-mono font-bold text-slate-800">₹{selectedPlan.monthlyPrice?.toLocaleString('en-IN')}</span>
              </div>
              <div className="p-3 bg-white border border-slate-200 rounded-xl">
                <span className="text-[10px] text-slate-400 block uppercase">Yearly Fee</span>
                <span className="font-mono font-bold text-slate-800">₹{selectedPlan.yearlyPrice?.toLocaleString('en-IN')}</span>
              </div>
              <div className="p-3 bg-white border border-slate-200 rounded-xl">
                <span className="text-[10px] text-slate-400 block uppercase">Max Users</span>
                <span className="font-mono font-bold text-slate-800">{selectedPlan.maxUsers} Users</span>
              </div>
              <div className="p-3 bg-white border border-slate-200 rounded-xl">
                <span className="text-[10px] text-slate-400 block uppercase">Storage</span>
                <span className="font-mono font-bold text-slate-800">{selectedPlan.storageLimit}</span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1.5">
              <span className="font-bold text-slate-800 uppercase text-[10px]">Included Modules</span>
              <div className="flex flex-wrap gap-1.5">
                {(selectedPlan.modules || []).map((m, idx) => (
                  <span key={idx} className="bg-white border border-slate-200 px-2 py-0.5 rounded text-[11px] text-slate-700">
                    {m}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-100">
              <button
                onClick={() => setViewModalOpen(false)}
                className="px-4 py-2 bg-slate-800 text-white font-bold rounded-xl text-xs hover:bg-slate-900"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* EDIT PLAN MODAL */}
      <Modal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        title="Edit Subscription Plan"
        maxWidth="max-w-xl"
      >
        <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Plan Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Monthly Price</label>
              <input
                type="number"
                value={formData.monthlyPrice}
                onChange={(e) => setFormData({ ...formData, monthlyPrice: parseInt(e.target.value) || 0 })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Yearly Price</label>
              <input
                type="number"
                value={formData.yearlyPrice}
                onChange={(e) => setFormData({ ...formData, yearlyPrice: parseInt(e.target.value) || 0 })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Max Users</label>
              <input
                type="number"
                value={formData.maxUsers}
                onChange={(e) => setFormData({ ...formData, maxUsers: parseInt(e.target.value) || 20 })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Max Branches</label>
              <input
                type="number"
                value={formData.maxBranches}
                onChange={(e) => setFormData({ ...formData, maxBranches: parseInt(e.target.value) || 1 })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setEditModalOpen(false)}
              className="px-4 py-2 border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl"
            >
              Save Plan
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
