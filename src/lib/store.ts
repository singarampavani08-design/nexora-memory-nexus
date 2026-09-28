import { useSyncExternalStore } from "react";
import { seedContacts, seedMeetings, seedMemories } from "./seed";
import type { Brief, Contact, Meeting, Memory } from "./types";

export interface AppState {
  contacts: Contact[];
  meetings: Meeting[];
  memories: Memory[];
  briefs: Brief[];
}

const KEY = "nexora-memory-v1";
const seed: AppState = { contacts: seedContacts, meetings: seedMeetings, memories: seedMemories, briefs: [] };
let state: AppState | null = null;
const listeners = new Set<() => void>();

function ensure(): AppState {
  if (state) return state;
  try {
    const raw = localStorage.getItem(KEY);
    state = raw ? (JSON.parse(raw) as AppState) : seed;
  } catch {
    state = seed;
  }
  return state;
}

export function getState(): AppState {
  return typeof window === "undefined" ? seed : ensure();
}

export function setState(fn: (s: AppState) => AppState) {
  state = fn(ensure());
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* ignore */
  }
  listeners.forEach((l) => l());
}

export function resetState() {
  setState(() => seed);
}

export function useAppState(): AppState {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    ensure,
    () => seed,
  );
}
