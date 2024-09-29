interface RadioCheckboxProps {
  checked: boolean;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  trueLabel: string;
  falseLabel: string;
}

const RadioCheckbox = ({
  checked,
  name,
  onChange,
  label,
  trueLabel,
  falseLabel,
}: RadioCheckboxProps) => {
  return (
    <fieldset>
      <legend>{label}</legend>
      <label>
        <input
          type="radio"
          name={name}
          value="true"
          checked={checked}
          onChange={onChange}
        />
        {trueLabel}
      </label>
      <label>
        <input
          type="radio"
          name={name}
          value="false"
          checked={!checked}
          onChange={onChange}
        />
        {falseLabel}
      </label>
    </fieldset>
  );
};

export default RadioCheckbox;
