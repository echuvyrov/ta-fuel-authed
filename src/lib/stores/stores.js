import { writable, derived } from 'svelte/store'

export const currentDate = writable(new Date().toString().split('T')[0])
export const isAuthenticated = writable(false);
export const user = writable({});
export const popupOpen = writable(false);
export const error = writable();
