import React from 'react';
import { FormGroup, Label, Input, } from 'reactstrap';
import DatePicker from 'react-datepicker';
import { ScenarioAttributes } from './Scenario';

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
            type={type}
            placeholder={label}
            defaultValue={value}
            onChange={onChange}
            {...ScenarioAttributes("stage2", {
              "aria-label": label,
            })}
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