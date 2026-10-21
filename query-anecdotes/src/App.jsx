import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import useAnecdotes from "./hooks/useAnecdotes";

const App = () => {
  const { anecdotes, isPending, updateAnecdote, isError } = useAnecdotes();
  const handleVote = async (anecdote) => {
    updateAnecdote(anecdote);
  };

  if (isError) {
    return (
      <Notification message="anecdote service not available due to problems in server" />
    );
  }

  if (isPending) {
    return <Notification message="loading data..." />;
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
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
