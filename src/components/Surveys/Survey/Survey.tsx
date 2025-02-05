import React from 'react';
import { AxiosError } from 'axios';
import { useUnit } from 'effector-react';

import { surveysApi } from '@/api/surveys';
import { Button, CheckIcon, RadioButton } from '@/components/ui-kit';
import { UNKNOWN_ERROR } from '@/constants/error';
import { surveysUpdated } from '@/store/surveys';

const SUCCESS_MESSAGE = 'Вы проголосовали';

interface ISurveyProps {
  id: number;
  options: string[];
}

export const Survey: React.FC<ISurveyProps> = ({ id, options }) => {
  const [updateSurveys] = useUnit([surveysUpdated]);
  const [selectedValue, setSelectedValue] = React.useState<number | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [successMessage, setSuccessMessage] = React.useState<string | null>(null);
  const [isButtonsDisabled, setIsButtonsDisabled] = React.useState(true);

  const timerRef = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    if (selectedValue === null || isLoading) {
      setIsButtonsDisabled(true);
      return;
    }
    setIsButtonsDisabled(false);
  }, [selectedValue, isLoading]);

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

  const handleChangeValue = React.useCallback((value: number | string) => {
    setError(null);
    setSelectedValue(Number(value));
  }, []);

  const handleReset = () => {
    setSelectedValue(null);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    setError(null);
    setSuccessMessage(null);
    setIsLoading(true);

    if (selectedValue === null) {
      setError('Выберите вариант');
      return;
    }

    try {
      const response = await surveysApi.addVote({
        [id]: selectedValue + 1
      });
    
      if (response.status !== 200) throw new AxiosError('request_error');
    
      const { message } = response.data;
    
      if (message !== SUCCESS_MESSAGE) {
        setError(message);
        setSuccessMessage(null);
        return;
      } 
    
      setSuccessMessage(message);
      setTimeout(updateSurveys, 4000);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setError(UNKNOWN_ERROR);
      setSuccessMessage(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      onReset={handleReset}
      className="flex flex-col gap-2 pb-5"
    >
      <ul className="flex flex-col">
        {options.map((option, index) => (
          <li key={index}>
            <RadioButton
              value={index}
              label={option}
              checked={index === selectedValue}
              onChange={handleChangeValue}
            />
          </li>
        ))}
      </ul>

      <div className="min-h-9">
        {!!error && (
          <div className="text-sm text-red-400 text-center">{error}</div>
        )}
        {!!successMessage && (
          <div className="flex gap-5 items-center justify-center text-sm font-semibold text-teal-600 text-center">
            <CheckIcon /><span>{successMessage}</span>
          </div>
        )}
      </div>

      <div className="flex gap-5">
        <Button
          type="submit"
          size="sm"
          color="blue"
          className="min-w-[200px]"
          disabled={isButtonsDisabled}
        >
          <div className="relative px-8">
            <span>Голосовать</span>
            {isLoading && (
              <span className="absolute top-0 bottom-0 right-0 my-auto spinner w-5 h-5 border-2 text-white" />
            )}
          </div>
        </Button>
        <Button
          type="reset"
          size="sm"
          color="gray"
          className="min-w-[200px]"
          disabled={isButtonsDisabled}
        >
          Сбросить
        </Button>
      </div>
    </form>
  );
};