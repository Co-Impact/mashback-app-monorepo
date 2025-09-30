import { FC, useState } from "react";

interface Prop {
  value: string;
  onChange: (str: string) => void;
}

export const EditText: FC<Prop> = ({ value, onChange }) => {
  const [text, setText] = useState<string>(value);
  const [isEditable, setIsEditable] = useState<boolean>(true);

  const handleOnChange = (str: string) => {
    setText(str);
  };

  const toggleVisbility = () => {
    setIsEditable(!isEditable);
    onChange(text);
  };

  const handleOnKeyDown = (key: string) => {
    if (key === "Escape") {
      setText(value);
      toggleVisbility();
    }
  };
  return (
    <div>
      {isEditable ? (
        <label onClick={toggleVisbility}>{text}</label>
      ) : (
        <input
          onChange={(event) => handleOnChange(event.target.value)}
          type={"text"}
          value={text}
          onBlur={() => toggleVisbility()}
          onKeyDown={(event) => handleOnKeyDown(event.key)}
        />
      )}
    </div>
  );
};
