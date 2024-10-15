import React from 'react';

interface RadioGroup {
  name: string;
  label: string;
  entries: { checked?: boolean; value?: string | number; label: string }[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  markedRequired?: boolean;
}

const RadioGroup = ({
  name,
  onChange,
  label,
  entries,
  required,
  markedRequired,
}: RadioGroup) => {
  return (
    <fieldset>
      <legend>
        {label.split('\n').map((line, index, array) => (
          <React.Fragment key={index}>
            {index !== 0 && line}
            {index === 0 && (
              <span className="first-line">
                {line}
                {markedRequired && <span>*</span>}
              </span>
            )}
            {index < array.length - 1 && <br />}
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
            required={!!required}
          />
          {entry.label}
        </label>
      ))}
    </fieldset>
  );
};

export default RadioGroup;
