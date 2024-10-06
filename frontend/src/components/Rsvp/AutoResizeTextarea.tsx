import { useEffect, useRef } from 'react';

interface AutoResizeTextareaProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const AutoResizeTextarea = ({
  name,
  value,
  onChange,
}: AutoResizeTextareaProps) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  return (
    <textarea
      className="auto-resize"
      ref={textareaRef}
      name={name}
      value={value}
      onChange={onChange}
    />
  );
};

export default AutoResizeTextarea;
