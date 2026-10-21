import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import anecdotesService from "../services/anecdotes";

const useAnecdotes = () => {
  const queryClient = useQueryClient();

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: anecdotesService.getAll,
    refetchOnWindowFocus: false,
  });

  const newNoteMutation = useMutation({
    mutationFn: anecdotesService.createNew,
    onSuccess: (newNote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(["anecdotes"], anecdotes.concat(newNote));
    },
  });

  const updateNoteMutation = useMutation({
    mutationFn: anecdotesService.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
    },
  });

  return {
    anecdotes: result.data,
    isPending: result.isPending,
    isError: result.isError,
    addAnecdote: (content) => newNoteMutation.mutate({ content }),
    updateAnecdote: (anecdote) =>
      updateNoteMutation.mutate({
        ...anecdote,
        votes: anecdote.votes + 1,
      }),
  };
};

export default useAnecdotes;
