import React, { Fragment } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import TableRender from '../TableRender';
import request from '../../_utilities/request';

export default class TableList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            selectedWeek: '',
            totalHours: 0
        }

        this.listGrouped = this.listGrouped.bind(this);
        this.listDetails = this.listDetails.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        const match = this.props.match;
        const selectedWeek = match.params.date !== undefined ? match.params.date : '';
        let filter = match.params.date !== undefined ? {params: {date_gte: match.params.date, date_lte: moment(new Date(match.params.date)).add(6, 'days').format('MM-DD-YYYY')}} : null;
        let sort = '?_sort=date:desc';
        let route = filter ? `/timesheets` : `/timesheets/grouped${sort}`;

        request.get(route, filter)
            .then(resp => {
                let data = resp.data;
                
                this.setState({
                    data,
                    selectedWeek
                })
            })
            .catch( err => {
                console.log(err);
            });        
    }    
    
    selectWeek(week) {
        this.setState({
            selectedWeek: week
        });
    }

    listGrouped() {
        return {
            thead: ['Week Start','Total Hours','Actions'],
            tbody: _.map(this.state.data, row => {
                row = _.pick(row, ['week', 'hours']);
                row.week = moment(row.week).format('MM/DD/YYYY');
                let actions = {
                    actions: <div>
                                <Button
                                    size="sm"
                                    color="info"
                                    tag={Link}
                                    to={`/timesheets/week/${moment(new Date(row.week)).format('MM-DD-YYYY')}`}
                                >View Entries</Button>
                                {' '}
                                <Button
                                    size="sm"
                                    color="success"
                                    tag={Link}
                                    to={`/timesheets/week/${moment(new Date(row.week)).format('MM-DD-YYYY')}/new`}
                                >Add Entry</Button>
                            </div>
                }
                return _.assign(row, actions);
            }),
            tfoot:[]
        }
    }

    sumHours(e) {
        return (e.sunday + e.monday + e.tuesday + e.wednesday + e.thursday + e.friday + e.saturday);
    }

    listDetails() {
        let weekData = this.state.data;
        if (weekData) {
            let table = {
                thead: ['Project','Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Hours','Actions'],
                tbody: _.map(weekData, row => {
                    let id = row.id;
                    row = _.pick(row, ['project','sunday','monday','tuesday','wednesday','thursday','friday','saturday', 'sumHours']);
                    Object.keys(row).forEach(key => {
                        if ( key.indexOf('day') && row[key] === null )
                            row[key] = 0
                    });
                    row.sumHours = this.sumHours(row);
                    let actions = {
                        actions: <div className="text-right">
                                    <Button
                                        size="sm"
                                        color="primary"
                                        tag={Link}
                                        to={`/timesheets/${id}/edit`}
                                    >Edit</Button>
                                    {' '}
                                    <Button
                                        size="sm"
                                        color="danger"
                                        onClick={()=>this.deleteTimesheet(id)}
                                    >Remove</Button>
                                </div>
                    }
                    return _.assign(row, actions);
                })
            }
            
            table.tfoot = [
                'Hour Totals: ',
                _.sumBy(table.tbody, 'sunday'),
                _.sumBy(table.tbody, 'monday'),
                _.sumBy(table.tbody, 'tuesday'),
                _.sumBy(table.tbody, 'wednesday'),
                _.sumBy(table.tbody, 'thursday'),
                _.sumBy(table.tbody, 'friday'),
                _.sumBy(table.tbody, 'saturday'),
                _.sumBy(table.tbody, 'sumHours'),
                null
            ];

            return table;

        }
        
        return {thead:[],tbody:[],tfoot:[]};
    }

    deleteTimesheet(id) {
        if ( window.confirm('Are you sure you want to delete this record?') )
            request.delete(`/timesheets/${id}`)
                .then((resp)=>{
                    this.fetchData();
                })
                .catch((err)=>console.log(err))
    }

    render() {
        const table = (this.state.selectedWeek).length ? this.listDetails() : this.listGrouped();
        const backButton = (this.state.selectedWeek).length ? <Button size="sm" tag={Link} to={`/timesheets`} aria-label="Back to timesheets list"><span className="fa fa-chevron-left"></span></Button> : '';
        const newPath = (this.state.selectedWeek).length ? `/timesheets/week/${moment(new Date(this.state.selectedWeek)).format('MM-DD-YYYY')}/new` : `/timesheets/new`;
        return (
            <Fragment>
                <h1>
                    Timesheets
                    { 
                        this.state.selectedWeek ?
                            ' - ' + moment(new Date(this.state.selectedWeek)).format('MM/DD/YYYY')
                        : 
                            ''
                    }
                </h1>
                <div style={{marginBottom: '1em'}} className="clearfix">
                    {backButton}
                    {' '}
                    <Button
                        size="sm"
                        color="success"
                        className="float-right"
                        tag={Link}
                        to={newPath}
                        aria-label="Add a new timesheet"
                    >
                        <span className="fa fa-plus"></span>
                    </Button>
                </div>
                <TableRender
                    thead={table.thead}
                    tbody={table.tbody}
                    tfoot={table.tfoot}
                />
            </Fragment>
        )
    }
}