import React from 'react';
import { useUnit } from 'effector-react';

import {
  $isProtocolLoading,
  $isGetProtocolButtonDisabled,
  $selectedMeeting,
  protocolLoaded
} from '@/store/meetings';
import { MeetingsList } from '../MeetingsList';
import { Button } from '@/components/ui-kit';

export const GetProtocolForm: React.FC = () => {
  const [
    selectedMeeting,
    isProtocolLoading,
    buttonDisabled,
    loadProtocol,
  ] = useUnit([
    $selectedMeeting,
    $isProtocolLoading,
    $isGetProtocolButtonDisabled,
    protocolLoaded,
  ]);

  const handleGetProtocol: React.FormEventHandler<HTMLFormElement> = React.useCallback(
    (e) => {
      e.preventDefault();
      if (!selectedMeeting) return;
      loadProtocol(selectedMeeting.value);
    },
    [loadProtocol, selectedMeeting]
  );
    
  return (
    <form
      className="flex items-center gap-8"
      onSubmit={handleGetProtocol}
    >
      <div className="w-[400px]">
        <MeetingsList />
      </div>
      <Button
        type="submit"
        size="sm"
        color="blue"
        disabled={buttonDisabled}
      >
        <div className="relative px-8">
          <span>Показать протокол</span>
          {isProtocolLoading && (
            <span className="absolute top-0 bottom-0 right-0 my-auto spinner w-5 h-5 border-2 text-white" />
          )}
        </div>
      </Button>
    </form>
  );
};