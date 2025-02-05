import React from 'react';
import { useUnit } from 'effector-react';

import {
  $isUserInfoError,
  $isUserInfoSending,
  $userBirth,
  $userContacts,
  $userFamily,
  $userFirstName,
  $userFrom,
  $userLastName,
  $userLocation,
  $userMember,
  $userRole,
  $userSecondName,
  $userSkills,
  $isAccountFormDisabled,
  $isAccountFormButtonsDisabled,
  $accountFormMessageSuccess,
  $accountFormMessageFail,
  $userBirthErrorMessage,
  $userFromErrorMessage,
  userBirthChanged,
  userContactsChanged,
  userFamilyChanged,
  userFromChanged,
  userSecondNameChanged,
  userLocationChanged,
  userSkillsChanged,
  accountChangesСancelled,
  modeChanged,
  accountChangesSubmitted,
  messagesClosed,
  $userLand,
} from '@/store/user';
import { ErrorMessage } from '@/components/ErrorMessage';
import { Button, EyeIcon, Input } from '@/components/ui-kit';

import styles from '@/components/PersonalAccount/PersonalAccount.module.scss';

export const PersonalAccountForm: React.FC = () => {
  const [
    isLoading,
    isError,
    userFirstName,
    userSecondName,
    userLastName,
    userBirth,
    userFamily,
    userContacts,
    userLocation,
    userFrom,
    userLand,
    userMember,
    userRole,
    userSkills,
    isAccountFormDisabled,
    isAccountFormButtonsDisabled,
    successMessage,
    failMessage,
    birthErrorMessage,
    fromErrorMessage,
    changeSecondName,
    changeBirth,
    changeFamily,
    changeContacts,
    changeLocation,
    changeFrom,
    changeSkills,
    resetAccountChanges,
    submitAccountChanges,
    toggleMode,
    closeMessages,
  ] = useUnit([
    $isUserInfoSending,
    $isUserInfoError,
    $userFirstName,
    $userSecondName,
    $userLastName,
    $userBirth,
    $userFamily,
    $userContacts,
    $userLocation,
    $userFrom,
    $userLand,
    $userMember,
    $userRole,
    $userSkills,
    $isAccountFormDisabled,
    $isAccountFormButtonsDisabled,
    $accountFormMessageSuccess,
    $accountFormMessageFail,
    $userBirthErrorMessage,
    $userFromErrorMessage,
    userSecondNameChanged,
    userBirthChanged,
    userFamilyChanged,
    userContactsChanged,
    userLocationChanged,
    userFromChanged,
    userSkillsChanged,
    accountChangesСancelled,
    accountChangesSubmitted,
    modeChanged,
    messagesClosed
  ]);

  const timerRef = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    if (!successMessage && !failMessage) return;

    if (failMessage) {
      timerRef.current = setTimeout(closeMessages, 3000);
      return;
    }

    toggleMode();

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [successMessage, failMessage, closeMessages, toggleMode]);

  const handleSecondNameInput: React.FormEventHandler<HTMLInputElement> = React.useCallback(
    (e) => {
      if (isAccountFormDisabled) return;
      changeSecondName(e.currentTarget.value);
    },
    [isAccountFormDisabled, changeSecondName]
  );

  const handleBirthInput: React.FormEventHandler<HTMLInputElement> = React.useCallback(
    (e) => {
      if (isAccountFormDisabled) return;
      changeBirth(e.currentTarget.value);
    },
    [isAccountFormDisabled, changeBirth]
  );

  const handleFromInput: React.FormEventHandler<HTMLInputElement> = React.useCallback(
    (e) => {
      if (isAccountFormDisabled) return;
      changeFrom(e.currentTarget.value);
    },
    [isAccountFormDisabled, changeFrom]
  );

  const handleLocationInput: React.FormEventHandler<HTMLTextAreaElement> = React.useCallback(
    (e) => {
      if (isAccountFormDisabled) return;
      changeLocation(e.currentTarget.value);
    },
    [isAccountFormDisabled, changeLocation]
  );

  const handleFamilyInput: React.FormEventHandler<HTMLTextAreaElement> = React.useCallback(
    (e) => {
      if (isAccountFormDisabled) return;
      changeFamily(e.currentTarget.value);
    },
    [isAccountFormDisabled, changeFamily]
  );

  const handleSkillsInput: React.FormEventHandler<HTMLTextAreaElement> = React.useCallback(
    (e) => {
      if (isAccountFormDisabled) return;
      changeSkills(e.currentTarget.value);
    },
    [isAccountFormDisabled, changeSkills]
  );

  const handleContactsInput: React.FormEventHandler<HTMLTextAreaElement> = React.useCallback(
    (e) => {
      if (isAccountFormDisabled) return;
      changeContacts(e.currentTarget.value);
    },
    [isAccountFormDisabled, changeContacts]
  );

  const handleViewButtonClick: React.MouseEventHandler<HTMLButtonElement> = React.useCallback(
    () => {
      if (isAccountFormDisabled) return;
      resetAccountChanges();
      toggleMode();
    },
    [isAccountFormDisabled, resetAccountChanges, toggleMode]
  );

  const handleFormReset: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (isAccountFormButtonsDisabled) return;
    resetAccountChanges();
  };

  const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (isAccountFormButtonsDisabled) return;
    submitAccountChanges();
  };

  if (isError) return (
    <ErrorMessage className="pb-10" />
  );

  return (
    <div className="py-8 px-5 bg-white rounded-md shadow">
      <form
        className="relative flex flex-col gap-8 pr-65"
        onReset={handleFormReset}
        onSubmit={handleFormSubmit}
      >
        <Button
          type="button"
          size="xs"
          color="transparent"
          className="absolute top-0 right-0"
          onClick={handleViewButtonClick}
          disabled={isAccountFormDisabled}
          icon={EyeIcon}
          outlined
        >
          Вернуться к просмотру
        </Button>
        <div className={styles.formFieldBlock}>
          <span className={styles.formLabel}>Фамилия:</span>
          <span className={styles.formValue}>{userLastName}</span>
        </div>
        <div className={styles.formFieldBlock}>
          <span className={styles.formLabel}>Имя:</span>
          <span className={styles.formValue}>{userFirstName}</span>
        </div>
        <div className={styles.formFieldBlock}>
          <span className={styles.formLabel}>Отчество:</span>
          <span className={styles.formValue}>
            <Input
              sizeValue="md"
              color="gray"
              value={userSecondName}
              onInput={handleSecondNameInput}
              disabled={isAccountFormDisabled}
            />
          </span>
        </div>
        <div className={styles.formFieldBlock}>
          <span className={styles.formLabel}>Номер участка:</span>
          <span className={styles.formValue}>{userLand}</span>
        </div>
        <div className={styles.formFieldBlock}>
          <span className={styles.formLabel}>Дата рождения (обязательное поле):</span>
          <div className={styles.formValue}>
            <Input
              sizeValue="md"
              color="gray"
              placeholder="дд.мм.гггг"
              value={userBirth}
              onInput={handleBirthInput}
              disabled={isAccountFormDisabled}
            />
            {!!birthErrorMessage && (
              <span className="absolute bottom-0 left-0 translate-y-full fail-message">
                {birthErrorMessage}
              </span>
            )}
          </div>
        </div>
        <div className={styles.formFieldBlock}>
          <span className={styles.formLabel}>Дата вступления в кооператив (обязательное поле):</span>
          <div className={styles.formValue}>
            <Input
              sizeValue="md"
              color="gray"
              placeholder="дд.мм.гггг"
              value={userFrom}
              onInput={handleFromInput}
              disabled={isAccountFormDisabled}
            />
            {!!fromErrorMessage && (
              <span className="absolute bottom-0 left-0 translate-y-full fail-message">
                {fromErrorMessage}
              </span>
            )}
          </div>
        </div>
        <div className={styles.formFieldBlock}>
          <span className={styles.formLabel}>Место постоянного проживания:</span>
          <span className={styles.formValue}>
            <textarea
              value={userLocation}
              rows={4}
              onInput={handleLocationInput}
              className="w-full p-3 resize-none rounded-lg text-slate-600 bg-slate-100 placeholder:text-slate-400 hover:bg-slate-200 focus-within:outline-slate-400 focus-within:bg-slate-200 transition-colors duration-300"
              disabled={isAccountFormDisabled}
            />
          </span>
        </div>
      
        <div className={styles.formFieldBlock}>
          <span className={styles.formLabel}>Информация о семье:</span>
          <span className={styles.formValue}>
            <textarea
              value={userFamily}
              rows={4}
              onInput={handleFamilyInput}
              className="w-full p-3 resize-none rounded-lg text-slate-600 bg-slate-100 placeholder:text-slate-400 hover:bg-slate-200 focus-within:outline-slate-400 focus-within:bg-slate-200 transition-colors duration-300"
              disabled={isAccountFormDisabled}
            />
          </span>
        </div>
        <div className={styles.formFieldBlock}>
          <span className={styles.formLabel}>Полезные навыки/опыт:</span>
          <span className={styles.formValue}>
            <textarea
              value={userSkills}
              rows={4}
              onInput={handleSkillsInput}
              className="w-full p-3 resize-none rounded-lg text-slate-600 bg-slate-100 placeholder:text-slate-400 hover:bg-slate-200 focus-within:outline-slate-400 focus-within:bg-slate-200 transition-colors duration-300"
              disabled={isAccountFormDisabled}
            />
          </span>
        </div>
        <div className={styles.formFieldBlock}>
          <span className={styles.formLabel}>Член кооператива:</span>
          <span className={styles.formValue}>{userMember}</span>
        </div>
        <div className={styles.formFieldBlock}>
          <span className={styles.formLabel}>Контакты:</span>
          <span className={styles.formValue}>
            <textarea
              value={userContacts}
              rows={4}
              onInput={handleContactsInput}
              className="w-full p-3 resize-none rounded-lg text-slate-600 bg-slate-100 placeholder:text-slate-400 hover:bg-slate-200 focus-within:outline-slate-400 focus-within:bg-slate-200 transition-colors duration-300"
              disabled={isAccountFormDisabled}
            />
          </span>
        </div>
        <div className={styles.formFieldBlock}>
          <span className={styles.formLabel}>Роль в кооперативе:</span>
          <span className={styles.formValue}>{userRole}</span>
        </div>

        <div className="flex items-center gap-5 mt-8">
          <Button
            type="submit"
            color="blue"
            size="sm"
            className="min-w-[200px]"
            disabled={isAccountFormButtonsDisabled}
          >
            <div className="relative px-8">
              <span>Сохранить</span>
              {isLoading && (
                <span className="absolute top-0 bottom-0 right-0 my-auto spinner w-5 h-5 border-2 text-white" />
              )}
            </div>          
          </Button>
          <Button
            type="reset"
            color="gray"
            size="sm"
            disabled={isAccountFormButtonsDisabled}
            className="min-w-[200px]"
          >
          Отменить
          </Button>
          {!!failMessage && (
            <div className="ml-2.5 fail-message">{failMessage}</div>
          )}
        </div>      											
      </form>
    </div>
  );
};
