import React from 'react';
import { useUnit } from 'effector-react';
import clsx from 'clsx';

import { Button } from '@/components/ui-kit';
import {
  $isAddedSuccessfully,
  $isAddingProposalError,
  $isNewProposalAdding,
  $newProposal,
  $proposalAddedMessage,
  $submitDisabled,
  proposalAdded,
  proposalAddedMessageReseted,
  proposalChanged
} from '@/store/proposals';

export const AddProposalForm: React.FC = () => {
  const [
    newProposal,
    isSuccess,
    message,
    isLoading,
    isError,
    submitDisabled,
    addProposal,
    changeProposal,
    resetMessage,
  ] = useUnit([
    $newProposal,
    $isAddedSuccessfully,
    $proposalAddedMessage,
    $isNewProposalAdding,
    $isAddingProposalError,
    $submitDisabled,
    proposalAdded,
    proposalChanged,
    proposalAddedMessageReseted,
  ]);

  const timerRef = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    if (!message) return;

    timerRef.current = setTimeout(() => {
      resetMessage();
    }, 3000);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [message, resetMessage]);

  const handleProposalChange: React.FormEventHandler<HTMLTextAreaElement> = (e) => {
    changeProposal(e.currentTarget.value);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    addProposal();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6"
    >
      <textarea
        value={newProposal}
        rows={10}
        onInput={handleProposalChange}
        className="w-3/4 p-3 resize-none rounded-lg text-slate-800 bg-white placeholder:text-slate-600 hover:bg-slate-50 focus-within:bg-slate-50 focus-within:outline-none transition-colors duration-300"
      />
      <div className="flex gap-8">
        <Button
          type="submit"
          color="blue"
          size="md"
          className="min-w-[300px]"
          disabled={submitDisabled}
        >
          <div className="relative px-8">
            <span>Добавить</span>
            {isLoading && (
              <span className="absolute top-0 bottom-0 right-0 my-auto spinner w-5 h-5 border-2 text-white" />
            )}
          </div>
        </Button>
        {!!message && (
          <div className={clsx(
            'py-2 text-sm',
            {
              'text-teal-600': isSuccess,
              'text-red-400': !isSuccess || isError,
            },
          )}>
            {message}
          </div>
        )}
      </div>
    </form>
  );
};