import React from 'react';
import _ from 'lodash';
import { Table } from 'reactstrap';

export default class TableRender extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Table className="table-hover">
                <thead className="thead-dark">
                    <tr>
                        {this.props.thead.map((item,index)=> <th key={index}>{item}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.tbody
                            .map((row,index) => {
                                return <tr key={index}>
                                    {
                                        Object.keys(row).map(prop => <td key={index++}>{row[prop]}</td>)
                                    }
                                </tr>
                            })
                    }
                </tbody>
                <tfoot>
                    {
                        ( this.props.tfoot ) ? 
                            <tr>{this.props.tfoot.map((item,index)=> <td key={index}>{item}</td>)}</tr>
                        : null
                    }
                </tfoot>
            </Table>
        )
    }
}