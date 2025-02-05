import { 
  attach,
  createEvent,
  createStore,
  sample,
} from 'effector';
import { reset } from 'patronum';

import * as api from './surveysApi';
import { ISurvey, ISurveyVoted } from '@/interfaces/surveys';

const getSurveysFx = attach({ effect: api.getSurveysFx });

export const surveysPageMounted = createEvent<void>();
export const surveysPageUnmounted = createEvent<void>();
export const surveysUpdated = createEvent<void>();

export const $surveys = createStore<ISurvey[]>([]);
export const $surveysVoted = createStore<ISurveyVoted[]>([]);
export const $isSurveysLoading = getSurveysFx.pending;
export const $isSurveysError = createStore<boolean>(false);

reset({
  clock: [surveysPageUnmounted],
  target: [
    $surveys,
    $surveysVoted,
    $isSurveysError,
  ],
});

sample({
  clock: surveysPageMounted,
  target: getSurveysFx,
});

sample({
  clock: surveysUpdated,
  target: getSurveysFx,
});

sample({
  clock: getSurveysFx.doneData,
  filter: (result) => Boolean(result?.surv),
  fn: (result) => (
    result.surv.map((survey) => ({
      id: survey.id,
      title: survey.title,
      date: survey.date,
      options: survey.options,
    }))
  ),
  target: $surveys,
});

sample({
  clock: getSurveysFx.doneData,
  filter: (result) => Boolean(result?.votes?.length && result?.options?.length),
  fn: (result) => {
    const { options, votes } = result;

    return votes.map((survey, surveyIndex) => ({
      id: survey.id,
      title: survey.title,
      options: options[surveyIndex].map((optionValue, optionIndex) => ({
        value: String(optionValue),
        votes: Number(survey.votes[optionIndex]),
      })),
    }));
  },
  target: $surveysVoted,
});

$isSurveysError.on(getSurveysFx.failData, (_, error) => Boolean(error));
