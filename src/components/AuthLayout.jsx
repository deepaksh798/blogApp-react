import React, {useEffect, useState} from 'react'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Protected({children, authentication = true}) {

    const navigate = useNavigate();
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)

    // make it more easy to understand

    // if (authStatus == true) {
    //     navigate("/")
    // } else if (authStatus == false) {
    //     navigate("/login")
    // }

    useEffect(() => {
      if (authentication && authStatus !== authentication) {
        navigate("/login")
      } else if (!authentication && authStatus !== authentication) {
        navigate("/")
      }
      setLoader(false)
    }, [authStatus, authentication, navigate])
    


  return loader ? <h1>Loading...</h1> : <>{children}</>
}
