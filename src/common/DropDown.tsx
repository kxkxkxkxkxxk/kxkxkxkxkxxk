import { useDropdown } from '@hook/useDropdown.ts';
import BackIcon from '@assets/icons/back.svg?react';
import DropDownIcon from '@assets/icons/drop_down.svg?react';
import clsx from 'clsx';

export interface DropDownProps<T extends string> {
  placeholder?: string;
  options: T[];
  value: T | '';
  title?: string;
  label?: string;
  onSelect: (value: T) => void;
  backButton?: { label: string; onClick: () => void };
  keepOpenOnSelect?: boolean;
}

export default function DropDown<T extends string>({
  placeholder,
  options,
  value,
  title,
  label,
  onSelect,
  backButton,
  keepOpenOnSelect = false,
}: DropDownProps<T>) {
  const { isOpen, toggle, ref } = useDropdown<T>();

  return (
    <div className="flex w-full min-w-0 flex-1 flex-col">
      <label className="text-gray-900 font-T05-SB">{title}</label>
      <div ref={ref} className="relative">
        <label className="block min-h-[20px] text-sm font-semibold text-gray-900">
          {label}
        </label>
        <div className="h-4" />
        <div
          onClick={toggle}
          className={clsx(
            'flex cursor-pointer items-center justify-between rounded-2xl border px-4 py-5 text-gray-500 transition-colors duration-200',
            isOpen ? 'border-purple-500' : 'border-gray-200'
          )}
        >
          <span>{placeholder}</span>
          <div
            className={clsx(
              'transition-transform duration-200',
              isOpen && 'rotate-180'
            )}
          >
            <DropDownIcon />
          </div>
        </div>
        {isOpen && (
          <ul className="absolute left-0 top-full z-10 mt-2 max-h-60 w-full overflow-y-auto rounded-2xl border bg-white shadow-shadow4 no-scrollbar">
            {backButton && (
              <li
                onClick={backButton.onClick}
                className="flex cursor-pointer items-center gap-0.5 border-b border-gray-200 px-8 py-4 text-gray-900 font-B01-B"
              >
                <BackIcon />
                {backButton.label}
              </li>
            )}

            {options.map((opt) => (
              <li
                key={opt}
                onClick={() => {
                  onSelect(opt);
                  if (!keepOpenOnSelect) toggle();
                }}
                className={`cursor-pointer px-5 py-6 font-B01-M hover:text-purple-500 ${
                  value === opt ? 'text-purple-500' : 'text-gray-400'
                }`}
              >
                {opt}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
