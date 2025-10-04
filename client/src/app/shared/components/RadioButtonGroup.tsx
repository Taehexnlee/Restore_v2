import type { ChangeEvent } from "react";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

export type RadioOption = {
  value: string;
  label: string;
};

type Props = {
  options: RadioOption[];
  selectedValue: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export default function RadioButtonGroup({ options, selectedValue, onChange }: Props) {
  return (
    <FormControl component="fieldset" fullWidth>
      <RadioGroup value={selectedValue} onChange={onChange} sx={{ my: 0 }}>
        {options.map(({ value, label }) => (
          <FormControlLabel
            key={value}
            value={value}
            control={<Radio color="secondary" />}
            label={label}
            sx={{ py: 0.7 }}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
