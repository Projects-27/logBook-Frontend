import React from 'react'
import Nav from '../components/Nav'
import BreadCrumb from 'funuicss/component/BreadCrumb'
import Button from 'funuicss/component/Button'
import Icon from 'funuicss/component/Icon'
import Link from 'next/link'
import Typography from 'funuicss/component/Typography';
import RowFlex from 'funuicss/component/RowFlex';
import Div from 'funuicss/component/Div';
import {FunGet} from 'funuicss/js/Fun'
import Modal from 'funuicss/component/Modal'
import ModalHeader from 'funuicss/component/ModalHeader'
import CloseModal from 'funuicss/component/CloseModal'
import ModalContent from 'funuicss/component/ModalContent'
import ModalAction from 'funuicss/component/ModalAction'
import Input from 'funuicss/component/Input'
import Section from 'funuicss/component/Section'
import { useState } from 'react'
import { useEffect } from 'react'
import { isOnline } from '../Functions/Functions'
import {FunRequest} from 'funuicss/js/Fun'
import { EndPoint } from '../components/EndPoint'
import Alert from 'funuicss/component/Alert'
import Axios from 'axios';
import Table from 'funuicss/component/Table'
import TableHead from 'funuicss/component/TableHead'
import TableData from 'funuicss/component/TableData'
import TableRow from 'funuicss/component/TableRow'
import  FunLoader from 'funuicss/component/FunLoader';


