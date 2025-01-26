import React from 'react';
import { useUnit } from 'effector-react';

import {
  $accountFormMessageSuccess,
  $isUserInfoError,
  $isUserInfoLoading,
  $userBirth,
  $userContacts,
  $userFamily,
  $userFirstName,
  $userFrom,
  $userLand,
  $userLastName,
  $userLocation,
  $userMember,
  $userRole,
  $userSecondName,
  $userSkills,
  $userActivities,
  messagesClosed,
  modeChanged,
  $userInfo
} from '@/store/user';
import { Button, CheckIcon, EditIcon, Skeleton } from '@/components/ui-kit';
import { ErrorMessage } from '@/components/ErrorMessage';
import { ActivitiesList } from '@/components/ActivitiesList';

import styles from '@/components/PersonalAccount/PersonalAccount.module.scss';

export const PersonalAccountView: React.FC = () => {
  const [
    userInfo,
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
    userActivities,
    successMessage,
    toggleMode,
    closeMessages,
  ] = useUnit([
    $userInfo,
    $isUserInfoLoading,
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
    $userActivities,
    $accountFormMessageSuccess,
    modeChanged,
    messagesClosed,
  ]);

  const timerRef = React.useRef<NodeJS.Timeout | null>(null);
  
  React.useEffect(() => {
    if (!successMessage) return;
  
    timerRef.current = setTimeout(closeMessages, 3000);
  
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [successMessage, closeMessages]);

  const handleEditButtonClick: React.MouseEventHandler<HTMLButtonElement> = React.useCallback(
    () => {
      if (isLoading) return;
      toggleMode();
      closeMessages();
    },
    [isLoading, toggleMode, closeMessages]
  );

  if (isError) return (
    <ErrorMessage className="pb-10" />
  );

  return (
    <div className="flex flex-col gap-20">
      <div className="py-8 px-5 bg-white rounded-md shadow">
        {!isLoading && !userInfo
          ? <div className="text-center">Пользователь не найден</div>
          : (
            <div className="relative flex flex-col gap-8 pr-50 pb-10">
              {isLoading
                ? <Skeleton className="absolute top-0 right-0 max-w-[190px] h-[50px] rounded-md" />
                : (
                  <Button
                    type="button"
                    size="xs"
                    color="transparent"
                    className="absolute top-0 right-0"
                    onClick={handleEditButtonClick}
                    disabled={isLoading}
                    icon={EditIcon}
                    outlined
                  >
                Редактировать
                  </Button>
                )}

              <div className={styles.formFieldBlock}>
                <span className={styles.formLabel}>
                  {isLoading ? <Skeleton /> : <>Фамилия:</>}
                </span>
                <span className={styles.formValue}>
                  {isLoading ? <Skeleton /> : userLastName}
                </span>
              </div>
              <div className={styles.formFieldBlock}>
                <span className={styles.formLabel}>
                  {isLoading ? <Skeleton /> : <>Имя:</>}
                </span>
                <span className={styles.formValue}>
                  {isLoading ? <Skeleton /> : userFirstName}
                </span>
              </div>
              <div className={styles.formFieldBlock}>
                <span className={styles.formLabel}>
                  {isLoading ? <Skeleton /> : <>Отчество:</>}
                </span>
                <span className={styles.formValue}>
                  {isLoading ? <Skeleton /> : userSecondName}
                </span>
              </div>
              <div className={styles.formFieldBlock}>
                <span className={styles.formLabel}>
                  {isLoading ? <Skeleton /> : <>Номер участка:</>}
                </span>
                <span className={styles.formValue}>
                  {isLoading ? <Skeleton /> : userLand}
                </span>
              </div>
              <div className={styles.formFieldBlock}>
                <span className={styles.formLabel}>
                  {isLoading ? <Skeleton /> : <>Дата рождения:</>}
                </span>
                <span className={styles.formValue}>
                  {isLoading ? <Skeleton /> : userBirth}
                </span>
              </div>
              <div className={styles.formFieldBlock}>
                <span className={styles.formLabel}>
                  {isLoading ? <Skeleton /> : <>Дата вступления в кооператив:</>}
                </span>
                <span className={styles.formValue}>
                  {isLoading ? <Skeleton /> : userFrom}
                </span>
              </div>

              <div className={styles.formFieldBlock}>
                <span className={styles.formLabel}>
                  {isLoading ? <Skeleton /> : <>Место постоянного проживания:</>}
                </span>
                <span className={styles.formValue}>
                  {isLoading ? <Skeleton /> : userLocation}
                </span>
              </div>
      
              <div className={styles.formFieldBlock}>
                <span className={styles.formLabel}>
                  {isLoading ? <Skeleton /> : <>Информация о семье:</>}
                </span>
                <span className={styles.formValue}>
                  {isLoading ? <Skeleton /> : userFamily}
                </span>
              </div>
              <div className={styles.formFieldBlock}>
                <span className={styles.formLabel}>
                  {isLoading ? <Skeleton /> : <>Полезные навыки/опыт:</>}
                </span>
                <span className={styles.formValue}>
                  {isLoading ? <Skeleton /> : userSkills}
                </span>
              </div>
              <div className={styles.formFieldBlock}>
                <span className={styles.formLabel}>
                  {isLoading ? <Skeleton /> : <>Член кооператива:</>}
                </span>
                <span className={styles.formValue}>
                  {isLoading ? <Skeleton /> : userMember}
                </span>
              </div>
              <div className={styles.formFieldBlock}>
                <span className={styles.formLabel}>
                  {isLoading ? <Skeleton /> : <>Контакты:</>}
                </span>
                <span className={styles.formValue}>
                  {isLoading ? <Skeleton /> : userContacts}
                </span>
              </div>
              <div className={styles.formFieldBlock}>
                <span className={styles.formLabel}>
                  {isLoading ? <Skeleton /> : <>Роль в кооперативе:</>}
                </span>
                <span className={styles.formValue}>
                  {isLoading ? <Skeleton /> : userRole}
                </span>
              </div>
              {!!successMessage && (
                <div className="absolute left-0 right-0 bottom-0 flex gap-5 items-center justify-center ml-2.5 text-sm font-semibold text-teal-600">
                  <CheckIcon /><span>{successMessage}</span>
                </div>
              )}          
            </div>
          )}
      </div>

      {userActivities.length > 0 && (
        <div className="flex flex-col gap-8">
          <h2 className="text-xl font-semibold">Активности с моим участием</h2>
          <ActivitiesList
            items={userActivities}
            isLoading={isLoading}
            isError={isError}
          />
        </div>
      )}
    </div>
  );
};