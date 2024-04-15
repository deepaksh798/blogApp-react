import React, {useState} from 'react'
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { Botton, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

function Signup() {
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {register, handleSubmit} = useForm()

  const create = async(data) => {
    setError('')
    try {
      const userData = await authService.createAccount(data)
      if (userData) {
        const userData = await authService.getCurrentUser()
        if (userData) useDispatch(login(userData))
        navigate('/')
      }
    } catch (error) {
      setError(error.massage)
    }
  }

  return (
    <div>Signup</div>
  )
}

export default Signup