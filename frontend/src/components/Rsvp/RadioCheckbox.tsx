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
}: RadioCheckboxProps) => {
  return (
    <fieldset>
      <legend>
        {label.split('\n').map((line, index) => (
          <React.Fragment key={index}>
            {line}
            {index < label.length - 1 && <br />}
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
        />
        {falseLabel}
      </label>
    </fieldset>
  );
};

export default RadioCheckbox;
