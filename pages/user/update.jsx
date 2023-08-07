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
import {EndPoint} from '../../components/EndPoint'
import {FunRequest , FunGet} from 'funuicss/js/Fun'
import Alert from 'funuicss/component/Alert'
import { useState } from 'react'
import { useEffect } from 'react'
import Axios from 'axios'
import FunLoader from 'funuicss/component/FunLoader';
import { isOnline, logOut } from '../../Functions/Functions'
import Nav from '../../components/Nav'
export default function Register() {
  const [loading, setloading] = useState(false)
  const [info, setinfo] = useState(false)
  const [message, setmessage] = useState('')
  const [supervisors, setsupervisors] = useState('')
  const [me, setme] = useState()
  const [getI, setgetI] = useState({})
  useEffect(() => {
    if(!me){
      isOnline()
    .then(data=>{
      setme(data)
    })
    }
    })
  useEffect(() => {
    if(!supervisors){
      FunRequest.get(EndPoint + "/all/admins" )
    .then(rdoc=>{
     setsupervisors(
      rdoc.data.filter(f=>{
        if(f.role == 'supervisor'){
          return f
        }
      })
      )
    })
    .catch(()=>{

    })
    }
  })
  
  useEffect(() => {
    setTimeout(()=>{
      setinfo(false)
      setmessage('')
      setloading(false)
    },6000)
  
    return () => {
      clearTimeout()
    }
  }, [ info])


  const Submit = ()=>{
    setloading(false)
    setinfo('')
    const matric = FunGet.val(".matric")
    const password = FunGet.val(".password")
    const username = FunGet.val(".username")
    const level = FunGet.val(".level")
    const contact = FunGet.val(".contact")
    const department = FunGet.val(".department")
    const internal_supervisor = FunGet.val(".internal_supervisor")
    const institution_supervisor = FunGet.val(".institution_supervisor")
    const institution_name = FunGet.val(".institution_name")
    const institution_number = FunGet.val(".institution_number")
    const institution_address = FunGet.val(".institution_address")


 if(matric &&
   password && 
   username && 
   level && 
   department && 
   institution_name && 
   institution_number &&
   institution_supervisor &&
   institution_address  &&
   contact ,
   internal_supervisor

   ){
  setloading(true)
    FunRequest.get(EndPoint + "/admin/" + internal_supervisor)
    .then(async(res)=>{
      const data = {
        UserName: username,
        MatrixNumber:matric,
        StudentContact:contact,
        Password:password,
        Level:level,
        Department:department,
        organization:{
          name:institution_name,
          contact:institution_number,
          supervisor:institution_supervisor,
          address:institution_address,
        },
        internal_supervisor:res.data.data
      }
      FunRequest.patch(EndPoint + '/update/user/' + me.id , data).then((doc)=>{
        if(doc.status.toLowerCase()  == 'ok'){
          setinfo(true)
          setmessage("user updated successfully")
          logOut()
        }else{
          setinfo(true)
          setmessage(doc.message)
        }
      })
      .catch(err=>{
        setinfo(true)
    setmessage(err.message)
      })
    })


 }
 else{
  setinfo(true)
  setmessage("Make sure to enter your details correctly")
}
  }
  if(me){
    return (
        <div>
            <Nav />
        <div className='content'>

          {
            loading ?
            <FunLoader size='60px' fixed/>
            : info ? 
            <Alert message={message} fixed="top-middle" type="info" />
            :''
          }
          <div className='card round-edge padding-20 width-500-max center' >
          <div className="">
        <div className="padding">
        <Typography
            text="Update user"
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
         <div className="col sm-12 md-12 lg-12 padding">
          
          </div>
            <div className="col sm-12 md-6 lg-6 padding">
            <Input defaultValue={me.UserName} rounded bordered type="text" label="Full Name" funcss="username" fullWidth />
            </div>
            <div className="col sm-12 md-6 lg-6 padding">
            <Input defaultValue={me.MatrixNumber} rounded bordered type="text" label="Matric" funcss="matric" fullWidth />
            </div>
            <div className="col sm-12 md-6 lg-6 padding">
            <Input  defaultValue={me.StudentContact} rounded bordered type="text" label="Contact" funcss="contact" fullWidth />
            </div>
            <div className="col sm-12 md-6 lg-6 padding">
            <Input defaultValue={me.Level} rounded bordered type="text" label="Level" funcss="level" fullWidth />
            </div>
            <div className="col sm-12 md-12 lg-12 padding">
            <Input  defaultValue={me.Department} rounded bordered type="text" label="Department" funcss="department" fullWidth />
            </div>
     {
        supervisors ?
        <div className="col sm-12 md-12 lg-12 padding">
        <select defaultValue={me.internal_supervisor.id} className="input borderedInput internal_supervisor fit" fullWidth style={{borderRadius:'3rem'}}>
          <option value="">Select Supervisor</option>
          {
            supervisors && 
            supervisors.map(doc=>(
              <option value={doc.id} key={doc.UserName}>{doc.UserName}</option>
            ))
          }
          </select>
        </div>
        :''
     }
            <div className="col sm-12 md-12 lg-12 padding h4 margin-top-20">
              Organization
            </div>
            <div className="col sm-12 md-12 lg-12 padding">
            <Input defaultValue={me.organization.name} rounded bordered type="text" label="Name" funcss="institution_name" fullWidth />
            </div>
            <div className="col sm-12 md-6 lg-6 padding">
            <Input defaultValue={me.organization.contact} rounded bordered type="text" label="Contact" funcss="institution_number" fullWidth />
            </div>
            <div className="col sm-12 md-6 lg-6 padding">
            <Input defaultValue={me.organization.address} rounded bordered type="text" label="Address" funcss="institution_address" fullWidth />
            </div>
            <div className="col sm-12 md-12 lg-12 padding">
            <Input defaultValue={me.organization.supervisor} rounded bordered type="text" label="Supervisor" funcss="institution_supervisor" fullWidth />
            </div>
            
            <div className="col sm-12 md-12 lg-12 padding">
            <Input defaultValue={me.Password} rounded bordered type="password" label="Password" funcss="password" fullWidth />
            </div>
            <div className="col sm-12 md-12 lg-12 padding">
            <Button
         text="Update Information"
         bg='primary'
         fullWidth
         onClick={Submit}
         rounded
         />
            </div>
         </div>
    
          </div>
        </div>
        </div>
      )
  }else{
    return ("")
  }
}
