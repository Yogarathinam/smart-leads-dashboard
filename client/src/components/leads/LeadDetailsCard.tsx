import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { formatDate } from '../../utils/formatDate';
import type { Lead } from '../../features/leads/leads.types';

interface LeadDetailsCardProps {
  lead: Lead;
}

export const LeadDetailsCard = ({ lead }: LeadDetailsCardProps) => {
  const statusColor =
    lead.status === 'qualified'
      ? 'green'
      : lead.status === 'lost'
        ? 'red'
        : lead.status === 'contacted'
          ? 'blue'
          : 'amber';

  return (
    <Card>
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">{lead.name}</h2>
          <p className="text-sm text-slate-600">{lead.email}</p>
        </div>

        <div className="flex gap-3">
          <Badge color={statusColor}>{lead.status}</Badge>
          <Badge>{lead.source}</Badge>
        </div>

        <div className="space-y-1 text-sm text-slate-600">
          <p>Created At: {formatDate(lead.createdAt)}</p>
          <p>Updated At: {formatDate(lead.updatedAt)}</p>
        </div>
      </div>
    </Card>
  );
};