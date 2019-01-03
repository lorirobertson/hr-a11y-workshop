import React from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

export default class FormControl extends React.Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  render() {
    return (
        <FormGroup>
          {/* <label htmlFor={this.props.id}>{this.props.label}</label> */}
          <Input
            id={this.props.id}
            name={this.props.name}
            // aria-label={this.props.label}
            type={this.props.type}
            placeholder={this.props.label}
            defaultValue={this.props.value}
            onChange={this.props.onChange}
          >
            {
              this.props.options ?
                this.props.options.map((opt,index) => <option key={index} value={opt.value}>{opt.label}</option>)
              : null
            }
          </Input>
        </FormGroup>
    )
  }
}