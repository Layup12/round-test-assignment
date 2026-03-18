import { ActionIcon } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import cn from 'classnames';
import type { ChangeEvent, InputHTMLAttributes } from 'react';
import { forwardRef } from 'react';

import classesModule from './Input.module.scss';

type NativeInputProps = InputHTMLAttributes<HTMLInputElement>;

export type InputProps = NativeInputProps & {
  canClear?: boolean;
  classes?: {
    root?: string;
    input?: string;
  };
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { canClear = false, value, onChange, classes, className, ...rest },
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

  return (
    <div className={cn(classesModule.root, className, classes?.root)}>
      <input
        ref={ref}
        value={value}
        onChange={onChange}
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
