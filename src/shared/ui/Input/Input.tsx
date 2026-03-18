import { ActionIcon } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import cn from 'classnames';
import type { ChangeEvent, InputHTMLAttributes } from 'react';
import { forwardRef } from 'react';

import classesModule from './Input.module.scss';

type NativeInputProps = InputHTMLAttributes<HTMLInputElement>;

type InputProps = NativeInputProps & {
  canClear?: boolean;
  classes?: {
    root?: string;
    input?: string;
  };
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { canClear = false, value, onChange, maxLength, classes, className, ...rest },
  ref,
) {
  const handleClear = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (onChange) {
      const target = {
        value: '',
      } as EventTarget & HTMLInputElement;

      const syntheticEvent: ChangeEvent<HTMLInputElement> = {
        ...event,
        target,
        currentTarget: target,
      };

      onChange(syntheticEvent);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!onChange) return;

    const nextValue = event.currentTarget.value;

    if (typeof maxLength === 'number' && nextValue.length > maxLength) {
      const target = {
        ...event.currentTarget,
        value: nextValue.slice(0, maxLength),
      } as EventTarget & HTMLInputElement;

      const syntheticEvent: ChangeEvent<HTMLInputElement> = {
        ...event,
        target,
        currentTarget: target,
      };

      onChange(syntheticEvent);
      return;
    }

    onChange(event);
  };

  return (
    <div className={cn(classesModule.root, className, classes?.root)}>
      <input
        ref={ref}
        value={value}
        onChange={handleChange}
        maxLength={maxLength}
        className={cn(classesModule.input, canClear && classesModule.inputWithClear, classes?.input)}
        {...rest}
      />

      {canClear && value && onChange && (
        <ActionIcon
          variant="transparent"
          size="xl"
          radius="xl"
          aria-label="Очистить поле"
          onMouseDown={(mouseDownEvent) => {
            mouseDownEvent.preventDefault();
          }}
          onClick={handleClear}
          className={classesModule.clearButton}
        >
          <IconX size={24} />
        </ActionIcon>
      )}
    </div>
  );
});