export default function Log() {
    const [modal2, setmodal2] = useState(false);
    const [me, setme] = useState('')
    const [loading, setloading] = useState(false)
    const [info, setinfo] = useState(false)
    const [message, setmessage] = useState('')
    const [staffs, setstaffs] = useState('')
    const [deleteModal, setdeleteModal] = useState(false)
    const [editModal, seteditModal] = useState(false)
    const [search, setsearch] = useState('')
    const [deleteDoc, setdeleteDoc] = useState('')
    useEffect(() => {
     if(!staffs && me.id){
        Axios.get(EndPoint + "/all/admins" )
        .then(data=>{
         setstaffs(data.data.data)
        }).catch(err=>console.log(err))
     }
    })
    
    useEffect(() => {
        setTimeout(()=>{
          setinfo(false)
          setmessage('')
          setloading(false)
        },5000)
      
        return () => {
          clearTimeout()
        }
      }, [loading , info])
useEffect(() => {
isOnline()
.then(data=>{
  setme(data)
})
}, [])

const Submit = ()=>{
const email = FunGet.val(".email")
const full_name = FunGet.val(".full_name")
const contact = FunGet.val(".contact")
const role = FunGet.val(".role")
const password = FunGet.val(".password")
const department = FunGet.val(".department")
const data = {
    Email: email,
    UserName: full_name,
    contact: contact,
    role: role,
    Password: password,
    Department:department
}

if(
  email && 
  full_name && 
  contact && 
  role && 
  password &&
  department
  
  ){
    setmodal2(false)
    setloading(true)
    FunRequest.post(EndPoint + '/register/admin', data).then((doc)=>{
        if(doc.status == "ok"){
            setinfo(true)
            setmessage("user created succesfully")
            setmodal2(false)
            setstaffs('')
        }else{
            setinfo(true)
            setmessage(doc.message)
        }
    })
      .catch(err=>{
        setinfo(true)
        setmessage(doc.message)
      })
}else{
setinfo(true)
setmessage("Enter all details")
}
}

const [editDoc, seteditDoc] = useState('')
const HandleModal = (doc)=>{
seteditDoc(doc)
seteditModal(true)
}

const HandleDelete = ()=>{
  setloading(true)
  FunRequest.delete(EndPoint + "/deleteAdmin/" + deleteDoc.id)
  .then((res)=>{
    setdeleteModal(false) 
    setstaffs('')
    setloading(false)
  }).catch(()=>{
    setdeleteModal(false) 
    setstaffs('')
    setloading(false)
  })
}
  return (
    <div className='content'>
          {
        loading ?
        <FunLoader size='60px' fixed/>
        : info ? 
        <Alert message={message} fixed="top-middle" type="info" />
        :''
      }
<Modal 
animation="ScaleUp" 
duration={0.4} 
open={modal2}
backdrop
maxWidth="900px"
>
<ModalHeader>
<Typography text="Add Admin" heading="h5"/>
<CloseModal  onClick={()=>setmodal2(false)}/>
</ModalHeader>
<ModalContent>
<div className="width-500-max center">
  <div className="row">
    <div className="col sm-12 md-6 lg-6 padding">
    <Input rounded label="Email" type='email' bordered fullWidth funcss="email" />
    </div>
    <div className="col sm-12 md-6 lg-6 padding">
    <Input rounded label="Full Name" type='text' bordered fullWidth funcss="full_name" />
    </div>
    <div className="col sm-12 md-6 lg-6 padding">
    <Input rounded label="Contact" type='tel' bordered fullWidth funcss="contact" />
    </div>
    <div className="col sm-12 md-6 lg-6 padding">
    <Input rounded  bordered fullWidth funcss="role"     select
    options={[
     {
         value:"",
         text:"-- Role --"
     },
     {
         value:"super",
         text:"Super Admin"
     },
     {
         value:"supervisor",
         text:"Supervisor"
     }
    ]}/>
    </div>
    <div className="col sm-12 md-12 lg-12 padding">
    <Input rounded label="Password" type='password' bordered fullWidth funcss="password" />
    </div>
    <div className="col sm-12 md-12 lg-12 padding">
    <Input rounded label="Department" type='text' bordered fullWidth funcss="department" />
    </div>
  </div>

<Section />
<div className="padding">
<Button
text="Submit"
bg="primary"
fullWidth
onClick={Submit}
rounded
/>
</div>
</div>
</ModalContent>
</Modal>


{
  deleteDoc &&
  <Modal 
animation="ScaleUp" 
duration={0.4} 
open={deleteModal}
backdrop
maxWidth="500px"
>
<ModalHeader funcss='h5 padding'>
Delete Staff
</ModalHeader>
<ModalContent funcss="padding-20">
Are you sure you want delete <span className="text-danger">{deleteDoc.UserName}</span>
</ModalContent>
<ModalAction funcss="text-right light bottomEdge padding-20">
<Button 
bg="success"
outlined
text="Cancel"
rounded
onClick={()=>setdeleteModal(false)}
/>
&nbsp; 
&nbsp; 
<Button 
bg="light-danger"
text="Delete Staff"
rounded
onClick={HandleDelete}
/>
</ModalAction>
</Modal>
}

      <Nav />
      <div>
      <Link href="/user" legacyBehavior>
           <Button rounded bg="light" small>
           <Icon icon="far fa-user" /> Profile
           </Button>
            </Link>
            <BreadCrumb type={"straight"} />
            <Link href="#" legacyBehavior>
           <Button rounded bg="primary" small>
           <Icon icon="bx bx-book" /> Log Book
           </Button>
            </Link>
            <div className="section">
              <RowFlex justify='space-between'>
                <Div>
                <Typography
                text="Staff"
                heading='h4'
                lighter
                />
                <br />
                <Typography
                text="Create and manage all your staffs"
                />
                </Div>
                <Div>
                    <Button
                    text="New Staff"
                    bg='primary'
                    startIcon={<Icon icon="bx bx-plus" />}
                    onClick={()=>setmodal2(true)}
                    rounded
                    />
                </Div>
              </RowFlex>
            </div>
         
      </div>
      <Div funcss="card text-small round-edge margin-top-30">
      <div className="padding hr">
      <RowFlex justify='space-between'>
      <Input rounded label="Email" onChange={(e)=>setsearch(e.target.value)} bordered />
      <div>
        <Typography
        text='records'
        italic 
        color='primary'
        />
        <div />
        <div className='h2'>
            
        {
            staffs &&
               staffs
               .filter(fDoc =>{
                 if(!search){
                     return staffs
                 }else if(search.toString().includes(fDoc.Email.slice(0 , search.length))){
                         return fDoc
                 }
               }).length
        }
        </div>
      </div>
      </RowFlex>
      </div>
      <Table  stripped >
       <TableHead>
           <TableData>Email</TableData>
           <TableData>Full Name</TableData>
           <TableData>Contact</TableData>
           <TableData>Role</TableData>
          {
            me.role == 'super' &&
            <TableData>Edit</TableData>
          }
       </TableHead>
     {
      staffs &&
      staffs  .filter(fDoc =>{
        if(!search){
            return staffs
        }else if(search.toString().includes(fDoc.Email.slice(0 , search.length))){
                return fDoc
        }
      }).map(doc=>(
        <TableRow key={doc.id}>
        <TableData>{doc.Email}</TableData>
        <TableData>{doc.UserName}</TableData>
        <TableData>{doc.contact}</TableData>
        <TableData>{doc.role}</TableData>
        {
            me.role == 'super' &&
        <TableData>
          <Button bg='light-danger' small rounded startIcon={<Icon icon="fas fa-bin"  />} onClick={()=>{
            setdeleteModal(true)
            setdeleteDoc(doc)
          }}>Delete</Button>
        </TableData>
}
    </TableRow>
      ))
     }
    </Table>
    </Div>
    </div>
  )
}


