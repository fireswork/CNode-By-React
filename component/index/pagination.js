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
                this.props.pageChange(Number(thisPage)); 
            }            
        }         
},
    //reset-pagination
    componentWillReceiveProps(newProps){       
        new Promise((reslove, reject)=>{
            if(newProps.tab!=this.props.tab){
            this.setState({
                paginationData: paginationDataArr
            });         
            setTimeout(()=>{
                reslove()
            },10);          
        }
    }).then(()=>this.refs.firstLi.click());
},
    //set-active-li
    setPaginationStyle(page){
         document.querySelector('.pagination').querySelectorAll('a').forEach((_this,index)=>{       
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