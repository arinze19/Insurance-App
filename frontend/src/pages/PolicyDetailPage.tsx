import PolicyForm from '../components/UI/PolicyForm';
import FamilyForm from '../components/UI/FamilyForm';

function PolicyDetailPage() {
  return (
    <div className='flex flex-col gap-4 p-4 md:flex-row mx-auto max-w-6xl'>
      <PolicyForm />
      <FamilyForm />
    </div>
  );
}

export default PolicyDetailPage;
