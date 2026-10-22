import { useEffect } from "react";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import useAnecdotes from "./hooks/useAnecdotes";
import useNotification from "./hooks/useNotification";

const App = () => {
  const { anecdotes, isPending, updateAnecdote, isError } = useAnecdotes();
  const { message, isVisible, setNotification } = useNotification();

  const handleVote = async (anecdote) => {
    try {
      updateAnecdote(anecdote);
      setNotification(`You voted for: ${anecdote.content}`, true);
    } catch (error) {
      setNotification(error.message, true);
    }
  };

  useEffect(() => {
    if (isError) {
      setNotification(
        "anecdote service not available due to problems in server",
        true,
      );
    }
  }, [isError, setNotification]);

  if (isError) {
    return <Notification message={message} isVisible={isVisible} />;
  }

  if (isPending) {
    return <p>Loading anecdotes...</p>;
  }

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification message={message} isVisible={isVisible} />
      <AnecdoteForm />
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button type="button" onClick={() => handleVote(anecdote)}>
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
