import React from 'react';
import PropTypes from 'prop-types';
import {Stack, TextField} from '@mui/material';
import {useField} from '@formiz/core';

type TextInputType = {
  label: string;
  color?: string;
  name: string;
  required?: boolean;
  defaultValue?: string | Date | number;
  type?: string;
  validations?: object[];
  sx?: object;
}

export default function TextInput(props: TextInputType) {
  const {errorMessage, isValid, isSubmitted, setValue, value} =
    useField(props);
  const [isTouched, setIsTouched] = React.useState(false);
  const showError = !isValid && (isTouched || isSubmitted);

  const {label, name, required, sx = {}, type = 'text', defaultValue = null, validations = []} = props;

  // @ts-ignore
  return (
    <Stack spacing="0.5rem">
      <TextField
        type={type}
        helperText={errorMessage}
        error={showError}
        variant="outlined"
        required={required}
        id={name}
        label={label}
        name={name}
        value={value ?? ''}
        onChange={(e) => setValue(e.target.value)}
        onBlur={() => setIsTouched(true)}
        aria-invalid={showError}
        aria-required={!!required}
        defaultValue={defaultValue}
        validations={validations}
        sx={{...sx}}
      />
    </Stack>
  );
}

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  defaultValue: PropTypes.string,
};
