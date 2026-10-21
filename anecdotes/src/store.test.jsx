// @vitest-environment jsdom
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import App from "./App";
import anecdoteService from "./services/anecdotes";

vi.mock("./services/anecdotes", () => ({
  default: {
    getAll: vi.fn(),
    update: vi.fn(),
  },
}));

const baseAnecdotes = [
  { content: "Make it work, then make it fast", id: "5", votes: 0 },
  { content: "There are two hard things in computer science", id: "4", votes: 1 },
  { content: "Untested code is broken code", id: "3", votes: 3 },
  { content: "Simplicity is the ultimate sophistication", id: "2", votes: 5 },
  { content: "Real artists ship code", id: "1", votes: 7 },
];

let initialAnecdotes;
let testRun = 0;

const renderApp = async () => {
  render(<App />);
  const filter = screen.getByTestId("filter");
  fireEvent.change(filter, { target: { value: "reset" } });
  fireEvent.change(filter, { target: { value: "" } });
  await screen.findByText(initialAnecdotes[0].content, { exact: true });
};

const anecdoteBlock = (content) =>
  screen.getByText(content, { exact: true }).parentElement;

afterEach(() => {
  cleanup();
});

beforeEach(() => {
  testRun += 1;
  initialAnecdotes = baseAnecdotes.map((anecdote) => ({
    ...anecdote,
    content: `${anecdote.content} ${testRun}`,
  }));
  vi.clearAllMocks();
  anecdoteService.getAll.mockResolvedValue(initialAnecdotes);
  anecdoteService.update.mockImplementation(async (_id, anecdote) => anecdote);
});

it("initializes the store with anecdotes returned by the API service", async () => {
  await renderApp();

  expect(anecdoteService.getAll).toHaveBeenCalledOnce();
  for (const { content, votes } of initialAnecdotes) {
    expect(anecdoteBlock(content).textContent).toContain(`has ${votes}`);
  }
});

it("renders anecdotes in descending order by votes", async () => {
  await renderApp();

  const displayedContents = screen
    .getAllByRole("button", { name: "vote" })
    .map((button) => button.parentElement.parentElement.firstElementChild.textContent);

  expect(displayedContents).toEqual(
    [...initialAnecdotes]
      .sort((a, b) => b.votes - a.votes)
      .map((anecdote) => anecdote.content),
  );
});

it("filters anecdotes by the text entered in the filter", async () => {
  await renderApp();
  fireEvent.change(screen.getByTestId("filter"), { target: { value: "code" } });

  expect(
    screen.getByText(`${baseAnecdotes[4].content} ${testRun}`, { exact: true }),
  ).toBeTruthy();
  expect(
    screen.getByText(`${baseAnecdotes[2].content} ${testRun}`, { exact: true }),
  ).toBeTruthy();
  expect(
    screen.queryByText(`${baseAnecdotes[3].content} ${testRun}`, { exact: true }),
  ).toBeNull();
});

it("increments the displayed vote count when an anecdote is voted for", async () => {
  await renderApp();
  const content = initialAnecdotes[0].content;

  fireEvent.click(within(anecdoteBlock(content)).getByRole("button", { name: "vote" }));

  await waitFor(() => {
    expect(anecdoteBlock(content).textContent).toContain("has 1");
  });
  expect(anecdoteService.update).toHaveBeenCalledWith("5", {
    ...initialAnecdotes[0],
    votes: 1,
  });
});
