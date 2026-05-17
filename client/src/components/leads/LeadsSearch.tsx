import { Input } from '../ui/Input';

interface LeadsSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export const LeadsSearch = ({ value, onChange }: LeadsSearchProps) => {
  return (
    <Input
      label="Search by name or email"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder="Search leads..."
    />
  );
};