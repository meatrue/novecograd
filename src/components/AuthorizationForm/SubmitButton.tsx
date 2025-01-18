import React from 'react';
import { useUnit } from 'effector-react';

import { Button } from '@/components/ui-kit';
import {
  $submitDisabled,
} from '@/store/authorization';

export const SubmitButton: React.FC = () => {
  const [submitDisabled] = useUnit([$submitDisabled]);

  return (
    <Button
      color="blue"
      size="md"
      type="submit"
      disabled={submitDisabled}
    >
      Войти
    </Button>
  );
};
