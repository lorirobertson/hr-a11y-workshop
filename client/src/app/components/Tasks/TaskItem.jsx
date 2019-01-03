import React from 'react';

export default class TaskItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <li className="task-item">
                <label>
                    <input
                        type="checkbox"
                        id={this.props.id}
                        onChange={this.props.onChange}
                        checked={this.props.completed}
                    />

                    {' '}

                    <span style={{textDecoration: this.props.completed ? 'line-through' : ''}}>
                        {this.props.label}
                    </span>
                </label>

                <a 
                    href="#"
                    className="delete-task btn btn-danger btn-sm"
                    onClick={this.props.deleteHandler}
                >X</a>
            </li>
        );
    }
}

TaskItem.defaultProps = {
    id: '_blank_',
    label: null,
    completed: false,
    created: null,
    onChange: () => {},
    deleteHandler: () => {}
}