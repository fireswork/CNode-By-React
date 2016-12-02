//detail-reply
import React from 'react';

const Reply=React.createClass({
    render(){
        return <div className="panel">
                    <div className="header"> 
                        <span className="col_fade">{this.props.data.length} 回复</span>
                    </div>                       
                        {
                            this.props.data.map((_this,index)=>{
                                return <div className="cell reply_area reply_item">
                                            <a id={_this.id} className="author_link"></a>
                                            <div className="author_content">
                                                <a href="#" className="user_avatar">
                                                    <img src={_this.author.avatar_url}/>
                                                </a>
                                                <div className="user_info">
                                                    <a className="dark reply_author" href="/user/captainblue2013">{_this.author.loginname}</a>
                                                    <a className="reply_time" href={'#'+_this.id}>{index+1}楼 • {this.props.timeFormat(_this.create_at)}</a>
                                                </div>
                                            </div>
                                            <div className="reply_content" dangerouslySetInnerHTML={{__html: _this.content}}></div>
                                        </div>
                            })
                        }             
                </div>
    }
});
module.exports=Reply;