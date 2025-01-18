import { 
  attach,
  createEvent,
  createStore,
  sample,
} from 'effector';
import { reset } from 'patronum';
import { format } from 'date-fns';

import * as api from './activitiesApi';
import { IActivity } from '@/interfaces/activities';

const getActivitiesFx = attach({ effect: api.getActivitiesFx });

export const activitiesPageMounted = createEvent<void>();
export const activitiesPageUnmounted = createEvent<void>();

export const $activities = createStore<IActivity[]>([]);
export const $isLoading = getActivitiesFx.pending;
export const $isError = createStore<boolean>(false);

reset({
  clock: [activitiesPageUnmounted],
  target: [
    $activities,
    $isError,
  ],
});

sample({
  clock: activitiesPageMounted,
  target: getActivitiesFx,
});

sample({
  clock: getActivitiesFx.doneData,
  filter: (result) => Boolean(result.act && result.act.length && result.people),
  fn: (result) => result.act.map((activity) => ({
    ...activity,
    origin: activity.origin && format(activity.origin, 'dd.MM.yyyy'),
    start: activity.start && format(activity.start, 'dd.MM.yyyy'),
    final_plan: activity.final_plan && format(activity.final_plan, 'dd.MM.yyyy'),
    final_fact: activity.final_fact && format(activity.final_fact, 'dd.MM.yyyy'),
    responsible1: result.people[activity.responsible1],
    responsible2: result.people[activity.responsible2],
  })),
  target: $activities,
});

$isError.on(getActivitiesFx.failData, (_, error) => Boolean(error));