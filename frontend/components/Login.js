import React, { useState } from 'react'
import Background from './Background'
//import { useAuth } from '../context/AuthContext'
import styles from './Login.module.css'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { AiOutlineUser } from 'react-icons/ai'



export const Login = ({setPage}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
      try {
    
    const response = await fetch("http://localhost:8080/api/v1/auth/authenticate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
  
      localStorage.setItem("jwt", data.jwt);
      console.log("Det gick bra bror")
      setPage(2);
    } 
    catch (error) {
      console.error(error);
      setError("Ett fel uppstod när du försökte logga in.");
    }
    
    
}
    

    return (
        <>
        <Background/>
        
        <div className={styles.fuckYou}>Welcome</div>

        <div className={styles.login}>
        <AiOutlineUser style={{
            position: 'absolute',
            top: '409px',
            left: '319px',
            color: '#E69023',
            width: "19px",
            height: "19px",
        }}></AiOutlineUser>
        <input className={styles.emailInput} placeholder="Email Address" onChange={(event) => setEmail(event.target.value)}>
        </input>
        <input className={styles.passwordInput} placeholder="Password" onChange={(event) => setPassword(event.target.value)}></input>
       </div>

       <div className={styles.accountDontExists}>{error}</div>

       <div className={styles.fortgotBtn}>FORGOT PASSWORD?</div>
       <div className={styles.signupBtn} onClick={()=>setPage(1)}>Sign Up</div>
       <div className={styles.nextBtn}  onClick={handleSubmit}>
        <AiOutlineArrowRight
        style={{
            color: "white",
            width: "24px",
            height: "24px",

        }}
        
        ></AiOutlineArrowRight>
       </div>
       </>
    
    ) 

}

