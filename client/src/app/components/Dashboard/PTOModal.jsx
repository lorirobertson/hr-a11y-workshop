import React, { Fragment } from 'react';
import _ from 'lodash';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import FormControl from '../FormControl';

export default class PTOModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modal: false
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }    

    componentDidMount() {}

    render() {
        return (
            <Fragment>
                <Button
                    block
                    color="info"
                    size="lg"
                    onClick={this.toggle}
                    >Start a new PTO Request
                </Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>New PTO Request</ModalHeader>
                    <ModalBody>
                        <FormControl
                            type="number"
                            id="hours"
                            name="hours"
                            label="Hours"
                            onChange={()=>{}}
                        />
                        <FormControl
                            type="textarea"
                            id="description"
                            name="description"
                            label="Description"
                            onChange={()=>{}}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" outline className="float-left" onClick={this.toggle}>Cancel</Button>
                        <Button color="primary" onClick={this.toggle}>Submit Request!</Button>
                    </ModalFooter>
                </Modal>
            </Fragment>
        );
    }
}