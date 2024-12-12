
'use client'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const AboutPage = () => {

  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(()=>{
    const fetchUser = async()=>{
      const authData = localStorage.getItem("pocketbase_auth");
      if(authData){
        const {token, record} = JSON.parse(authData);
        setUser(record)
      }
    }
    fetchUser();
  },[])
  return (
    <div className='pt-44'>
      {
        user ? (
          <>
          
          </>
        ) : (
          <div>Not Login</div>
        )
      }
   
    </div>
  )
}

export default AboutPage