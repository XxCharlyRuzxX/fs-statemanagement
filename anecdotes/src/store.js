import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";
import anecdoteService from "./services/anecdotes";

const useAnecdoteStore = create((set, get) => ({
  anecdotes: [],
  filter: "",
  actions: {
    add: async (newAnecdote) => {
      const createdAnecdote = await anecdoteService.createNew(newAnecdote);
      set((state) => ({
        anecdotes: [...state.anecdotes, createdAnecdote],
      }));
    },

    vote: async (id) => {
      const { anecdotes } = get();
      const anecdoteToUpdate = anecdotes.find((anecdote) => anecdote.id === id);

      if (!anecdoteToUpdate) return;

      const updatedAnecdote = await anecdoteService.update(id, {
        ...anecdoteToUpdate,
        votes: anecdoteToUpdate.votes + 1,
      });

      set((state) => ({
        anecdotes: state.anecdotes.map((anecdote) =>
          anecdote.id === id ? updatedAnecdote : anecdote,
        ),
      }));
    },

    remove: async (id) => {
      await anecdoteService.deleteAnecdote(id);
      set((state) => ({
        anecdotes: state.anecdotes.filter((anecdote) => anecdote.id !== id),
      }));
    },

    setFilter: (filter) => set({ filter }),

    initialize: async () => {
      const anecdotes = await anecdoteService.getAll();
      set({ anecdotes });
    },
  },

  notification: {
    notificationData: {
      message: "",
      visible: false,
    },
    setNotification: (message) => {
      set((state) => ({
        notification: {
          ...state.notification,
          notificationData: { message, visible: true },
        },
      }));

      setTimeout(() => {
        set((state) => ({
          notification: {
            ...state.notification,
            notificationData: { message: "", visible: false },
          },
        }));
      }, 5000);
    },
  },
}));

export const useAnecdotes = () =>
  useAnecdoteStore(
    useShallow((state) =>
      state.anecdotes
        .filter((anecdote) =>
          anecdote.content.toLowerCase().includes(state.filter.toLowerCase()),
        )
        .toSorted((a, b) => b.votes - a.votes),
    ),
  );

export const useFilter = () => useAnecdoteStore((state) => state.filter);
export const useAnecdoteActions = () =>
  useAnecdoteStore((state) => state.actions);
export const useNotification = () =>
  useAnecdoteStore((state) => state.notification);
