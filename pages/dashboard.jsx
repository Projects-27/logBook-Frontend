import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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
import Grid from 'funuicss/component/Grid'
import Col from 'funuicss/component/Col'

export default function Log() {
    const [modal2, setmodal2] = useState(false);
    const [me, setme] = useState('')
    const [loading, setloading] = useState(false)
    const [info, setinfo] = useState(false)
    const [message, setmessage] = useState('')
    const [logs, setlogs] = useState('')
    const [deleteModal, setdeleteModal] = useState(false)
    const [editModal, seteditModal] = useState(false)
    const [search, setsearch] = useState('')
    const [students, setstudents] = useState('')
    const [logroute, setlogroute] = useState("/all/logs")
    const [userroute, setuserroute] = useState("/all/users")
    const [l_hun, setl_hun] = useState(0)
    const [graphDoc, setgraphDoc] = useState([])

    useEffect(() => {
     if(!logs && me.id){
        Axios.get(EndPoint + logroute )
        .then(data=>{
         setlogs(data.data.data)
        }).catch(err=>console.log(err))
     }
    })
    useEffect(() => {
        if(!students && me.id){
           Axios.get(EndPoint + userroute)
           .then(data=>{
            setstudents(data.data.data)
         
           }).catch(err=>console.log(err))
        }
       })
       
    
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
useEffect(() => {
if(!me){
  isOnline()
.then(data=>{
  setme(data)
  if(data.role == 'supervisor'){
    setlogroute(`/supervisor/logs/${data.Email}`)
    setuserroute(`/supervisor/users/${data.Email}`)
  }else if(data.role == 'super'){
    setlogroute('/all/logs')
    setuserroute('/all/users')
  }
})
}
})

const handleLog = ()=>{
const date = FunGet.val(".date")
const activity = FunGet.val(".activity")
const data = {
    Date: date,
    Activity: activity,
    StudentID: me.id
}

if(date && activity){
    setmodal2(false)
    setloading(true)
    setmessage("Creating Log: Please wait...")
    FunRequest.post(EndPoint + '/log', data).then((doc)=>{
        if(doc.status == "ok"){
            setinfo(true)
            setmessage("Data Inserted")
            setmodal2(false)
        }else{
            setinfo(true)
            setmessage(doc.message)
        }
    })
      .catch(err=>alert(err))
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

  return (
    <div className='content'>
          {
        loading ?
        <Alert message={message} fixed="top-middle" type="success" isLoading />
        : info ? 
        <Alert message={message} fixed="top-middle" type="info" />
        :''
      }


      <Nav />
     
     <div className="width-800-max center">
     <Grid gap>
<Col sm={12} md={6} lg={6} >
       <div className="card round-edge padding-20">
        <Typography italic size='small' color='primary'>Total Students</Typography> 
 <div />
 <Typography size='bigger' color='secondary'>{students ? students.length : ''}</Typography>
        </div>
        </Col>
<Col sm={12} md={6} lg={6} >
       <div className="card round-edge padding-20">
        <Typography italic size='small' color='primary'>Total Logs</Typography> 
 <div />
 <Typography size='bigger' color='secondary'>{logs ? logs.length : ''}</Typography>
        </div>
        </Col>
        </Grid>

     </div>
    </div>
  )
}


