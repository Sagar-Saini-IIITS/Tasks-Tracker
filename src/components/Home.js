import Tasks from './Tasks';
import {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
const Home = (props) => {
  const {showAlert}=props;
  
  let navigate =useNavigate();
  useEffect(() => {
    if(!localStorage.getItem('token')){
      navigate("/login");
    }
    // eslint-disable-next-line
  }, [])
  return (
    <div>
       <Tasks showAlert={showAlert}/>
       </div>
    
  )
}

export default Home;