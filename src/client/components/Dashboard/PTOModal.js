import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import FormControl from '../FormControl';

const PTOModal = ({

}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [inpType, setInpType] = useState(null);
    const [inpHours, setInpHours] = useState(null);
    const [inpDesc, setInpDesc] = useState(null);
    const [disableSubmit, setDisableSubmit] = useState(true);

    useEffect(() => {
        if ( inpType && inpHours && inpDesc ) {
            setDisableSubmit(false);
        } else {
            setDisableSubmit(true);
        }
    }, [inpType, inpHours, inpDesc]);

    function clearForm() {
        setInpType(null);
        setInpHours(null);
        setInpDesc(null);
        setIsOpen(false);
    }

    return (
        <>
            <Button
                id="openPTOModal"
                block
                color="info"
                size="lg"
                onClick={() => setIsOpen(!isOpen)}
                >Start a new PTO Request
            </Button>

            <Modal
                keyboard={false}
                id="PTORequestModal"
                isOpen={isOpen}
                toggle={() => setIsOpen(!isOpen)}
            >
                    <ModalHeader>New PTO Request</ModalHeader>
                    <ModalBody>
                        <FormControl
                            type="select"
                            id="type"
                            name="type"
                            label="Type"
                            value={inpType}
                            onChange={(e) => setInpType(e.target.value)}
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
                            value={inpHours}
                            onChange={(e)=> setInpHours(e.target.value)}
                        />
                        <FormControl
                            type="textarea"
                            id="description"
                            name="description"
                            label="Description"
                            value={inpDesc}
                            onChange={(e)=>setInpDesc(e.target.value)}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <div
                            id="fake-cancel-button"
                            className="btn btn-outline-danger"
                            onClick={() => setIsOpen(!isOpen)}
                            > Cancel
                        </div>
                        <div
                            id="fake-submit-button"
                            className={`btn btn-primary ${disableSubmit ? 'disabled' :''}`}
                            onClick={disableSubmit ? () => null : () => clearForm()}
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
        </>
    );
}

export default PTOModal;