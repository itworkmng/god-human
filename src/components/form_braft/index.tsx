import BraftEditor from "braft-editor";
import { FC } from "react";

const TextEditorForm: FC<{
  value: string;
  setValue: (data: any) => void;
  disabled?: boolean;
}> = ({ value, disabled = false, setValue }) => {
  return (
    <BraftEditor
      value={value as any}
      onChange={disabled ? () => {} : setValue}
      style={{
        border: "1px solid #E6E6FA",
        borderRadius: "4px",
        backgroundColor: "#fff",
      }}
      language={"en"}
    />
  );
};

export default TextEditorForm;
