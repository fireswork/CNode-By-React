import React from 'react';
import Header from '../component/public/header.js';
import Breadcrumbs from '../component/public/Breadcrumbs.js';
import Author from '../component/detail/author.js';
import swal from 'sweetalert';
import { Link } from 'react-router';

const ReportTopic=React.createClass({
    getInitialState(){
        return {isLogin: localStorage.getItem('userToken')?true:false,data: '',collect_topic:''};
    },
    check(){
        const tab=document.querySelector('[name=tab]').value;
        const title=document.querySelector('[name=title]').value;
        const content=document.querySelector('[name=content]').value;
        const token=localStorage.getItem('userToken');
        if(tab==='0'){
            swal('请先选择板块', '', 'error');
        }else if(!title || title.length<10){
            swal('标题字数十字以上','','error');
        }else if(!content){
            swal('内容不能为空','','error');
        }else{
            const format='accesstoken='+token+'&tab='+tab+'&title='+title+'&content='+content;
            this.sendRequest(format);
        }
    },
    sendRequest(format){   
        fetch('https://cnodejs.org/api/v1/topics/',{
            method: 'post',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
             },
            body: format
        }).then((result)=>{
            return result.json().then((data)=>{
                if(data.success){
                    swal({
                        title: "发布话题成功",
                        type: "success",
                        }, function(){
                            document.querySelector('.link-to-detail').click();
                    });                   
                }else{
                    swal(data.error_msg,'','error');
                }
            })
        })
    },
    render(){
        return <div id="container" className="reportTopic">
                    <Header isLogin={this.state.isLogin}/>
                    <div id="main">
                        <div id="sidebar">
                            <Author isAuthor="false" />
                        </div>
                        <div id="content">
                            <form>
                                <input type="hidden" name="accesstoken" value={localStorage.getItem('userToken')}/>
                                <div className="panel">
                                    <Breadcrumbs active="发布话题"/>
                                    <div className="inner">
                                        <div>
                                            <span>选择板块:</span>
                                            <select name="tab">
                                                <option value="0">请选择</option>
                                                <option value="share">分享</option>
                                                <option value="job">招聘</option>
                                                <option value="ask">问答</option>
                                            </select>
                                        </div>
                                        <div>
                                            <input type="text" name="title" placeholder="标题字数十字以上"/>
                                        </div>
                                        <div>
                                            <textarea name="content"></textarea>
                                        </div>
                                        <div>
                                            <button className="reply_btn common-btn" type="button" onClick={this.check}>提交</button>
                                            <Link className="display-none link-to-detail" to="/"></Link>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
               </div>
    }
});
module.exports=ReportTopic;