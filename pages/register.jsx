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
import {EndPoint} from '../components/EndPoint'
import {FunRequest , FunGet} from 'funuicss/js/Fun'
import Alert from 'funuicss/component/Alert'
import { useState } from 'react'
import { useEffect } from 'react'
export default function Register() {
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
    const matric = FunGet.val(".matric")
    const password = FunGet.val(".password")
    const username = FunGet.val(".username")
    const level = FunGet.val(".level")
    const department = FunGet.val(".department")
    const institution_supervisor = FunGet.val(".institution_supervisor")
    const institution_name = FunGet.val(".institution_name")
    const institution_number = FunGet.val(".institution_number")
    const data = {
      UserName: username,
      MatrixNumber:matric,
      StudentContact:password,
      Password:password,
      Level:level,
      Department:department,
      InstitutionName:institution_name,
      InstitutionNumber:institution_number,
      InstitutionSupervisor:institution_supervisor,
      InstitutionAddress:password,
      SchoolSupervisor:password
    }
    console.log(data)
 if(matric &&
   password && 
   username && 
   level && 
   department && 
   institution_name && 
   institution_number &&
   institution_supervisor
   ){
  setloading(true)
  setmessage("Login: please wait")
  FunRequest.post(EndPoint + '/register' , data).then((doc)=>{
      if(doc.status.toLowerCase()  == 'ok'){
        setinfo(true)
        setmessage("User created:Wait for redirect")
        setTimeout(()=>{
          window.location.assign("/")
        },3000)
      }else{
        setinfo(true)
        setmessage(doc.message)
      }
    })
    .catch(err=>{
      setinfo(true)
  setmessage(err.message)
    })
 }
 else{
  setinfo(true)
  setmessage("Make sure to enter your details")
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
        maxWidth:'400px',
        width:"100%"
      }}>
      <div className="padding-bottom-20">
    <div className="padding">
    <Typography
        text="New Student Account"
        heading="h3"
        lighter
        />
        <div />
      <Typography
        text="Enter all details correctly"
        size='small'
        />
    </div>
      </div>
     <div className="row">
        <div className="col sm-12 md-6 lg-6 padding">
        <Input bordered type="text" label="Full Name" funcss="username" fullWidth />
        </div>
        <div className="col sm-12 md-6 lg-6 padding">
        <Input bordered type="text" label="Matric" funcss="matric" fullWidth />
        </div>
        <div className="col sm-12 md-6 lg-6 padding">
        <Input bordered type="text" label="Contact" funcss="contact" fullWidth />
        </div>
        <div className="col sm-12 md-6 lg-6 padding">
        <Input bordered type="text" label="Level" funcss="level" fullWidth />
        </div>
        <div className="col sm-12 md-6 lg-6 padding">
        <Input bordered type="text" label="Department" funcss="department" fullWidth />
        </div>
        <div className="col sm-12 md-6 lg-6 padding">
        <Input bordered type="text" label="Institution Name" funcss="institution_name" fullWidth />
        </div>
        <div className="col sm-12 md-6 lg-6 padding">
        <Input bordered type="text" label="Institution Supervisor" funcss="institution_supervisor" fullWidth />
        </div>
        <div className="col sm-12 md-6 lg-6 padding">
        <Input bordered type="text" label="Inst Supervisor's Contact" funcss="institution_number" fullWidth />
        </div>
        <div className="col sm-12 md-6 lg-6 padding">
        <Input bordered type="text" label="Inst Address" funcss="institution_address" fullWidth />
        </div>
        <div className="col sm-12 md-6 lg-6 padding">
        <Input bordered type="text" label="School Supervisor" funcss="school_supervisor" fullWidth />
        </div>
        <div className="col sm-12 md-12 lg-12 padding">
        <Input bordered type="password" label="Password" funcss="password" fullWidth />
        </div>
        <div className="col sm-12 md-12 lg-12 padding">
        <Button
     text="Register Account"
     bg='primary'
     fullWidth
     onClick={Submit}
     />
        </div>
     </div>

      </div>
    </div>
  )
}
