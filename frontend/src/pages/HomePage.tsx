import CardList from '../components/cards/CardList';

const HomePage = () => {
  return (
    <div className='w-5/6 max-w-screen-xl h-screen mx-auto' data-testid='home-page-container'>
      <div className='text-center mx-auto my-16 w-full md:w-6/12'>
        <h1 className='text-4xl font-bold mb-2 text-gray-800'>Honest, simple insurance</h1>
        <p className='text-gray-500'> 
          Moving to a new country is hard and complex enough, getting an
          insurance shouldn't, leave it to us...Feather 🪶
        </p>
      </div> 

      <CardList />
    </div>
  );
};

export default HomePage;
