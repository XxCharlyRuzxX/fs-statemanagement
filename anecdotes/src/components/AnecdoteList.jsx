import { useAnecdoteActions, useAnecdotes, useNotification } from "../store";

const AnecdoteList = () => {
  const anecdotes = useAnecdotes();
  const { vote, remove } = useAnecdoteActions();
  const { setNotification } = useNotification();

  const handlerVote = async (id) => {
    try{
      await vote(id)
      setNotification(`you voted '${anecdotes.find((anecdote) => anecdote.id === id).content}'`);
    }catch(error){
      setNotification(error.message)
    }
  }

  const handlerRemove = async (id) => {
    try {
      await remove(id);
      setNotification("Anecdote removed");
    } catch (error) {
      setNotification(error.message);
    }
  };

  return (
      <>
      {anecdotes.map((anecdote) => (
          <div key={anecdote.id}>
                <div>{anecdote.content}</div>
                <div>
                  has {anecdote.votes}
                  <button type="button" onClick={() => handlerVote(anecdote.id)}>vote</button>
                </div>
                {anecdote.votes === 0 && (
                  <button type="button" onClick={() => handlerRemove(anecdote.id)}>delete</button>
                )}
              </div>
            ))}
      </>
  )
}

export default AnecdoteList
