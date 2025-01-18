import React from 'react';
import { useUnit } from 'effector-react';

import { Input } from '@/components/ui-kit';
import {
  $username,
  $formDisabled,
  usernameChanged,
} from '@/store/authorization';

export const Login: React.FC = () => {
  const [
    username,
    formDisabled,
    changeUsername,
  ] = useUnit([
    $username,
    $formDisabled,
    usernameChanged,
  ]);

  const handleUsernameInput = React.useCallback((e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    changeUsername(value);
  }, [changeUsername]);

  return (
    <Input
      type="text"
      placeholder="Логин"
      color="gray"
      value={username}
      onInput={handleUsernameInput}
      disabled={formDisabled}
    />
  );
};