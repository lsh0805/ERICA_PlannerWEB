import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Verify = ({match}) => {
  const [message, setMessage] = useState("Invalid Verification");
  
  useEffect(() => {
    axios.post('/api/account/registerVerify', {token: match.params.token})
    .then(response => {
      setMessage(response.data.message);
    }).catch(err => {
      setMessage(err.message);
    });
  }, [match.params.token]);

  return (
    <div className="container" style={{textAlign: "center"}}>
      <div className="wrapper" style={{width: "80%", textAlign: "left"}}>
        <div className="title" style={{display: "inline-block", fontSize:"24px", fontWeight: "bold", borderBottom:"2px #ddd solid"}}>
          인증
        </div>
        <div className="contents" style={{marginTop: "20px"}}>
          {message}
        </div>
      </div>
    </div>
  )
}

export default Verify;