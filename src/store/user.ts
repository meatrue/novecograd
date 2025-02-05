import { 
  attach,
  combine,
  createEvent,
  createStore,
  sample,
  Store,
} from 'effector';
import { not, or, reset } from 'patronum';
import { format } from 'date-fns';

import * as api from './userApi';
import { IS_MEMBER_OF_COOPERATIVE, IUserInfo } from '@/interfaces/user';
import { IUserInfoResponse } from '@/interfaces/backendResponse';
import { isValidDate } from '@/utils/common';
import { IActivity } from '@/interfaces/activities';

const SUCCESS_MESSAGE = 'Ваши данные обновлены!';
const INCORRECT_DATE_FORMAT_MESSAGE = 'Неверный формат даты (нужно дд.мм.гггг)';
const REQUIRED_FIELD_MESSAGE = 'Обязательное поле';
const FORM_SUBMIT_ERROR_MESSAGE = 'Форма заполнена некорректно';

const mapUserInfoFields = (user: IUserInfoResponse): IUserInfo => ({
  peopleId: user.people_id,
  firstName: user.first_name,
  secondName: user.second_name,
  lastName: user.last_name,
  birth: user.burth && format(user.burth, 'dd.MM.yyyy'),
  family: user.family,
  activities: user.activities,
  contacts: user.contacts,
  location: user.location,
  from: user.from && format(user.from, 'dd.MM.yyyy'),
  land: user.land,
  member: user.member
    ? IS_MEMBER_OF_COOPERATIVE.YES
    : IS_MEMBER_OF_COOPERATIVE.NO,
  role: user.role,
  skills: user.skills,
});

const getUserInfoFx = attach({ effect: api.getUserInfoFx });
const changeUserInfoFx = attach({ effect: api.changeUserInfoFx });

export const personalAccountPageMounted = createEvent<void>();
export const personalAccountPageUnmounted = createEvent<void>();
export const modeChanged = createEvent<void>();
export const accountChangesСancelled = createEvent<void>();
export const accountChangesSubmitted = createEvent<void>();
export const messagesClosed = createEvent<void>();

export const userSecondNameChanged = createEvent<string>();
export const userBirthChanged = createEvent<string>();
export const userFamilyChanged = createEvent<string>();
export const userContactsChanged = createEvent<string>();
export const userLocationChanged = createEvent<string>();
export const userFromChanged = createEvent<string>();
export const userSkillsChanged = createEvent<string>();

export const $isEditMode = createStore<boolean>(false);
$isEditMode.on(modeChanged, (mode) => !mode);

export const $accountFormMessageSuccess = createStore<string>('');
export const $accountFormMessageFail = createStore<string>('');

export const $userInfo = createStore<IUserInfo | null>(null);
export const $isUserInfoLoading = getUserInfoFx.pending;
export const $isUserInfoError = createStore<boolean>(false);
export const $isUserInfoSending = changeUserInfoFx.pending;

export const $userFirstName = $userInfo.map((user) => user?.firstName ?? '');

export const $userSecondName = createStore<string>('')
  .on($userInfo, (_, user) => user?.secondName ?? '')
  .on(userSecondNameChanged, (_, secondName) => secondName);

export const $userLastName = $userInfo.map((user) => user?.lastName ?? '');

export const $userBirth = createStore<string>('')
  .on($userInfo, (_, user) => user?.birth ?? '')
  .on(userBirthChanged, (_, birth) => birth);
export const $userBirthErrorMessage = createStore<string>('');
$userBirthErrorMessage.reset([userBirthChanged, accountChangesСancelled]);

export const $userFamily = createStore<string>('')
  .on($userInfo, (_, user) => user?.family ?? '')
  .on(userFamilyChanged, (_, family) => family);

export const $userContacts = createStore<string>('')
  .on($userInfo, (_, user) => user?.contacts ?? '')
  .on(userContactsChanged, (_, contacts) => contacts);

export const $userLocation = createStore<string>('')
  .on($userInfo, (_, user) => user?.location ?? '')
  .on(userLocationChanged, (_, location) => location);

export const $userFrom = createStore<string>('')
  .on($userInfo, (_, user) => user?.from ?? '')
  .on(userFromChanged, (_, from) => from);
export const $userFromErrorMessage = createStore<string>('');
$userFromErrorMessage.reset([userFromChanged, accountChangesСancelled]);

export const $userLand = createStore<number>(0)
  .on($userInfo, (_, user) => user?.land ?? 0);

export const $userMember = $userInfo.map(
  (user) => user?.member
    ? IS_MEMBER_OF_COOPERATIVE.YES
    : IS_MEMBER_OF_COOPERATIVE.NO
);

export const $userRole = $userInfo.map((user) => user?.role ?? '');

export const $userSkills = createStore<string>('')
  .on($userInfo, (_, user) => user?.skills ?? '')
  .on(userSkillsChanged, (_, skills) => skills);

export const $userActivities = createStore<IActivity[]>([])
  .on($userInfo, (_, user) => (
    user?.activities
      ? user.activities.map((activity) => ({
        ...activity,
        origin: activity.origin && format(activity.origin, 'dd.MM.yyyy'),
        start: activity.start && format(activity.start, 'dd.MM.yyyy'),
        final_plan: activity.final_plan && format(activity.final_plan, 'dd.MM.yyyy'),
        final_fact: activity.final_fact && format(activity.final_fact, 'dd.MM.yyyy'),
      }))
      : []
  ));

