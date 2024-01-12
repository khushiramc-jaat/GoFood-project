import React,{useState} from 'react'
import { Link ,useNavigate} from 'react-router-dom';

function Login() {
  const[credentails,setCredentail]= useState({email:"",password:""})
  const navigate = useNavigate();
  const handleSubmit=async(e)=>{
      e.preventDefault();
      const response= await fetch("http://localhost:5000/api/loginuser",{
          method:"POST",
          headers:{
              'Content-type':'application/json'
          },
          body:JSON.stringify({email:credentails.email,password:credentails.password})
      });
      const result=await response.json();
      console.log(result);

      if(!result.success){
          alert("enter valid")
      }
      if(result.success){
        localStorage.setItem("authtoken",result.authToken)
        console.log(localStorage.getItem("authtoken"));
        navigate("/");
    }
  }

  const onChange=(event)=>{
      setCredentail({...credentails,[event.target.name]:event.target.value})
  }

  return (
    <>
      <div className='container'>
        <form onSubmit={handleSubmit} >
           
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" name='email' value={credentails.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp"/>
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" name='password'  onChange={onChange} value={credentails.password} id="exampleInputPassword1"/>
            </div>
            
            <button type="submit" className=" m-3 btn btn-success">Submit</button>
            <Link to="/creatuser" className='m-3 btn btn-danger'>I'm a user</Link>
        </form>
    </div>
    </>
  )
}

export default Login
