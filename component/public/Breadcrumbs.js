import React from 'react';
import { Link } from 'react-router';

const Breadcrumbs=React.createClass({
    render(){
        return <div className="header">
                    <ul className="breadcrumb">
                        <li><Link to="/">主页</Link><span className="divider">/</span></li>
                        <li className={this.props.active?'active':'display-none'}>{this.props.active}</li>
                    </ul>
                </div>
    }
});
module.exports=Breadcrumbs;