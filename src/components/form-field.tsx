import type { FieldError, UseFormRegisterReturn } from 'react-hook-form';

interface Props {
  label: string;
  error?: FieldError;
  register: UseFormRegisterReturn;
  type?: string;
  isTextArea?: boolean;
  disabled?: boolean;
}

export const FieldGroup = ({ label, error, register, type = "text", isTextArea = false, disabled = false }: Props) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
    {isTextArea ? (
      <textarea
        {...register}
        rows={4}
        disabled={disabled}
        className={`w-full p-2 border rounded-md outline-none transition-colors
          ${error ? 'border-red-500' : 'border-slate-300'}
          ${disabled ? 'bg-slate-100 cursor-not-allowed opacity-60' : 'bg-white'}`}
      />
    ) : (
      <input
        type={type}
        {...register}
        disabled={disabled}
        className={`w-full p-2 border rounded-md outline-none transition-colors
          ${error ? 'border-red-500' : 'border-slate-300'}
          ${disabled ? 'bg-slate-100 cursor-not-allowed opacity-60' : 'bg-white'}`}
      />
    )}
    {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
  </div>
);