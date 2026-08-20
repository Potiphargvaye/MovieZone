/**
 * Very small in-memory store for the active booking flow (selected date,
 * time, and seats). Expo Router screens are plain functions re-mounted on
 * navigation, so passing this much state through URL params would be messy -
 * a tiny module-level store is simpler and is reset whenever a new seat
 * selection flow starts.
 */

import { useSyncExternalStore } from 'react';

export type BookingState = {
  movieId: string | null;
  date: string;
  time: string;
  seats: string[];
};

let state: BookingState = {
  movieId: null,
  date: '',
  time: '',
  seats: [],
};

const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

export const bookingStore = {
  start(movieId: string, date: string, time: string) {
    state = { movieId, date, time, seats: [] };
    emit();
  },
  toggleSeat(seatId: string) {
    const seats = state.seats.includes(seatId)
      ? state.seats.filter((s) => s !== seatId)
      : [...state.seats, seatId];
    state = { ...state, seats };
    emit();
  },
  reset() {
    state = { movieId: null, date: '', time: '', seats: [] };
    emit();
  },
  get() {
    return state;
  },
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
};

export function useBookingState() {
  return useSyncExternalStore(bookingStore.subscribe, bookingStore.get);
}
