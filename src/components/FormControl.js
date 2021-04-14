import React from 'react';
import { FormGroup, Label, Input, } from 'reactstrap';
import DatePicker from 'react-datepicker';

const FormControl = ({
  id,
  name,
  label,
  type="text",
  value,
  options,
  onChange=()=>{},
}) => {
  return (
    <FormGroup>
      {/* <label htmlFor={id}>{label}</label> */}
      {
        (type === 'datepicker') ?
          <DatePicker
            id={id}
            name={name}
            //label={label}
            // aria-label={label}
            className="form-control"
            placeholderText={label}
          />
          :
          <Input
            id={id}
            name={name}
            aria-no_going_to_work={label}
            type={type}
            placeholder={label}
            defaultValue={value}
            onChange={onChange}
          >
            {
              options ?
                options.map((opt, index) => <option key={index} value={opt.value}>{opt.label}</option>)
                : null
            }
          </Input>
      }
    </FormGroup>
  );
}

export default FormControl;