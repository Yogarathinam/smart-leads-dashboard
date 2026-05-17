import { useEffect, useState } from 'react';
import axios from 'axios';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import type { CreateLeadPayload, Lead, LeadSource, LeadStatus } from '../../features/leads/leads.types';

interface LeadFormProps {
  initialValues?: Lead | null;
  onSubmit: (payload: CreateLeadPayload) => Promise<unknown>;
  isSubmitting: boolean;
}

const defaultForm: CreateLeadPayload = {
  name: '',
  email: '',
  status: 'new',
  source: 'website',
};

export const LeadForm = ({ initialValues, onSubmit, isSubmitting }: LeadFormProps) => {
  const [form, setForm] = useState<CreateLeadPayload>(defaultForm);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (initialValues) {
      setForm({
        name: initialValues.name,
        email: initialValues.email,
        status: initialValues.status,
        source: initialValues.source,
      });
    } else {
      setForm(defaultForm);
    }
  }, [initialValues]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage('');

    try {
      await onSubmit(form);
      if (!initialValues) {
        setForm(defaultForm);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError<{ message?: string }>(error)) {
        setErrorMessage(error.response?.data?.message ?? 'Something went wrong');
      } else {
        setErrorMessage('Something went wrong');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Input
        label="Name"
        value={form.name}
        onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
        placeholder="John Doe"
      />

      <Input
        label="Email Address"
        type="email"
        value={form.email}
        onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
        placeholder="john@company.com"
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Select
          label="Pipeline Status"
          value={form.status}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, status: e.target.value as LeadStatus }))
          }
        >
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="qualified">Qualified</option>
          <option value="lost">Lost</option>
        </Select>

        <Select
          label="Acquisition Source"
          value={form.source}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, source: e.target.value as LeadSource }))
          }
        >
          <option value="website">Website</option>
          <option value="instagram">Instagram</option>
          <option value="referral">Referral</option>
        </Select>
      </div>

      {errorMessage ? (
        <div className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-600 dark:border-rose-900/60 dark:bg-rose-950/30 dark:text-rose-300">
          {errorMessage}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-full items-center justify-center rounded-xl bg-cyan-500 px-4 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60 dark:text-zinc-950"
      >
        {isSubmitting ? 'Saving record...' : 'Save Lead Details'}
      </button>
    </form>
  );
};