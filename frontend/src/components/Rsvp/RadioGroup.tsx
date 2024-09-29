import React from 'react';

interface RadioGroup {
  name: string;
  label: string;
  entries: { checked?: boolean; value?: string | number; label: string }[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioGroup = ({ name, onChange, label, entries }: RadioGroup) => {
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
      {entries.map((entry) => (
        <label key={entry.value}>
          <input
            type="radio"
            name={name}
            value={entry.value}
            checked={entry.checked === undefined ? false : entry.checked}
            onChange={onChange}
          />
          {entry.label}
        </label>
      ))}
    </fieldset>
  );
};

export default RadioGroup;
