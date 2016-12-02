import React from 'react';

const ReplyTopic=React.createClass({
    sendReply(){
        this.sendRequest('https://cnodejs.org/api/v1/topic/'+this.props.topicID+'/replies',
        localStorage.getItem('userToken'),
        document.querySelector('.content_area').value,
        'accesstoken='+token+'&content='+content,this.replyCallBack);
    },
    replyCallBack(data){
        if(data.success){
            window.location.reload();
        }
    },
    sendRequest(url,token,content,format,callback){   
        fetch(url,{
            method: 'post',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
             },
            body: format
        }).then((result)=>{
            return result.json().then((data)=>{
                callback();
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
                            <button type="button" onClick={this.sendReply} className="reply_btn common-btn">回复</button>
                        </div>
                    </div>
                </div>
    },
});
module.exports=ReplyTopic;