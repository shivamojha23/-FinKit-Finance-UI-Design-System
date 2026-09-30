import { type InputHTMLAttributes, type ReactNode, useId } from 'react';
import './TextField.css';

export interface TextFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> {
  /** Visible label text. */
  label: string;
  /** Validation / helper message shown below the input. */
  message?: ReactNode;
  /** When true, styles the field and message as an error. */
  error?: boolean;
}

export function TextField({
  label,
  message,
  error = false,
  className,
  ...rest
}: TextFieldProps) {
  const id = useId();
  const messageId = message ? `${id}-msg` : undefined;

  return (
    <div className={`fk-textfield ${error ? 'fk-textfield--error' : ''} ${className ?? ''}`.trim()}>
      <label className="fk-textfield__label" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        className="fk-textfield__input"
        aria-invalid={error || undefined}
        aria-describedby={messageId}
        {...rest}
      />
      {message && (
        <p id={messageId} className="fk-textfield__message" role={error ? 'alert' : undefined}>
          {message}
        </p>
      )}
    </div>
  );
}
