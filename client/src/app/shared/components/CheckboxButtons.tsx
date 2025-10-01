import { useEffect, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";

type Props = {
  items: string[];
  checked: string[];
  onChange: (items: string[]) => void;
};

export default function CheckboxButtons({ items, checked, onChange }: Props) {
  const [checkedItems, setCheckedItems] = useState<string[]>(checked);

  useEffect(() => {
    setCheckedItems(checked);
  }, [checked]);

  const handleToggle = (value: string) => () => {
    const exists = checkedItems.includes(value);
    const updatedChecked = exists
      ? checkedItems.filter((item) => item !== value)
      : [...checkedItems, value];

    setCheckedItems(updatedChecked);
    onChange(updatedChecked);
  };

  return (
    <FormGroup>
      {items.map((item) => (
        <FormControlLabel
          key={item}
          control={
            <Checkbox
              color="secondary"
              checked={checkedItems.includes(item)}
              onClick={handleToggle(item)}
              sx={{ py: 0.7 }}
            />
          }
          label={item}
        />
      ))}
    </FormGroup>
  );
}
