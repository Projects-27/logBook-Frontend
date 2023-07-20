import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import Starter from 'funuicss/component/Starter'
import Link from 'next/link'
import Div from 'funuicss/component/Div'
import Input from 'funuicss/component/Input'
import Button from 'funuicss/component/Button'
import Icon from 'funuicss/component/Icon'
import IconicInput from 'funuicss/component/IconicInput'
import Typography from 'funuicss/component/Typography'
import {EndPoint} from '@/components/EndPoint'
import {FunRequest , FunGet} from 'funuicss/js/Fun'
import Alert from 'funuicss/component/Alert'
import { useState } from 'react'
import { useEffect } from 'react'
export default function Home() {
  const [loading, setloading] = useState(false)
  const [info, setinfo] = useState(false)
  const [message, setmessage] = useState('')
  useEffect(() => {
    setTimeout(()=>{
      setinfo(false)
      setmessage('')
      setloading(false)
    },3000)
  
    return () => {
      clearTimeout()
    }
  }, [loading , info])
  
  const Submit = ()=>{
    setloading(false)
    setinfo('')
    const email = FunGet.val(".email")
    const password = FunGet.val(".password")
 if(email && password){
  setloading(true)
  setmessage("Loagin: please wait")
  FunRequest.post(EndPoint + '/userlogin' , 
  {
    Email: email,
    Password: password,
    }).then((data)=>{
      console.log(data)
    })
    .catch(err=>{
      setinfo(true)
  setmessage(err.message)
    })
 }
 else{
  setinfo(true)
  setmessage("Make sure to enter your email and password")
}
  }
  return (
    <div className='fit central' style={{minHeight:"100vh"}}>
      {
        loading ?
        <Alert message={message} fixed="top-middle" type="success" isLoading />
        : info ? 
        <Alert message={message} fixed="top-middle" type="info" />
        :''
      }
      <div style={{
        maxWidth:'300px',
        width:"100%"
      }}>
      <div className="padding-bottom-20">
      <Typography
        text="Login Account"
        heading="h2"
        lighter
        />
        <div />
      <Typography
        text="Enter your email number and password to login"
        size='small'
        />
      </div>
      <IconicInput 
    funcss="section full-width" 
    position="left" 
    icon={ <Icon icon="bx bx-envelope" color="primary" />}
    input={<Input type="text" label="Email" funcss="full-width email" bordered />}
     />
      <IconicInput 
    funcss="section full-width" 
    position="left" 
    icon={ <Icon icon="bx bx-lock" color="primary" />}
    input={<Input type="password" label="Password" funcss="full-width password" bordered />}
     />
     <Button
     text="Login Account"
     bg='primary'
     fullWidth
     onClick={Submit}
     />
     <div className='padding-top-20 text-center'>
      Or <br /> <Link href='/register'>Register Account</Link>
     </div>
      </div>
    </div>
  )
}
