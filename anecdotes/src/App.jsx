import { useEffect } from "react";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Filter from "./components/Filter";
import { useAnecdoteActions , useNotification} from "./store";
import Notification from "./components/Notification";

const App = () => {
  const { initialize } = useAnecdoteActions();
  const { notificationData } = useNotification();
  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <div>
      {notificationData.visible && <Notification message={notificationData.message} />}
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App
