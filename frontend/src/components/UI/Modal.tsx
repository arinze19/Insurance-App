import React from 'react';
import Button from './Button';
import Text from './Text';
import { useNotificationContext } from '../../context/NotificationContext';

function Modal() {
  const { status, setStatus } = useNotificationContext();
  const openClass = status.open ? 'top-1/4 opacity-1 delay-100' : 'top-0 opacity-0';
  const openClassBackdrop = status.open
    ? 'opacity-1 pointer-events'
    : 'opacity-0 pointer-events-none delay-500';
  const handleClick = () => {
    setStatus({ ...status, open: false });
  };

  return (
    <div
      className={`fixed top-0 left-0 h-screen w-full bg-black transition-opacity bg-opacity-40 ${openClassBackdrop}`}
    >
      <div
        className={`w-72 absolute left-1/2 custom-translate rounded-md bg-white-100 shadow-lg overflow-hidden transition-all duration-700 linear ${openClass}`}
      >
        <div className='w-full text-center bg-purple-200 p-2 text-white-100'>
          <Text size='lg' color='white-100' align='center'>
            Notification Box
          </Text>
        </div>
        <div className='p-4'>
          <Text size='sm'>{status.message}</Text>
        </div>
        <div className='p-3'>
          <Button
            variant='primary'
            size='full'
            type='button'
            onClick={handleClick}
          >
            Okay
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
