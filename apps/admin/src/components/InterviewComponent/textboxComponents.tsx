import { FC, useState } from "react";

export const InputText: FC = () => {
  const [value, setValue] = useState<string>("test");
  const [isEditing, setIsEditing] = useState<boolean>();

  return (
    <div>
      {!isEditing ? (
        <label htmlFor="" onClick={() => setIsEditing(true)}>
          {value}
        </label>
      ) : (
        <></>
      )}
      {isEditing && (
        <input
          type="text"
          onChange={(e) => {
            if (e.target.value === "Escape") {
              // setTempValue(value);
              setIsEditing(false);
            }
          }}
          onBlur={(e) => {
            setValue(e.target.value);
            setIsEditing(false);
          }}
        />
      )}
    </div>
  );
};
