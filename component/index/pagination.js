//pagination
import React from 'react';

const str='... « »';
const paginationDataArr=['«','1','2','3','4','5','...','»'];
const Pagination=React.createClass({
    getInitialState(){
        return {paginationData: paginationDataArr};
},
    getCurrentPage(event){
        const thisPage=event.target.innerText;
        if(str.indexOf(thisPage)===-1){
            //is-repeat-request?
            if(thisPage!=this.state.pageNum){
                this.setPaginationNum(Number(thisPage));
                this.setPaginationStyle(event.target);
                this.props.sendRequest('https://cnodejs.org/api/v1/topics?page='+Number(thisPage)+'&tab='+this.props.tab+'&limit='+20);
            }            
        }         
    },
    //reset-pagination
    componentWillReceiveProps(newProps){       
    if(newProps.tab!=this.props.tab){
            this.setState({
                paginationData: paginationDataArr
            });         
                Array.from(document.querySelector('.pagination').querySelectorAll('a')).forEach((_this,index)=>{       
                _this.setAttribute('class','');     
        }); 
        this.refs.firstLi.setAttribute('class','active');               
    }
},
    //set-active-li
    setPaginationStyle(page){
            Array.from(document.querySelector('.pagination').querySelectorAll('a')).forEach((_this,index)=>{       
             if(Number(page.innerText)<=3){
                page.setAttribute('class','active');
                 _this.setAttribute('class','');
             }
             else{
                 index===4?_this.setAttribute('class','active'):_this.setAttribute('class',''); 
             }       
        });       
},
    //update-pagination-num
    setPaginationNum(page){
        if(page >3){
            this.setState({
                paginationData: ['«','...',page-2,page-1,page,page+1,page+2,'...','»']
            })
        }else{
            this.setState({
                paginationData: paginationDataArr
            })
        }
},
    render(){
        return <div className="pagination" onClick={this.getCurrentPage}>
                    <ul>
                        {
                            this.state.paginationData.map((page,index)=>{
                                return <li key={index}><a className={index===1?'active':''} ref={index===1?'firstLi':''}>{page}</a></li>
                            })
                        }
                    </ul>
                </div>
    }
})
module.exports=Pagination;