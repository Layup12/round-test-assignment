import { ActionIcon } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import cn from 'classnames';
import type { ChangeEvent, TextareaHTMLAttributes } from 'react';
import { forwardRef } from 'react';

import classes from './Textarea.module.scss';

type NativeTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export type TextareaProps = NativeTextareaProps & {
  canClear?: boolean;
  classes?: {
    root?: string;
    textarea?: string;
  };
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { canClear = false, value, onChange, classes: classesProp, className, ...rest },
  ref,
) {
  const handleClear = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (onChange) {
      const target = {
        value: '',
      } as EventTarget & HTMLTextAreaElement;

      const syntheticEvent: ChangeEvent<HTMLTextAreaElement> = {
        ...event,
        target,
        currentTarget: target,
      };

      onChange(syntheticEvent);
    }
  };

  return (
    <div className={cn(classes.root, className, classesProp?.root)}>
      <textarea
        ref={ref}
        value={value}
        onChange={onChange}
        className={cn(classes.textarea, canClear && classes.textareaWithClear, classesProp?.textarea)}
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
          className={classes.clearButton}
        >
          <IconX size={24} />
        </ActionIcon>
      )}
    </div>
  );
});
