import { useNavigate } from 'react-router-dom';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { formatDate } from '../../utils/formatDate';
import type { Lead } from '../../features/leads/leads.types';
import type { UserRole } from '../../features/auth/auth.types';

interface LeadsTableProps {
  leads: Lead[];
  userRole?: UserRole;
  onEdit: (lead: Lead) => void;
  onDelete: (lead: Lead) => void;
}

export const LeadsTable = ({ leads, userRole, onEdit, onDelete }: LeadsTableProps) => {
  const navigate = useNavigate();

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-left text-sm text-slate-600">
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Source</th>
              <th className="px-4 py-3">Created At</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => {
              const statusColor =
                lead.status === 'qualified'
                  ? 'green'
                  : lead.status === 'lost'
                    ? 'red'
                    : lead.status === 'contacted'
                      ? 'blue'
                      : 'amber';

              return (
                <tr key={lead.id} className="border-b border-slate-100 text-sm text-slate-700">
                  <td className="px-4 py-3 font-medium">{lead.name}</td>
                  <td className="px-4 py-3">{lead.email}</td>
                  <td className="px-4 py-3">
                    <Badge color={statusColor}>{lead.status}</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Badge>{lead.source}</Badge>
                  </td>
                  <td className="px-4 py-3">{formatDate(lead.createdAt)}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant="secondary"
                        onClick={() => navigate(`/leads/${lead.id}`)}
                      >
                        View
                      </Button>
                      <Button variant="secondary" onClick={() => onEdit(lead)}>
                        Edit
                      </Button>
                      {userRole === 'admin' ? (
                        <Button variant="danger" onClick={() => onDelete(lead)}>
                          Delete
                        </Button>
                      ) : null}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};