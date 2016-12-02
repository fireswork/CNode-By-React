import React from 'react';

const ReplyTopic=React.createClass({
    sendReply(){
        this.sendRequest(localStorage.getItem('userToken'),document.querySelector('.content_area').value);
    },
    sendRequest(token,content){   
        fetch('https://cnodejs.org/api/v1/topic/'+this.props.topicID+'/replies',{
            method: 'post',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
             },
            body: 'accesstoken='+token+'&content='+content
        }).then((result)=>{
            return result.json().then((data)=>{
                if(data.success){
                    window.location.reload();
                }
            })
        })
    },
    render(){
        return <div className="panel">
                    <div className="replyTopic">
                        <div className="header">
                            添加回复
                        </div>
                        <div className="inner">
                            <textarea className="content_area"></textarea>
                            <button type="button" onClick={this.sendReply} className="reply_btn">回复</button>
                        </div>
                    </div>
                </div>
    },
});
module.exports=ReplyTopic;