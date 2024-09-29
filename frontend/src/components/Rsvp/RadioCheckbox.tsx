interface RadioCheckboxProps {
  checked: boolean;
  name: string;
  value: string | number;
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
      <legend>{label}</legend>
      <label>
        <input
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onChange={onYes}
        />
        {trueLabel}
      </label>
      <label>
        <input
          type="radio"
          name={name}
          value={value}
          checked={!checked}
          onChange={onNo}
        />
        {falseLabel}
      </label>
    </fieldset>
  );
};

export default RadioCheckbox;
