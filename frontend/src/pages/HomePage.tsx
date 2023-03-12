import CardList from '../components/cards/CardList';
import Text from '../components/UI/Text';

const HomePage = () => {
  return (
    <div
      className='w-5/6 max-w-screen-xl h-screen mx-auto'
      data-testid='home-page-container'
    >
      <div className='flex flex-col gap-2 mx-auto my-16 w-full md:w-6/12'>
        <Text size='4xl' weight='bold' color='gray-800' align='center'>
          Honest, simple insurance
        </Text>
        <Text size='md' align='center'>
          Moving to a new country is hard and complex enough, getting an
          insurance shouldn't, leave it to us...Feather 🪶
        </Text>
      </div>
      <CardList />
    </div>
  );
};

export default HomePage;
