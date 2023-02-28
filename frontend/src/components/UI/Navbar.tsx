import { Link } from 'react-router-dom';
import logo2 from '../../assets/logo2.svg';

const Navbar = () => {
  return (
    <div className='flex justify-center w-full bg-white-100 p-2 shadow-sm'>
      <Link to='/'>
        <img className='h-14' src={logo2} alt='Feather logo' />
      </Link>
    </div>
  );
};

export default Navbar;
