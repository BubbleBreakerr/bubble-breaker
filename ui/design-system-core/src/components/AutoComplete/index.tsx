import React, { useEffect, useMemo, useState } from 'react';
import { tw } from '@twind/core';

import Stack from '../Stack';
import List, { Item } from '../List';
import TextField from '../TextField';
import { InputProps } from '../TextField/types';

import { useCloseActions } from '../../utils/useCloseActions';

export type AutoCompleteProps = {
  options: string[];
  placeholder?: InputProps['placeholder'];
  disabled?: InputProps['disabled'];
  value?: string;
  customStyle?: string;
  onChange?: (value: string) => void;
  onSelected?: (value: string) => void;
};

const AutoComplete: React.FC<AutoCompleteProps> = ({
  options,
  placeholder,
  disabled,
  customStyle = '',
  value,
  onChange,
  onSelected,
}) => {
  const [filters, setFilters] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const autoCompleteRef = useCloseActions(() => {
    setShowSuggestions(false);
  });

  useEffect(() => {
    setFilters(
      options.filter(option =>
        value ? option.toLowerCase().startsWith(value.toLowerCase()) : true,
      ),
    );
  }, [value, options]);

  const suggestions: Item[] = useMemo(
    () =>
      filters.map(filter => ({
        label: filter,
        onClick: (label: string) => {
          setShowSuggestions(false);
          if (onChange) onChange(label);
          if (onSelected) onSelected(label);
        },
        variant: 'subtitle2',
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filters],
  );

  return (
    <Stack
      direction="column"
      justify="center"
      spacing="gap-y-1"
      customStyle={customStyle}
      ref={autoCompleteRef}
    >
      <TextField
        type="text"
        placeholder={placeholder}
        iconRight="MagnifyingGlassIcon"
        value={value}
        onChange={event => {
          setShowSuggestions(true);
          if (onChange) onChange(event.target.value);
        }}
        onFocus={() => {
          setShowSuggestions(true);
        }}
        customStyle="rounded-3xl"
        radius={100}
        disabled={disabled}
      />
      {showSuggestions && suggestions.length > 0 && (
        <div className={tw('relative')}>
          <List
            items={suggestions}
            showDivider={false}
            customStyle="absolute max-h-28 w-full overflow-y-auto scrollbar"
          />
        </div>
      )}
    </Stack>
  );
};
export default AutoComplete;