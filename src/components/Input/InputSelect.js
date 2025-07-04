import React, { useEffect, useState } from "react";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "react-select";
import "./style.scss";

const InputSelect = ({
  value,
  data,
  isError,
  errorText,
  minWidth,
  name,
  onChange,
  isDisabled,
  bgcolor,
}) => {
  const [list, setList] = useState([]);
  useEffect(() => {
    if (data) setList(data.map((e) => ({ value: e.id, label: e.name })));
  }, [data]);
  return (
    <>
      <FormControl
        error={isError}
        sx={{
          minWidth: minWidth ? minWidth : "100%",
          bgcolor: bgcolor ? bgcolor : "transparent",
        }}
      >
        <Select
          className={`react-select-container ${isError ? "select-error" : ""}`}
          isDisabled={isDisabled}
          value={value}
          onChange={onChange}
          options={list}
          placeholder={name}
          menuPortalTarget={document.body}
          styles={{
            menuPortal: (base) => ({
              ...base,
              zIndex: 9999,
              borderColor: isError ? "red !important" : "blue",
            }),
          }}
        />
        {isError && <FormHelperText>{errorText}</FormHelperText>}
      </FormControl>
    </>
  );
};

export default InputSelect;
