import React from "react";
import DatePicker, { DatePickerProps } from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useController, UseControllerProps } from "react-hook-form";

type Props = {
  label: string;
  type?: string;
  showLabel?: boolean;
} & UseControllerProps &
  DatePickerProps;

export default function DateInput(props: Props) {
  const { field, fieldState } = useController({ ...props, defaultValue: "" });
  return (
    <div className="flex flex-col">
      <DatePicker
        {...field}
        {...props}
        selected={field.value}
        // onChange={(date) => field.onChange(date)}
        dateFormat="dd MMM yyyy h:mm a"
        showTimeSelect
        placeholderText="Select auction end date"
        className={`rounded-lg w-full flex flex-col ${
          fieldState.error
            ? 'bg-red-50 border-red-500 text-red-900'
            : !fieldState.invalid && fieldState.isDirty
            ? 'bg-green-50 border-green-500 text-green-900'
            : ''
        }`}
      />
      {fieldState.error && (
        <div className="text-red-500 text-sm">{fieldState.error.message}</div>
      )}
    </div>
  );
}
