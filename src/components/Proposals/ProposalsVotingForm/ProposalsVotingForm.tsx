import React from 'react';
import { AxiosError } from 'axios';

import { ISelectOption } from '@/interfaces/utils';
import { Button, CheckIcon, Select } from '@/components/ui-kit';
import { IProposal } from '@/interfaces/proposals';
import { proposalsApi } from '@/api';
import { UNKNOWN_ERROR } from '@/constants/error';
import { VOTING_OPTIONS } from '../constants';

const SUCCESS_MESSAGE = 'Ваш голос учтен!';

interface IProposalsVotingFormProps {
  proposal: IProposal;
  proposalNumber: number;
  className?: string
}

export const ProposalsVotingForm: React.FC<IProposalsVotingFormProps> = ({
  proposal,
  proposalNumber,
  className
}) => {
  const [value, setValue] = React.useState<ISelectOption | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [successMessage, setSuccessMessage] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const timerRef = React.useRef<NodeJS.Timeout | null>(null);
  
  const handleSelectChange = React.useCallback((newValue: ISelectOption) => {
    setError(null);
    setValue(newValue);
  }, []);

  const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    setError(null);
    setSuccessMessage(null);
    setIsLoading(true);

    if (!value) {
      setError('Выберите вариант');
      return;
    }

    try {
      const response = await proposalsApi.addVote({
        prop_id: Number(proposal.id),
        prop_number: proposalNumber,
        vote_result: value.value
      });

      if (response.status !== 200) throw new AxiosError('request_error');

      const { message } = response.data;

      if (message !== SUCCESS_MESSAGE) {
        setError(message);
        setSuccessMessage(null);
        return;
      } 

      setSuccessMessage(message);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setError(UNKNOWN_ERROR);
      setSuccessMessage(null);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (!error && !successMessage) return;

    if (error) {
      timerRef.current = setTimeout(() => {
        setError(null);
      }, 3500); 
    } else if (successMessage) {
      timerRef.current = setTimeout(() => {
        setSuccessMessage(null);
      }, 3500); 
    }

    return () => {
      if (!timerRef.current) return;
      clearTimeout(timerRef.current);
    };
  }, [error, successMessage]);

  return (
    <div className="flex flex-col gap-3">
      <form
        className={className}
        onSubmit={handleFormSubmit}
      >
        <Select
          className="grow min-w-[200px]"
          options={VOTING_OPTIONS}
          value={value}
          onChange={handleSelectChange}
        />
        <Button
          color="blue"
          size="sm"
          type="submit"
          disabled={!value || isLoading}
        >
          <div className="relative px-8">
            <span>Голосовать</span>
            {isLoading && (
              <span className="absolute top-0 bottom-0 right-0 my-auto spinner w-5 h-5 border-2 text-white" />
            )}
          </div>
        </Button>
      </form>
      {!!error && (
        <div className="text-sm text-red-400 text-center">{error}</div>
      )}
      {!!successMessage && (
        <div className="flex gap-5 items-center justify-center text-sm font-semibold text-teal-600 text-center">
          <CheckIcon /><span>{successMessage}</span>
        </div>
      )}
    </div>
  );
};