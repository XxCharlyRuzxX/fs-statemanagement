const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await fetch(baseUrl);
  if (!response.ok) {
    throw new Error("Failed to fetch anecdotes");
  }
  const data = await response.json();
  return data;
};

const createNew = async (content) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(content),
  };

  const response = await fetch(baseUrl, options);
  if (!response.ok) {
    throw new Error("Failed to create note");
  }

  return await response.json();
};

const update = async (newObject) => {
  const options = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newObject),
  };

  const response = await fetch(`${baseUrl}/${newObject.id}`, options);
  if (!response.ok) {
    throw new Error("Failed to update note");
  }

  return await response.json();
};

const deleteAnecdote = async (id) => {
  const getResponse = await fetch(`${baseUrl}/${id}`);
  if (!getResponse.ok) {
    throw new Error("Failed to fetch note for deletion check");
  }
  const noteToDelete = await getResponse.json();

  if (noteToDelete.votes > 0) {
    throw new Error("Cannot delete anecdote with votes");
  }

  const options = {
    method: "DELETE",
  };

  const response = await fetch(`${baseUrl}/${id}`, options);
  if (!response.ok) {
    throw new Error("Failed to delete note");
  }
  return await response.json();
};

export default { getAll, createNew, update, deleteAnecdote };
