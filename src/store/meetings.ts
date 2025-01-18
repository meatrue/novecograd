import { 
  attach,
  createEvent,
  createStore,
  sample,
} from 'effector';
import { not, or, reset } from 'patronum';

import * as api from './meetingsApi';
import { IComboboxOption } from '@/interfaces/utils';
import { IMeetingProtocol, IProtocolThemes } from '@/interfaces/meetings';

const getMeetingsFx = attach({ effect: api.getMeetingsFx });
const getMeetingProtocolFx = attach({ effect: api.getMeetingProtocolFx });
const getProtocolThemesFx = attach({ effect: api.getProtocolThemesFx });

export const meetingsPageMounted = createEvent<void>();
export const meetingsPageUnmounted = createEvent<void>();

export const meetingChanged = createEvent<IComboboxOption>();
export const protocolLoaded = createEvent<string>();
export const protocolThemeTextChanged = createEvent<string>();
export const protocolThemesLoaded = createEvent<string>();

export const $meetings = createStore<string[]>([]);
export const $isMeetingsLoading = getMeetingsFx.pending;
export const $isMeetingsError = createStore<boolean>(false);

export const $selectedMeeting = createStore<IComboboxOption | null>(null);
$selectedMeeting.on(meetingChanged, (_, newValue) => newValue);
export const $selectedProtocol = createStore<IMeetingProtocol | null>(null);
export const $isProtocolLoading = getMeetingProtocolFx.pending;
export const $isProtocolError = createStore<boolean>(false);

export const $protocolThemeText = createStore<string>('');
$protocolThemeText.on(protocolThemeTextChanged, (_, text) => text);
export const $protocolThemes = createStore<IProtocolThemes | null>(null);
export const $isProtocolThemesLoading = getProtocolThemesFx.pending;
export const $isProtocolThemesError = createStore<boolean>(false);

export const $protocolOutputDataType = createStore<'protocol' | 'themes' | null>(null);
$protocolOutputDataType.on(protocolLoaded, () => 'protocol');
$protocolOutputDataType.on(protocolThemesLoaded, () => 'themes');

export const $isMeetingsFormsDisabled = or(
  $isProtocolLoading,
  $isProtocolThemesLoading,
);
export const $isGetProtocolButtonDisabled = or(
  $isMeetingsFormsDisabled,
  not($selectedMeeting),
);
export const $isSearchThemesButtonDisabled = or(
  $isMeetingsFormsDisabled,
  not($protocolThemeText),
);

reset({
  clock: [meetingsPageUnmounted],
  target: [
    $meetings,
    $isMeetingsError,
    $selectedMeeting,
    $selectedProtocol,
    $isProtocolError,
    $protocolThemeText,
    $protocolThemes,
    $isProtocolThemesError,
    $protocolOutputDataType
  ],
});

$selectedProtocol.reset(protocolThemesLoaded);
$protocolThemes.reset(protocolLoaded);

sample({
  clock: meetingsPageMounted,
  target: getMeetingsFx,
});

sample({
  clock: getMeetingsFx.doneData,
  filter: (result) => Boolean(result?.mtng?.length),
  fn: ({ mtng }) => mtng,
  target: $meetings,
});

$isMeetingsError.on(getMeetingsFx.failData, (_, error) => Boolean(error));

sample({
  clock: protocolLoaded,
  filter: (meetingName) => Boolean(meetingName),
  fn: (meetingName) => ({ meeting_selected: meetingName }),
  target: getMeetingProtocolFx,
});

sample({
  clock: getMeetingProtocolFx.doneData,
  filter: (result) => Boolean(result?.data && result?.people),
  fn: ({ data, people }) => ({
    points: data.map(({ theme, description, author_id }) => ({
      theme,
      description,
      author: people[author_id],
    })),
  }),
  target: $selectedProtocol,
});

$isProtocolError.on(getMeetingProtocolFx.failData, (_, error) => Boolean(error));

sample({
  clock: protocolThemesLoaded,
  filter: (searchText) => Boolean(searchText),
  fn: (searchText) => ({ search: searchText }),
  target: getProtocolThemesFx,
});

sample({
  clock: getProtocolThemesFx.doneData,
  filter: (result) => Boolean(result?.founded),
  fn: ({ founded, people }) => ({
    protocols: founded.map(( { themes, descriptions, authors, founded_name } ) => ({
      name: founded_name,
      themes,
      descriptions,
      authors: authors.map((authorId) => people[authorId]),
    })),
  }),
  target: $protocolThemes,
});

$isProtocolThemesError.on(getProtocolThemesFx.failData, (_, error) => Boolean(error));
