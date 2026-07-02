import { Dispatch, SetStateAction } from "react";
import { FormControlLabel, FormGroup, Switch } from "@mui/material";
import styles from "../page.module.css";

export function RotateHorizontalSwitch({
  isToggled,
  setIsToggled,
}: {
  isToggled: boolean;
  setIsToggled: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={isToggled}
              onChange={() => setIsToggled(!isToggled)}
            />
          }
          label="Rotate Horizontally"
        />
      </FormGroup>
  );
}
