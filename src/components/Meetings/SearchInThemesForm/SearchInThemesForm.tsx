import React from 'react';
import { useUnit } from 'effector-react';

import { Button, Input } from '@/components/ui-kit';
import {
  $isProtocolThemesLoading,
  $isMeetingsFormsDisabled,
  $isSearchThemesButtonDisabled,
  $protocolThemeText,
  protocolThemesLoaded,
  protocolThemeTextChanged
} from '@/store/meetings';

export const SearchInThemesForm: React.FC = () => {
  const [
    themeText,
    formDisabled,
    buttonDisabled,
    isLoading,
    changeText,
    loadProtocolThemes,
  ] = useUnit([
    $protocolThemeText,
    $isMeetingsFormsDisabled,
    $isSearchThemesButtonDisabled,
    $isProtocolThemesLoading,
    protocolThemeTextChanged,
    protocolThemesLoaded,
  ]);

  const handleTextInput: React.FormEventHandler<HTMLInputElement> = React.useCallback(
    (e) => {
      const text = e.currentTarget.value;
      changeText(text);
    },
    [changeText]
  );

  const handleSearchInThemes: React.FormEventHandler<HTMLFormElement> = React.useCallback(
    (e) => {
      e.preventDefault();
      if (!themeText) return;
      loadProtocolThemes(themeText);
    },
    [loadProtocolThemes, themeText]
  );

  return (
    <form
      className="flex items-center gap-8"
      onSubmit={handleSearchInThemes}
    >
      <div className="w-[300px]">
        <Input
          sizeValue="sm"
          color="gray"
          placeholder="Введите текст"
          value={themeText}
          onInput={handleTextInput}
          disabled={formDisabled}
        />
      </div>
      <Button
        type="submit"
        size="sm"
        color="blue"
        disabled={buttonDisabled}
      >
        <div className="relative px-8">
          <span>Поиск в темах</span>
          {isLoading && (
            <span className="absolute top-0 bottom-0 right-0 my-auto spinner w-5 h-5 border-2 text-white" />
          )}
        </div>
      </Button>
    </form>
  );
};