import { createContext, useCallback, useState } from "react";

const NotificationContext = createContext();

export default NotificationContext;

export const NotificationContextProvider = (props) => {
  const [message, setMessage] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const setNotification = useCallback((message, isVisible, duration = 5000) => {
    setMessage(message);
    setIsVisible(isVisible);
    setTimeout(() => {
      setIsVisible(false);
    }, duration);
  }, []);

  return (
    <NotificationContext.Provider
      value={{ message, setMessage, isVisible, setIsVisible, setNotification }}
    >
      {props.children}
    </NotificationContext.Provider>
  );
};
