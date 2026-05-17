import { useEffect, useState } from 'react';
import axios from 'axios';
import type { ApiErrorResponse } from '../../types/api.types';
import type { CreateLeadPayload, Lead, LeadSource, LeadStatus } from '../../features/leads/leads.types';

interface LeadFormProps {
  initialValues?: Lead | null;
  onSubmit: (payload: CreateLeadPayload) => Promise<void>;
  isSubmitting: boolean;
}

export const LeadForm = ({ initialValues, onSubmit, isSubmitting }: LeadFormProps) => {
  const [form, setForm] = useState<CreateLeadPayload>({
    name: '',
    email: '',
    status: 'new',
    source: 'website',
  });
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (initialValues) {
      setForm({
        name: initialValues.name,
        email: initialValues.email,
        status: initialValues.status,
        source: initialValues.source,
      });
    }
  }, [initialValues]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage('');

    try {
      await onSubmit(form);
    } catch (error: unknown) {
      if (axios.isAxiosError<ApiErrorResponse>(error)) {
        setErrorMessage(error.response?.data?.message ?? 'Something went wrong');
      } else {
        setErrorMessage('Something went wrong');
      }
    }
  };

  const inputStyles = "w-full bg-[#030407] border border-zinc-800 rounded-lg py-2.5 px-3 text-sm text-zinc-100 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all";
  const labelStyles = "block text-xs font-medium text-zinc-400 mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className={labelStyles}>Name</label>
        <input
          type="text"
          required
          value={form.name}
          onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
          className={inputStyles}
          placeholder="John Doe"
        />
      </div>

      <div>
        <label className={labelStyles}>Email Address</label>
        <input
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
          className={inputStyles}
          placeholder="john@company.com"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelStyles}>Pipeline Status</label>
          <div className="relative">
            <select
              value={form.status}
              onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value as LeadStatus }))}
              className={`${inputStyles} appearance-none`}
            >
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="qualified">Qualified</option>
              <option value="lost">Lost</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-zinc-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>

        <div>
          <label className={labelStyles}>Acquisition Source</label>
          <div className="relative">
            <select
              value={form.source}
              onChange={(e) => setForm((prev) => ({ ...prev, source: e.target.value as LeadSource }))}
              className={`${inputStyles} appearance-none`}
            >
              <option value="website">Website</option>
              <option value="instagram">Instagram</option>
              <option value="referral">Referral</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-zinc-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>
      </div>

      {errorMessage && (
        <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-lg">
          <p className="text-xs text-rose-400">{errorMessage}</p>
        </div>
      )}

      <button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full mt-6 py-2.5 rounded-lg font-medium text-sm transition-all active:scale-[0.98] bg-cyan-400 text-zinc-900 hover:bg-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.2)] disabled:opacity-50"
      >
        {isSubmitting ? 'Saving record...' : 'Save Lead Details'}
      </button>
    </form>
  );
};