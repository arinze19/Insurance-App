import { InsuranceTypes, CardItemProp } from '../../types';
import { Link } from 'react-router-dom';
import Text from '../UI/Text';

const getPolicyColor = (type: InsuranceTypes) => {
  const policyColors: { [k in InsuranceTypes]: { backgroundColor: string } } = {
    HEALTH: { backgroundColor: 'bg-red-300' },
    LIABILITY: { backgroundColor: 'bg-blue-300' },
    HOUSEHOLD: { backgroundColor: 'bg-green-300' },
  };

  return policyColors[type];
};

const CardItem = ({ policy }: CardItemProp) => {
  const { backgroundColor } = getPolicyColor(policy.type);

  return (
    <Link to='/policies'>
      <div
        className='flex rounded-md bg-white-100 m-2 md:m-4 cursor-pointer w-96 h-auto overflow-hidden shadow-sm hover:shadow-md ease-in-out duration-300'
        data-testid='card-item-container'
      >
        <div className={`${backgroundColor} grid place-content-center w-1/4`}>
          {policy.icon}
        </div>
        <div className='flex flex-col gap-2 p-4 pt-2 pl-3 md:p-6 md:pt-2 md:pl-3 w-3/4'>
          <Text
            size='lg'
            weight='medium'
            data_testid='policy-summary-name'
            color='gray-800'
          >
            {policy.name}
          </Text>

          <Text size='sm'>{policy.description}</Text>
        </div>
      </div>
    </Link>
  );
};

export default CardItem;
