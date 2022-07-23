
import React from 'react';
import { useNavigate } from 'react-router-dom';
function Alert(props) {
     let navigate =useNavigate();
    const capitalize = (word)=>{
         const lower=word.toLowerCase();
         return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
    return (
         <div className="mb-3 mt-1" >
          { props.alert &&  <div className={`alert alert-${props.alert.type} alert-dismissible fade show`}  role="alert">
                {capitalize(props.alert.type)=="Danger"?"Failed":capitalize(props.alert.type)}! {props.alert.msg}
           </div> }
           </div>
    )
}

export default Alert