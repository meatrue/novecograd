import { 
  attach,
  createEvent,
  createStore,
  sample,
} from 'effector';
import { reset } from 'patronum';

import * as api from './documentsApi';
import { IDocument } from '@/interfaces/documents';

const getDocumentsFx = attach({ effect: api.getDocumentsFx });

export const documentsPageMounted = createEvent<void>();
export const documentsPageUnmounted = createEvent<void>();

export const $documents = createStore<IDocument[]>([]);
export const $isDocumentsLoading = getDocumentsFx.pending;
export const $isDocumentsError = createStore<boolean>(false);

reset({
  clock: [documentsPageUnmounted],
  target: [
    $documents,
    $isDocumentsError,
  ],
});

sample({
  clock: documentsPageMounted,
  target: getDocumentsFx,
});

sample({
  clock: getDocumentsFx.doneData,
  filter: (result) => Boolean(result.data),
  fn: (result) => result.data,
  target: $documents,
});

$isDocumentsError.on(getDocumentsFx.failData, (_, error) => Boolean(error));