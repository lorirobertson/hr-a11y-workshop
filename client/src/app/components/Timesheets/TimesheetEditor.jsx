import React, { Fragment } from 'react';
import moment from 'moment';
import auth from '../../_utilities/auth';
import { Alert, Form, InputGroup, InputGroupAddon, Label, FormText, Input, Button } from 'reactstrap';
import FormControl from '../FormControl';
import request from '../../_utilities/request';

const initialDataState = {
    date: moment().startOf('week').format('MM/DD/YYYY'),
    project: '',
    notes: '',
    sunday: null,
    monday: null,
    tuesday: null,
    wednesday: null,
    thursday: null,
    friday: null,
    saturday: null
};

export default class TimeSheetEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEdit: (this.props.match.params 
                        && this.props.match.params.id !== undefined),
            weekOf: moment().startOf('week').format('MM/DD/YYYY'),
            data: initialDataState,
            isDateInputVisible: false,
            redirect: false,
            alert: {
                visible: false,
                color: null,
                message: null
            }
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.dismissAlert = this.dismissAlert.bind(this);
        this.changeWeekOf = this.changeWeekOf.bind(this);
    }

    componentDidMount() {
        const match = this.props.match;
        if ( this.state.isEdit ) {
            request.get(`/timesheets/${match.params.id}`)
                .then((resp)=>{
                    let data = _.pick(resp.data,['date','project','notes','sunday','monday','tuesday','wednesday','thursday','friday','saturday'])
                    data.date = moment(new Date(data.date)).format('MM/DD/YYYY');
                    let weekOf = data.date;
                    this.setState({data,weekOf})
                })
        } else if ( match.params.date ) {
            let weekOf = match.params.date;
            this.setState({weekOf})
        }
    }

    handleChange(e) {
        let state = {};
        let days = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];
        let value = ( days.indexOf(e.target.name) !== -1 ) ? parseInt(e.target.value) : e.target.value;

        state[e.target.name] = value;

        this.setState({
            data: Object.assign({}, this.state.data, state)
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        let data = this.state.data;
        data.user = auth.get('user').id;

        let requestPromise = this.state.isEdit ? 
                                request.put(`/timesheets/${this.props.match.params.id}`, data)
                            :
                                request.post(`/timesheets`, data)
                            ;
        requestPromise
            .then((resp)=>{
                if ( this.state.isEdit ) {
                    this.setState({
                        redirect: true,
                        alert: {
                            color: 'success',
                            message: 'Your timesheet has been saved!'
                        }
                    })
                } else {
                    this.setState({
                        data: initialDataState,
                        alert: {
                            color: 'success',
                            message: 'Your timesheet has been saved!'
                        }
                    });

                    document.forms.timesheetForm.reset();
                }
            })
            .catch((err)=>{
                console.log(err)
            });
    }

    dismissAlert() {
        this.setState({
            alert: {
                visible: false
            }
        })
    }

    showDateInput() {
        this.setState({
            isDateInputVisible: true
        });
    }

    changeWeekOf(e) {
        let date = moment(new Date(document.getElementById('weekOf').value));
        if ( date.isValid() ){
            let setDate = date.startOf('week');
            this.setState({
                weekOf: setDate,
                isDateInputVisible: false,
                data: Object.assign({}, this.state.data, {date: setDate})
            })
        }
    }

    render() {
        const d = moment(new Date(this.state.weekOf));
        let startDate = moment(new Date(this.state.weekOf)).format('MM/DD/YYYY');
        let endDate = moment(new Date(this.state.weekOf)).endOf('week').format('MM/DD/YYYY');

        const fields = [
            {id: 'project', type: 'text', label: 'Project Name', data: this.state.data.project},
            {id: 'notes', type: 'textarea', label: 'Notes', data: this.state.data.notes},
            {id: 'sunday', type: 'number', label: `Sunday - ${d.format('MM/DD/YYYY')}`, data: this.state.data.sunday},
            {id: 'monday', type: 'number', label: `Monday - ${d.add(1, 'days').format('MM/DD/YYYY')}`, data: this.state.data.monday},
            {id: 'tuesday', type: 'number', label: `Tuesday - ${d.add(1, 'days').format('MM/DD/YYYY')}`, data: this.state.data.tuesday},
            {id: 'wednesday', type: 'number', label: `Wednesday - ${d.add(1, 'days').format('MM/DD/YYYY')}`, data: this.state.data.wednesday},
            {id: 'thursday', type: 'number', label: `Thursday - ${d.add(1, 'days').format('MM/DD/YYYY')}`, data: this.state.data.thursday},
            {id: 'friday', type: 'number', label: `Friday - ${d.add(1, 'days').format('MM/DD/YYYY')}`, data: this.state.data.friday},
            {id: 'saturday', type: 'number', label: `Saturday - ${d.add(1, 'days').format('MM/DD/YYYY')}`, data: this.state.data.saturday}
        ];

        return (
            <Fragment>
                <h1>{ (this.state.isEdit)? 'Edit' : 'Create' } Timesheet</h1>
                <p className="text-muted h4">
                    Week of {startDate} - {endDate}
                    {' '}
                    <Button
                        id="btnChangeWeek"
                        type="button"
                        color="link"
                        size="sm"
                        onClick={()=>this.showDateInput()}
                        disabled={this.state.isDateInputVisible}
                    >[ change ]</Button>
                </p>

                <hr />
                
                {this.state.isDateInputVisible ?
                    <div id="weekOfSelector">
                        <Label for="weekOf" className="font-weight-bold">Week Of</Label>
                        <InputGroup>
                            <Input id="weekOf" name="weekOf" defaultValue={moment(new Date(this.state.weekOf)).format('MM/DD/YYYY')} />
                            <InputGroupAddon addonType="append">
                                <Button color="success" onClick={this.changeWeekOf}>Done</Button>
                            </InputGroupAddon>
                        </InputGroup>
                        <FormText color="muted">Enter a date in MM/DD/YYY format to find the start date of that week.</FormText>
                    </div>
                : null}

                <Alert
                    color={this.state.alert.color}
                    isOpen={this.state.alert.visible}
                    toggle={this.dismissAlert}
                >{this.state.alert.message}</Alert>

                <Form id="timesheetForm" onSubmit={this.handleSubmit} style={{display: this.state.isDateInputVisible ? 'none' : 'block'}}>
                    {
                        fields.map((field, index) => 
                            <FormControl
                                key={index}
                                id={field.id}
                                name={field.id}
                                type={field.type}
                                label={field.label}
                                value={field.data}
                                options={field.options}
                                onChange={this.handleChange}
                            />
                        )
                    }

                    <Button type="submit" color="success">Save</Button>
                    <Button
                        type="button"
                        color="secondary"
                        className="float-right"
                        onClick={()=>{
                            this.props.history.goBack();
                        }}
                    >Cancel</Button>
                </Form>
            </Fragment>
        )
    }
}