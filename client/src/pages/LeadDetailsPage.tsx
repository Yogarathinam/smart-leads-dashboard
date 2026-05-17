import { useParams } from 'react-router-dom';
import { Spinner } from '../components/ui/Spinner';
import { ErrorState } from '../components/ui/ErrorState';
import { LeadDetailsCard } from '../components/leads/LeadDetailsCard';
import { useLead } from '../features/leads/leads.hooks';

const LeadDetailsPage = () => {
  const { id = '' } = useParams();
  const { data, isLoading, isError } = useLead(id);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError || !data) {
    return (
      <ErrorState
        title="Unable to load lead"
        description="The requested lead could not be fetched."
      />
    );
  }

  return <LeadDetailsCard lead={data} />;
};

export default LeadDetailsPage;