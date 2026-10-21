import { useAnecdoteActions, useNotification } from "../store";

const AnecdoteForm = () => {
  const { setNotification } = useNotification();
  const { add } = useAnecdoteActions();

  const handlerAdd = async (e) => {
    e.preventDefault()
    const newAnecdote = e.target.anecdote.value
    try{
        await add(newAnecdote)
        setNotification("You anecdote " + newAnecdote + " has been added")
    }catch(error) {
        setNotification(error.message)
    }
    e.target.reset()
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handlerAdd}>
        <div>
          <input data-testid="new" name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default AnecdoteForm