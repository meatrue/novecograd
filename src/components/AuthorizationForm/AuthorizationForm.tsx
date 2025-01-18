import React from 'react';
import { useUnit } from 'effector-react';

import {
  $isLoading,
  $isError,
  $authMessage,
  $authData,
  formSubmitted,
  errorReseted,
  formMounted,
  formReseted,
  authMessageClosed,
} from '@/store/authorization';
import { Loader } from './Loader';
import { Login } from './Login';
import { Password } from './Password';
import { SubmitButton } from './SubmitButton';
import { AuthorizationMessage } from './AuthorizationMessage';

interface IAuthorizationForm {
  onSuccess?: () => void;
}

export const AuthorizationForm: React.FC<IAuthorizationForm> = ({ onSuccess }) => {
  const [
    isLoading,
    isError,
    authMessage,
    authData,
    submitForm,
    resetError,
    mountForm,
    resetForm,
    closeAuthMessage,
  ] = useUnit([
    $isLoading,
    $isError,
    $authMessage,
    $authData,
    formSubmitted,
    errorReseted,
    formMounted,
    formReseted,
    authMessageClosed,
  ]);

  React.useEffect(() => {
    mountForm();
  }, [mountForm]);

  React.useEffect(() => {
    if (!authMessage) return;

    if (!authData) {
      setTimeout(() => {
        closeAuthMessage();
      }, 3000);
      return;
    }

    setTimeout(() => {
      onSuccess?.();
    }, 3000);

    setTimeout(() => {
      resetForm();
    }, 3500);
  }, [authMessage, authData, closeAuthMessage, onSuccess, resetForm]);

  const handleCloseMessage = React.useCallback(() => {
    if (authData) {
      onSuccess?.();
      setTimeout(() => resetForm(), 500);
      return;
    }
    closeAuthMessage();
  }, [authData, onSuccess, resetForm, closeAuthMessage]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitForm();
  };

  return (
    <>
      <div className='flex flex-col gap-8 items-center w-full'>
        <h3 className='text-2xl'>Вход</h3>
        <form className='w-full flex flex-col gap-6' onSubmit={handleSubmit}>
          <Login />
          <Password/>
          <SubmitButton />
        </form>
      </div>
      {isLoading && <Loader />}   
      {!isLoading && !!authMessage && (
        <AuthorizationMessage onClose={handleCloseMessage}>
          <div className="text-t1 text-center">
            {authMessage}
          </div>
        </AuthorizationMessage>
      )}  
      {isError && (
        <AuthorizationMessage onClose={resetError}>
          <div className="flex flex-col items-center gap-4 px-3">
            <div className="text-d">Ошибка</div>
            <div className="text-t1 text-center">
              Что-то пошло не так. <br /> Пожалуйста, попробуйте еще раз
            </div>
          </div>
        </AuthorizationMessage>
      )}
    </>
  );
};
