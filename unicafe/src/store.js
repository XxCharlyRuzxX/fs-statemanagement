import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";

const useCounterFeedbackStore = create((set) => ({
  counter: 0,
  goodCount: 0,
  neutralCount: 0,
  badCount: 0,
  actions: {
    incrementGoodCount: () =>
      set((state) => ({
        counter: state.counter + 1,
        goodCount: state.goodCount + 1,
      })),
    incrementNeutralCount: () =>
      set((state) => ({
        counter: state.counter + 1,
        neutralCount: state.neutralCount + 1,
      })),
    incrementBadCount: () =>
      set((state) => ({
        counter: state.counter + 1,
        badCount: state.badCount + 1,
      })),
  },
}));

export const useCounterFeedbackValues = () =>
  useCounterFeedbackStore(
    useShallow((state) => ({
      counter: state.counter,
      goodCount: state.goodCount,
      neutralCount: state.neutralCount,
      badCount: state.badCount,
    })),
  );

export const useCounterFeedBackControls = () =>
  useCounterFeedbackStore((state) => state.actions);
