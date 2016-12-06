import React from 'react';
import { Link } from 'react-router';

const Header=React.createClass({
    logOut(){
        localStorage.removeItem('userToken');
        window.location.reload();
    },
    render(){
        return <header className="header">
                   <div className="header_wrap">
                         <span className="logo"><Link to="/" /></span>
                            <nav className={this.props.isLogin?'navbar':'navbar display-none'}>
                                <ul>
                                    <li><Link to="/">首页</Link></li>
                                    <li><Link to="/message">未读消息</Link></li>
                                    <li onClick={this.logOut}><Link to="/">退出</Link></li>
                                </ul>
                            </nav>
                   </div>
               </header>
    }
});
module.exports=Header;