export const $formSubmitErrorMessage = combine(
  {
    birthErrorMessage: $userBirthErrorMessage,
    fromErrorMessage: $userFromErrorMessage,
  },
  ({ birthErrorMessage, fromErrorMessage }) => (
    (birthErrorMessage || fromErrorMessage) ? FORM_SUBMIT_ERROR_MESSAGE : ''
  )
);

export const $isAccountFieldsChanged: Store<boolean> = combine(
  {
    userInfo: $userInfo,
    userSecondName: $userSecondName,
    userBirth: $userBirth,
    userFamily: $userFamily,
    userContacts: $userContacts,
    userLocation: $userLocation,
    userFrom: $userFrom,
    userSkills: $userSkills,
  },
  (
    {
      userInfo,
      userSecondName,
      userBirth,
      userFamily,
      userContacts,
      userLocation,
      userFrom,
      userSkills,
    }
  ) => {
    if (!userInfo) return false;
    const {
      secondName,
      birth,
      family,
      contacts,
      location,
      from,
      skills,
    } = userInfo;
    return !(
      (secondName === userSecondName.trim()) &&
      (birth === userBirth.trim()) &&
      (family === userFamily.trim()) &&
      (contacts === userContacts.trim()) &&
      (location === userLocation.trim()) &&
      (from === userFrom.trim()) &&
      (skills === userSkills.trim())
    );
  }
);
export const $isAccountFormDisabled = or($isUserInfoLoading, $isUserInfoSending);
export const $isAccountFormButtonsDisabled = or($isAccountFormDisabled, not($isAccountFieldsChanged));

reset({
  clock: [personalAccountPageUnmounted],
  target: [
    $isEditMode,
    $userInfo,
    $isUserInfoError,
    $accountFormMessageSuccess,
    $accountFormMessageFail,
    $userBirthErrorMessage,
    $userFromErrorMessage,
  ],
});

reset({
  clock: [messagesClosed],
  target: [
    $accountFormMessageSuccess,
    $accountFormMessageFail,
  ],
});

reset({
  clock: [modeChanged],
  target: [
    $userBirthErrorMessage,
    $userFromErrorMessage,
  ],
});

sample({
  clock: personalAccountPageMounted,
  target: getUserInfoFx,
});

sample({
  clock: getUserInfoFx.doneData,
  filter: (result) => result.message !== 'Вы вышли из своей учетной записи' && result.showpage,
  fn: mapUserInfoFields,
  target: $userInfo,
});

$isUserInfoError.on(getUserInfoFx.failData, (_, error) => Boolean(error));

sample({
  clock: accountChangesСancelled,
  source: $userInfo.map((user) => user?.secondName ?? ''),
  target: $userSecondName,
});

sample({
  clock: accountChangesСancelled,
  source: $userInfo.map((user) => user?.birth ?? ''),
  target: $userBirth,
});

sample({
  clock: accountChangesСancelled,
  source: $userInfo.map((user) => user?.family ?? ''),
  target: $userFamily,
});

sample({
  clock: accountChangesСancelled,
  source: $userInfo.map((user) => user?.contacts ?? ''),
  target: $userContacts,
});

sample({
  clock: accountChangesСancelled,
  source: $userInfo.map((user) => user?.location ?? ''),
  target: $userLocation,
});

sample({
  clock: accountChangesСancelled,
  source: $userInfo.map((user) => user?.from ?? ''),
  target: $userFrom,
});

sample({
  clock: accountChangesСancelled,
  source: $userInfo.map((user) => user?.skills ?? ''),
  target: $userSkills,
});

sample({
  clock: accountChangesSubmitted,
  source: {
    region: $userLocation,
    entry: $userFrom,
    birth: $userBirth,
    family: $userFamily,
    skills: $userSkills,
    contacts: $userContacts,
    second_name: $userSecondName,
  },
  filter: ({ entry, birth }) =>  isValidDate(entry) && isValidDate(birth),
  target: changeUserInfoFx,
});

sample({
  clock: accountChangesSubmitted,
  source: $userBirth,
  fn: (birth) => {
    if (!birth) {
      return REQUIRED_FIELD_MESSAGE;
    }
    if (!isValidDate(birth)) {
      return INCORRECT_DATE_FORMAT_MESSAGE;
    }
    return '';
  },
  target: $userBirthErrorMessage,
});

sample({
  clock: accountChangesSubmitted,
  source: $userFrom,
  fn: (from) => {
    if (!from) {
      return REQUIRED_FIELD_MESSAGE;
    }
    if (!isValidDate(from)) {
      return INCORRECT_DATE_FORMAT_MESSAGE;
    }
    return '';
  },
  target: $userFromErrorMessage,
});

sample({
  clock: [$userBirthErrorMessage, $userFromErrorMessage],
  fn: ([birthErrorMessage, fromErrorMessage]) => {
    if (birthErrorMessage || fromErrorMessage) {
      return FORM_SUBMIT_ERROR_MESSAGE;
    }
    return '';
  },
  target: $accountFormMessageFail,
});

sample({
  clock: changeUserInfoFx.doneData,
  filter: (result) => result.message === SUCCESS_MESSAGE,
  fn: mapUserInfoFields,
  target: $userInfo,
});

sample({
  clock: changeUserInfoFx.doneData,
  filter: (result) => result.message === SUCCESS_MESSAGE,
  fn: () => SUCCESS_MESSAGE,
  target: $accountFormMessageSuccess,
});

sample({
  clock: changeUserInfoFx.doneData,
  filter: (result) => result.message !== SUCCESS_MESSAGE,
  fn: (result) => result.message,
  target: $accountFormMessageFail,
});

$isUserInfoError.on(changeUserInfoFx.failData, (_, error) => Boolean(error));
