import React from 'react';
import { useUnit } from 'effector-react';

import { Combobox, Skeleton } from '@/components/ui-kit';
import {
  $isMeetingsError,
  $isMeetingsFormsDisabled,
  $isMeetingsLoading,
  $meetings,
  $selectedMeeting,
  meetingChanged
} from '@/store/meetings';
import { IComboboxOption } from '@/interfaces/utils';

export const MeetingsList: React.FC = () => {
  const [
    meetings,
    isLoading,
    isError,
    selectedMeeting,
    formDisabled,
    changeMeeting,
  ] = useUnit([
    $meetings,
    $isMeetingsLoading,
    $isMeetingsError,
    $selectedMeeting,
    $isMeetingsFormsDisabled,
    meetingChanged,
  ]);

  const [query, setQuery] = React.useState('');

  const handleMeetingChange = React.useCallback((value: IComboboxOption) => {
    changeMeeting(value);
  }, [changeMeeting]);

  const handleOptionsClose = React.useCallback(() => {
    setQuery('');
  }, []);

  const handleInputChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  }, []);

  if (isError) return (
    <div className="text-sm">Не удалось загрузить встречи...</div>
  );

  if (isLoading) return (
    <Skeleton className="h-10 rounded-md" />
  );

  const meetingOptions = meetings.map((meeting) => ({ value: meeting, label: meeting }));
  const filteredMeetingOptions =
    query === ''
      ? meetingOptions
      : meetingOptions.filter((option) => {
        return option.label.toLowerCase().includes(query.toLowerCase());
      });

  return (
    <Combobox
      options={filteredMeetingOptions}
      value={selectedMeeting}
      width={400}
      onChange={handleMeetingChange}
      onInput={handleInputChange}
      onClose={handleOptionsClose}
      disabled={formDisabled}
    />
  );
};