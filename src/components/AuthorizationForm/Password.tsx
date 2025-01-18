import React from 'react';
import { useUnit } from 'effector-react';

import { Input } from '@/components/ui-kit';
import {
  $password,
  $formDisabled,
  passwordChanged,
} from '@/store/authorization';

export const Password: React.FC = () => {
  const [
    password,
    formDisabled,
    changePassword,
  ] = useUnit([
    $password,
    $formDisabled,
    passwordChanged,
  ]);

  const handlePasswordInput = React.useCallback((e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    changePassword(value);
  }, [changePassword]);

  return (
    <Input
      type="password"
      placeholder="Пароль"
      color="gray"
      value={password}
      onInput={handlePasswordInput}
      disabled={formDisabled}
    />
  );
};