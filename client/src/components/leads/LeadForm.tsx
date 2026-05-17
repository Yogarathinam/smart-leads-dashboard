import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
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

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Name"
        value={form.name}
        onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
      />
      <Input
        label="Email"
        type="email"
        value={form.email}
        onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
      />
      <Select
        label="Status"
        value={form.status}
        onChange={(event) =>
          setForm((prev) => ({ ...prev, status: event.target.value as LeadStatus }))
        }
      >
        <option value="new">New</option>
        <option value="contacted">Contacted</option>
        <option value="qualified">Qualified</option>
        <option value="lost">Lost</option>
      </Select>
      <Select
        label="Source"
        value={form.source}
        onChange={(event) =>
          setForm((prev) => ({ ...prev, source: event.target.value as LeadSource }))
        }
      >
        <option value="website">Website</option>
        <option value="instagram">Instagram</option>
        <option value="referral">Referral</option>
      </Select>
      {errorMessage ? <p className="text-sm text-rose-600">{errorMessage}</p> : null}
      <Button type="submit" fullWidth disabled={isSubmitting}>
        {isSubmitting ? 'Saving...' : 'Save lead'}
      </Button>
    </form>
  );
};