import React, { createContext, useContext } from 'react';

const Context = createContext<{
  status: { message: string; open: boolean };
  setStatus: React.Dispatch<
    React.SetStateAction<{ message: string; open: boolean }>
  >;
} | null>(null);

function NotificationContext({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = React.useState({ message: '', open: false });
  return (
    <Context.Provider value={{ status, setStatus }}>
      {children}
    </Context.Provider>
  );
}

export function useNotificationContext() {
  const notification = useContext(Context);
  if (notification) {
    return notification;
  }

  return { status: { message: '', open: false }, setStatus: () => '' };
}

export default NotificationContext;
