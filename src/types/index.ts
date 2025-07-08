import type {
  ChangeEvent,
  HTMLAttributes,
  InputHTMLAttributes,
  PropsWithChildren,
  SelectHTMLAttributes
} from 'react';

export * from './news';
export * from './feed';

declare global {
  type ContainerProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>>;

  type CardProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>>;

  type InputProps = InputHTMLAttributes<HTMLInputElement>;

  type DatePickerProps = InputProps & {
    label?: string;
  };

  type SearchInputProps = {
    value: string;
    onSearchChange: (text: string) => void;
  };

  type Option = {
    label: string;
    value: string;
  };

  type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
    options: Option[];
    label?: string;
    placeholder?: string;
  };

  type CheckboxProps = Option &
    InputHTMLAttributes<HTMLInputElement> & {
      checked?: boolean;
      onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    };

  interface CheckListProps {
    title?: string;
    list: Option[];
    selectedItems: string[];
    onSelectionChange: (updatedList: string[]) => void;
  }

  type BadgeColor = 'blue' | 'green' | 'red' | 'purple' | 'orange' | 'emerald' | 'gray';
}
