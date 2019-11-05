export const MAX_MS = process.env.NODE_ENV === "production" ? 3e5 : 5e3;
export const TICK_RATE_MS = 100;
export const TYPING_DEBOUNCE = 1500;
export const PLACEHOLDER = `
Taking five minutes of your day to write about personal challenges can help to relieve stress. This is a notepad optimized for writing a stream of consciousness.

- Backspacing is disabled.
- Selecting text is disabled.
- Spellcheck is disabled.
- After five minutes of typing, the input is disabled.

This webpage does not track or save anything.

What is on your mind?
`.trim();
