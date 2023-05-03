import * as React from "react";
import ButtonApp, {ButtonProps as ButtonPropsApp} from "@mui/material/Button";

interface ButtonProps extends ButtonPropsApp {
  label: string;
  onClick: () => void;
}

export const Button: React.FC<ButtonProps> = (props) => {
  const {label, variant = "contained", onClick, ...rest} = props;
  return (
    <ButtonApp variant={variant} onClick={onClick} {...rest}>
      {label}
    </ButtonApp>
  );
};
