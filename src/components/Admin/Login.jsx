import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { StartLogin } from "../../actions/auth";
import { useForm } from "../../hooks/useForm";
export const Login = ({history}) => {

  const dispatch = useDispatch()
  const {uid}= useSelector(state => state.auth)
  const [formvalues,handleInputChange]=useForm({
    email:'',
    password:""
  })

  let {email,password} =formvalues


  const handleSubmit=(e)=>{
    e.preventDefault()
    dispatch(StartLogin(email,password))
    
  }

  return (
    <section className="login">
      <article className="container">
        <h1>MOVIE WEB</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
                type="email" 
                value={email}
                onChange={handleInputChange}
                name="email" className="form-control" 
                />
          </div>

          <div className="form-group">
            <div className="formGroup">
              <label htmlFor="password">Password</label>
              <input 
                    type="password" 
                    value={password}
                    onChange={handleInputChange}
                    name="password" 
                    className="form-control" />
            </div>
          </div>

          <button className="btn">Login</button>
        </form>
      </article>
    </section>
  );
};
