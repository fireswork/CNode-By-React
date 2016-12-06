import React from 'react';
import { Link } from 'react-router';

const Breadcrumbs=React.createClass({
    render(){
        return <div className="header">
                    <ul className="breadcrumb">
                        <li><Link to="/">主页</Link><span className="divider">/</span></li>
                        <li className="active">新消息</li>
                    </ul>
                </div>
    }
});
module.exports=Breadcrumbs;