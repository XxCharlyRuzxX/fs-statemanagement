import useAnecdotes from "../hooks/useAnecdotes";
import useNotification from "../hooks/useNotification";

const AnecdoteForm = () => {
  const { addAnecdote } = useAnecdotes();
  const { setNotification } = useNotification();

  const onCreate = async (event) => {
    try {
      event.preventDefault();
      const content = event.target.anecdote.value;
      await addAnecdote(content);
      event.target.reset();
      setNotification(`You created a new anecdote: ${content}`, true);
    } catch (error) {
      setNotification(error.message, true);
    }
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
