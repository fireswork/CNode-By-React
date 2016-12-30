import React from 'react';
import Loader from 'halogen/RingLoader';

const Load=React.createClass({
    render(){
        return <div className="load_wrap">
                    <Loader className="loader" color="#2f96b4" size="50px" margin="4px"/>
               </div>
    }
});
module.exports=Load;