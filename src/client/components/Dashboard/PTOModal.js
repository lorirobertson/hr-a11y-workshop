import React, { Fragment } from 'react';
import _ from 'lodash';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import FormControl from '../FormControl';

export default class PTOModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modal: false,
            request: {
                type: '',
                hours: '',
                description: ''
            }
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }    

    componentDidMount() {}

    handleChange(e) {
        let state = {};
        state[e.target.name] = e.target.value;

        this.setState({
            request: Object.assign({}, this.state.request, state)
        });
    }

    render() {
        const disableSubmit = (this.state.request.type && this.state.request.hours) ? '' : 'disabled';
        return (
            <Fragment>
                <Button
                    id="openPTOModal"
                    block
                    color="info"
                    size="lg"
                    onClick={this.toggle}
                    >Start a new PTO Request
                </Button>
                <Modal keyboard={false} id="PTORequestModal" isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader>New PTO Request</ModalHeader>
                    <ModalBody>
                        <FormControl
                            type="select"
                            id="type"
                            name="type"
                            label="Type"
                            value={this.state.request.type}
                            onChange={(e)=>this.handleChange(e)}
                            options={[
                                {value: '', label: 'PTO Type - Select one'},
                                {value: 1, label: 'Floating Holiday'},
                                {value: 2, label: 'Sick'},
                                {value: 3, label: 'Vacation'},
                                {value: 4, label: 'Other'},
                            ]}
                        />
                        <FormControl
                            type="number"
                            id="hours"
                            name="hours"
                            label="Hours"
                            value={this.state.request.hours}
                            onChange={(e)=>this.handleChange(e)}
                        />
                        <FormControl
                            type="textarea"
                            id="description"
                            name="description"
                            label="Description"
                            value={this.state.request.description}
                            onChange={(e)=>this.handleChange(e)}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <div
                            id="fake-cancel-button"
                            className="btn btn-outline-danger"
                            onClick={this.toggle}
                            > Cancel
                        </div>
                        <div
                            id="fake-submit-button"
                            className={`btn btn-primary ${disableSubmit}`}
                            onClick={disableSubmit ? null : this.toggle}
                            > Submit Request!
                        </div>
                        {/* <Button
                            color="danger"
                            outline
                            className="float-left"
                            onClick={this.toggle}>
                            Cancel
                        </Button>
                        <Button
                            id="submitPTORequest"
                            color="primary"
                            onClick={this.toggle}>
                            Submit Request!
                        </Button> */}
                    </ModalFooter>
                </Modal>
            </Fragment>
        );
    }
}