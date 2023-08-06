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
import FunLoader from 'funuicss/component/FunLoader'
import {EndPoint} from '../components/EndPoint'
import {FunRequest , FunGet} from 'funuicss/js/Fun'
import Alert from 'funuicss/component/Alert'
import { useState } from 'react'
import { useEffect } from 'react'
import  RowFlex  from 'funuicss/component/RowFlex';
export default function Home() {
  const [loading, setloading] = useState(false)
  const [info, setinfo] = useState(false)
  const [message, setmessage] = useState('')
  useEffect(() => {
    setTimeout(()=>{
      setinfo(false)
      setmessage('')
    },5000)
  
    return () => {
      clearTimeout()
    }
  }, [loading , info])
  
  const Submit = ()=>{
    setloading(false)
    setinfo('')
    const matric = FunGet.val(".matric")
    const password = FunGet.val(".password")
 if(matric && password){
  setloading(true)
  setmessage("Login: please wait")
  FunRequest.post(EndPoint + '/userlogin' , 
  {
    MatrixNumber: matric,
    Password: password,
    }).then((data)=>{
     if(data.status == 'error'){
      setinfo(true)
      setmessage(data.message.toString())
      setloading(false)
     }else{
      localStorage.setItem('user', JSON.stringify(data.data));
       window.location.href="/user";
     }
    })
    .catch(err=>{
      setinfo(true)
  setmessage(err.message)
  setloading(false)
    })
 }
 else{
  setinfo(true)
  setmessage("Make sure to enter your matric and password")
}
  }
  return (
    <div className='fit central padding-20 bg_patterns' style={{minHeight:"100vh"}}>
      {
        loading &&
        <FunLoader size='70px' fixed backdrop />
      }
      { info &&
        <Alert message={message} fixed="top-middle" type="info" />
      }
      <div className='card round-edge padding-20' style={{ 
        maxWidth:'400px',
        width:"100%"
      }}>
      <div className="padding-bottom-20">
      <RowFlex justify="space-between" gap='1rem'>
        <div>
        <Typography
        text="Student Login"
        heading="h4"
        lighter
        />
        <div />
      <Typography
        text="Enter your matric number and password to login"
        size='small'
        italic 
        />
        </div>
        <div className='width-100'>
          <Link href={"/admin/login"}>
            <Button
            text='To Admin'
            small
            bg='secondary'
            rounded
            width='70px'
            endIcon={<Icon icon="bx bx-chevron-right"  />}
            fullWidth
            />
          </Link>
        </div>
      </RowFlex>
      </div>
      <IconicInput 
    funcss="section full-width" 
    position="left" 
    icon={ <Icon icon="bx bx-envelope" color="primary" />}
    input={<Input type="text" label="Matric" funcss="full-width matric" />}
     />
      <IconicInput 
    funcss="section full-width" 
    position="left" 
    icon={ <Icon icon="bx bx-key" color="primary" />}
    input={<Input type="password" label="Password" funcss="full-width password"/>}
     />
     <Button
     text="Login Account"
     bg='gradient'
     fullWidth
     onClick={Submit}
     rounded 
     endIcon={<Icon icon="bx bx-send"  />}
     />
     <div className='padding-top-20 text-center'>
      Or <br /> <Link href='/register'>Register Account</Link>
     </div>
      </div>
    </div>
  )
}
