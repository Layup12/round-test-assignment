import type { ActionIconProps, ButtonProps } from '@mantine/core';
import { ActionIcon, Button } from '@mantine/core';
import type { AppBreakpoint } from '@shared/lib';
import { useMinBreakpoint } from '@shared/lib';
import type { MouseEventHandler, ReactNode } from 'react';

interface ResponsiveLabeledActionProps {
  icon: ReactNode;
  label: string;
  showLabelFrom?: AppBreakpoint;
  'aria-label'?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  loading?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  narrowProps?: Pick<ActionIconProps, 'variant' | 'color' | 'className'>;
  labeledProps?: Pick<ButtonProps, 'variant' | 'color' | 'className' | 'size'>;
}

export function ResponsiveLabeledAction({
  icon,
  label,
  showLabelFrom = 'sm',
  'aria-label': ariaLabel,
  onClick,
  loading,
  disabled,
  type = 'button',
  narrowProps,
  labeledProps,
}: ResponsiveLabeledActionProps) {
  const showLabel = useMinBreakpoint(showLabelFrom);
  const a11yLabel = ariaLabel ?? label;

  if (showLabel) {
    return (
      <Button
        type={type}
        variant={labeledProps?.variant ?? 'default'}
        color={labeledProps?.color}
        size={labeledProps?.size ?? 'md'}
        className={labeledProps?.className}
        leftSection={icon}
        onClick={onClick}
        loading={loading}
        disabled={disabled}
      >
        {label}
      </Button>
    );
  }

  return (
    <ActionIcon
      type={type}
      variant={narrowProps?.variant ?? 'default'}
      color={narrowProps?.color}
      size="xl"
      radius="md"
      className={narrowProps?.className}
      aria-label={a11yLabel}
      onClick={onClick}
      loading={loading}
      disabled={disabled}
    >
      {icon}
    </ActionIcon>
  );
}
