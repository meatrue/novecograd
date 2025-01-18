import React from 'react';
import { Link } from 'react-router-dom';
import { useUnit } from 'effector-react';

import {
  $isMeetingsLoading,
  $protocolOutputDataType,
  meetingsPageMounted,
  meetingsPageUnmounted,
} from '@/store/meetings';
import {
  GetProtocolForm,
  MeetingProtocol,
  MeetingThemes,
  SearchInThemesForm,
} from '@/components/Meetings';
import { Skeleton } from '@/components/ui-kit';

export const MeetingsPage: React.FC = () => {
  const [
    loadMeetings,
    clearMeetings,
    protocolOutputDataType,
    isMeetingsLoading,
  ] = useUnit([
    meetingsPageMounted,
    meetingsPageUnmounted,
    $protocolOutputDataType,
    $isMeetingsLoading,
  ]);

  React.useEffect(() => {
    loadMeetings();
    return () => {
      clearMeetings();
    };
  }, [loadMeetings, clearMeetings]);

  return (
    <div className="grow flex flex-col gap-8 w-full wrapper-main wrapper-max pt-6 pb-20">
      <p><Link className="text-sm hover-color" to="/">На главную</Link></p>
      {isMeetingsLoading
        ? <Skeleton className="h-10 rounded-md" bgClassName="bg-slate-300" />
        : <h1 className="text-4xl font-semibold">Собрания</h1>
      }
      

      <div className="flex items-center justify-between gap-8 flex-wrap p-8 bg-white rounded-md shadow">
        {isMeetingsLoading ? <Skeleton className="w-[calc(50%-32px)] h-11 rounded-md" /> : <GetProtocolForm />}
        {isMeetingsLoading ? <Skeleton className="w-[calc(50%-32px)] h-11 rounded-md" /> : <SearchInThemesForm />}
      </div>

      {protocolOutputDataType === 'protocol' && <MeetingProtocol />}
      {protocolOutputDataType === 'themes' && <MeetingThemes />}
    </div>
  );
};
