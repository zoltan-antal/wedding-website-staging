import React from 'react';

interface RadioCheckboxProps {
  checked?: boolean;
  name: string;
  value?: string | number;
  onYes: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNo: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  trueLabel: string;
  falseLabel: string;
  required?: boolean;
  markedRequired?: boolean;
}

const RadioCheckbox = ({
  checked,
  name,
  value,
  onYes,
  onNo,
  label,
  trueLabel,
  falseLabel,
  required,
  markedRequired,
}: RadioCheckboxProps) => {
  return (
    <fieldset>
      <legend>
        {label.split('\n').map((line, index, array) => (
          <React.Fragment key={index}>
            {line}
            {index === 0 && markedRequired && <span>*</span>}
            {index < array.length - 1 && <br />}
          </React.Fragment>
        ))}
      </legend>
      <label>
        <input
          type="radio"
          name={name}
          value={value}
          checked={checked === undefined ? false : checked}
          onChange={onYes}
          required={!!required}
        />
        {trueLabel}
      </label>
      <label>
        <input
          type="radio"
          name={name}
          value={value}
          checked={checked === undefined ? false : !checked}
          onChange={onNo}
          required={!!required}
        />
        {falseLabel}
      </label>
    </fieldset>
  );
};

export default RadioCheckbox;
