import { createEvent, createStore } from 'effector';

export const appLoaded = createEvent<void>();

export const $isAppLoaded = createStore<boolean>(false);
$isAppLoaded.on(appLoaded, () => true);
