import { useController, UseControllerProps } from "react-hook-form";
import { Label, TextInput } from "flowbite-react"; // Assuming flowbite-react for styling

type Props = {
  label: string;
  type?: string;
  showLabel?: boolean;
} & UseControllerProps; // UseControllerProps is used to type React Hook Form control

export default function Input(props: Props) {
  const { field, fieldState } = useController({ ...props, defaultValue: "" }); // Extract field methods from useController

  return (
    <div className="mb-3">
      {props.showLabel && (
        <div className="mb-2 block">
          <Label htmlFor={field.name} className="text-gray-700">
            {props.label}
          </Label>
        </div>
      )}
      <TextInput
        {...props}
        {...field} // spread field values like name, onChange, onBlur, value, etc.
        type={props.type}
        placeholder={props.label}
        color={
          fieldState.error ? "failure" : !fieldState.isDirty ? "success" : "default"
        }
      />
      {fieldState.error && (
        <p className="text-red-500 text-xs">{fieldState.error.message}</p>
      )}
    </div>
  );
}
