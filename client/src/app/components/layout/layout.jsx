import React from 'react';
import {Sidebar, Topbar} from '../navigation';

export default class Layout extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isSidebarOpen: false
        };
    }

    toggleSidebar() {
        this.setState({
            isSidebarOpen: !this.state.isSidebarOpen
        });
    }
        
    render() {
        const topbar = (this.props.useTopbar) ?
                            <Topbar toggle={()=>this.toggleSidebar()} />
                            : '';
        const sidebar = (this.props.useSidebar) ?
                            <Sidebar toggle={()=>this.toggleSidebar()} open={this.state.isSidebarOpen} />
                            : '';
        return (
            <div id="app-wrapper">
                {sidebar}
                <div id="overlay"></div>
                <div id="page-wrapper">
                    {topbar}
                    <main id="content-wrapper" aria-label="Main Content" className={this.props.className}>
                        {this.props.children}
                    </main>
                </div>
            </div>
        );
    }
}

Layout.defaultProps = {
    className: 'box-shadow'
}