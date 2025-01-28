import { 
  attach,
  createEvent,
  createStore,
  sample,
} from 'effector';
import { every, not, or, and, reset } from 'patronum';

import { IUser } from '@/interfaces/user';
import * as api from '@/store/authorizationApi';
import {
  isEmpty,
  isPasswordValid,
  isUsernameValid
} from '@/utils/authorization';
import { appLoaded } from '@/store/app';

// Внешний эффект заворачиваем, чтобы пользоваться им локально.
// Для того, чтобы состояния в этом сторе менялись только при использовании локального эффекта из этого стора.
const getMeFx = attach({ effect: api.getMeFx });
const authorizeFx = attach({ effect: api.authorizeFx });
const unAuthorizeFx = attach({ effect: api.unAuthorizeFx });

export const formMounted = createEvent<void>();
export const formReseted = createEvent<void>();

export const usernameChanged = createEvent<string>();
export const passwordChanged = createEvent<string>();
export const formSubmitted = createEvent<void>();
export const errorReseted = createEvent<void>();
export const authMessageClosed = createEvent<void>();
export const authorizationReseted = createEvent<void>();

export const $isUserInitializationLoading = getMeFx.pending;

export const $username = createStore<string>('');
export const $usernameError = createStore<null | 'empty' | 'invalid'>(null);

export const $password = createStore<string>('');
export const $passwordError = createStore<null | 'empty' | 'invalid'>(null);

export const $isLoading = authorizeFx.pending;
export const $isError = createStore<boolean>(false);
export const $formDisabled = createStore<boolean>(false);
export const $formIsValid = every({
  stores: [$usernameError, $passwordError],
  predicate: null,
});

export const $authMessage = createStore<string>('');
export const $authData = createStore<IUser | null>(null);
export const $isAuthorized = $authData.map((authData) => Boolean(authData?.username));

export const $isUnAuthorizeLoading = unAuthorizeFx.pending;

reset({
  clock: [formMounted, formReseted],
  target: [
    $username,
    $usernameError,
    $password,
    $passwordError,
    $isError,
    $authMessage,
  ],
});

$authMessage.reset(authMessageClosed);
$authData.reset(unAuthorizeFx.doneData);

sample({
  clock: appLoaded,
  target: getMeFx,
});

$formDisabled.on($isLoading, (_, isLoading) => isLoading);
export const $submitDisabled = or(not($username), not($password), $formDisabled);

$username.on(usernameChanged, (_, username) => username);
$password.on(passwordChanged, (_, password) => password);

sample({
  clock: formSubmitted,
  source: $username,
  fn: (username) => {
    if (isEmpty(username)) return 'empty';
    if (!isUsernameValid(username)) return 'invalid';
    return null;
  },
  target: $usernameError,
});

sample({
  clock: formSubmitted,
  source: $password,
  fn: (password) => {
    if (isEmpty(password)) return 'empty';
    if (!isPasswordValid(password)) return 'invalid';
    return null;
  },
  target: $passwordError,
});

sample({
  clock: formSubmitted,
  source: { username: $username, password: $password },
  filter: and(not($formDisabled), $formIsValid),
  target: authorizeFx,
});

$isError.on(authorizeFx.failData, (_, error) => Boolean(error));
$isError.reset(errorReseted);

sample({
  clock: [authorizeFx.doneData, getMeFx.doneData],
  filter: (result) => Boolean(result?.user),
  fn: (result) => result.user as IUser,
  target: $authData,
});

sample({
  clock: authorizeFx.doneData,
  fn: (result) => result.message,
  target: $authMessage,
});

sample({
  clock: authorizationReseted,
  fn: () => ({ logoff: true }),
  target: unAuthorizeFx,
});

