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
import FunLoader from 'funuicss/component/FunLoader';
import db from '../Functions/config'
import ProgressBar from 'funuicss/component/ProgressBar'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default function Log() {
  const storage = getStorage()
    const [modal2, setmodal2] = useState(false);
    const [me, setme] = useState('')
    const [loading, setloading] = useState(false)
    const [info, setinfo] = useState(false)
    const [message, setmessage] = useState('')
    const [logs, setlogs] = useState('')
    const [deleteModal, setdeleteModal] = useState(false)
    const [editModal, seteditModal] = useState(false)
    const [search, setsearch] = useState('')
    const [route, setroute] = useState("/all/logs")
    const [updateDoc, setupdateDoc] = useState(false)
    const [update, setupdate] = useState(false)
    const [filterLevel, setfilterLevel] = useState("")
    const [uploadState, setuploadState] = useState(0)
    const [document, setdocument] = useState('')

    useEffect(() => {
     if(!logs && me){
        Axios.get(EndPoint + route )
        .then(data=>{
         setlogs(data.data.data)
         console.log(data.data)
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
if(data.isAdmin){
  if(data.role == 'supervisor'){
    setroute(`/supervisor/logs/${data.Email}`)
  }else if(data.role == 'super'){
    setroute('/all/logs')
  }
}else{
  setroute(`/my/logs/${data.MatrixNumber}`)
}
})
}
})

const handleLog = ()=>{
const date = FunGet.val(".date")
const activity = FunGet.val(".activity")
const title = FunGet.val(".title")
const data = {
    Date: date,
    Activity: activity,
    matric_number:me.MatrixNumber,
    title:title,
    supervisor_email:me.internal_supervisor.Email,
    level:me.Level ,
    documents:document
}
const udata = {
    Date: date,
    Activity: activity,
    title:title,
    documents:document
}

if(date && activity){
 if(update){
  setmodal2(false)
  setloading(true)
  FunRequest.patch(EndPoint + '/update/log/' + updateDoc.id, udata).then((doc)=>{
    setupdateDoc(' ')
    setmodal2(false)
    setlogs('')
    setupdate(false)
      if(doc.status == "ok"){
          setinfo(true)
          setmessage("data updated")
      }else{
          setinfo(true)
          setmessage(doc.message)
          setupdate(false)
      }
  })
    .catch(err=>alert(err))
 }else{
  setmodal2(false)
  setloading(true)
  FunRequest.post(EndPoint + '/log', data).then((doc)=>{
    console.log(doc)
      if(doc.status == "ok"){
          setinfo(true)
          setmessage("Data Inserted")
          setmodal2(false)
          setlogs('')
      }else{
          setinfo(true)
          setmessage(doc.message)
      }
  })
    .catch(err=>alert(err))
 }
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

const HandlePrint = ()=>{
  const myElement = document.getElementById('documents');
  printElement(myElement);
  function printElement(element) {
      const originalContents = document.body.innerHTML;
      const printContents = element.innerHTML;

      document.body.innerHTML = printContents;
      window.print();

      document.body.innerHTML = originalContents;


  }
  
}


const handleDocument = (e)=>{
  const file = e.target.files[0];
  const storageRef = ref(storage, `recipes/${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);
  uploadTask.on('state_changed', 
      (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      const number = parseInt(progress)
      setuploadState(number)
      }, 
      (error) => {
      // Handle unsuccessful uploads
      console.log(error.message)
      }, 
      () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setdocument(downloadURL)
          setuploadState("")
      });
      }
  );

  
  
          
  }
  return (
    <div className='content'>
          {
        loading ?
        <FunLoader size='70px' fixed />
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
<Typography text="Create/Edit Log" heading="h5"/>
<CloseModal  onClick={()=>setmodal2(false)}/>
</ModalHeader>
<ModalContent>
<div className="width-500-max center">
<Input 
onChange={handleDocument}
    file 
    label="Upload Document: JPG, PNG, PDF, DOCX"
    icon={<Icon 
     icon="fas fa-cloud-upload-alt" 
     color={"gradient" } 
     size={"big"}
     />
   }
   noBorder
   button={<Button bg="light" fullWidth rounded>New File</Button>}
     />
 {
  uploadState > 0 ?
  <div className="">
  <ProgressBar 
progress={uploadState} 
content={`${uploadState}%`} 
bg="success" 
funcss='border'
/>
  </div>:''
 }
 {
  document ? 
 <div className="section text-center text-primary">
   <Link href={document} >
   <i className='bx bx-download' /> Download document
  </Link>
 </div>
  :''
 }
<Input label="Title" defaultValue={ updateDoc ? updateDoc.title : ''} type='text' bordered fullWidth funcss="title margin-top-30" />
<Section />
<Input label="Date" type='date' bordered fullWidth funcss="date" defaultValue={ updateDoc ? updateDoc.Date : ''}  />
<Section />
<Input 
label="Activity"
  fullWidth
  multiline
  funcss='activity'
  rows={7}
  defaultValue={ updateDoc ? updateDoc.Activity : ''}

 />
<Section />
<Section />
<Button
text="Submit"
bg="primary"
fullWidth
onClick={handleLog}
/>
</div>
</ModalContent>
</Modal>


<Modal 
animation="ScaleUp" 
duration={0.4} 
open={editModal}
backdrop
maxWidth="900px"
>
<ModalHeader funcss='h5'>
{editDoc.title}
<CloseModal  onClick={()=>seteditModal(false)}/>
</ModalHeader>
<ModalContent funcss="padding-20">
<div className="width-500-max center">
<RowFlex justify='space-between'>
  <Div>
  <Typography italic size='small' color='primary'>Matric</Typography> 
 <div />
 <Typography>{editDoc.matric_number}</Typography>
  </Div>
  <Div>
  <Typography italic size='small' color='primary'>Date</Typography> 
 <div />
 <Typography>{editDoc.Date}</Typography>
  </Div>

</RowFlex>
<p>
<Typography italic size='small' color='primary'>Activity</Typography> 
   <Div funcss='border padding round-edge article text-secondary'>
    {editDoc.Activity}
    </Div>
  </p>
</div>
</ModalContent>

</Modal>

      <Nav />
      <div>
      <Link href="/user" legacyBehavior>
           <Button rounded bg="light" smaller>
           <Icon icon="far fa-user" /> Profile
           </Button>
            </Link>
            <BreadCrumb type={"straight"} />
            <Link href="#" legacyBehavior>
           <Button rounded bg="primary" smaller>
           <Icon icon="bx bx-book" /> Log Book
           </Button>
            </Link>
            <div className="section">
              <RowFlex justify='space-between'>
                <Div>
                <Typography
                text="Log Book"
                heading='h4'
                lighter
                />
                <br />
                <Typography
                text="Create and manage all your logs"
                />
                </Div>
                <Div>
                   {
                    !me.isAdmin &&  <Button
                    text="Create Log"
                    bg='primary'
                    startIcon={<Icon icon="bx bx-plus" />}
                    onClick={()=>{
                      setmodal2(true)
                      setupdateDoc('')
                      setupdate(false)
                    }} 
                    rounded
                    />
                   }
                </Div>
              </RowFlex>
            </div>
         
      </div>
      <Div funcss="_card text-small  margin-top-30">
      <div className="padding hr">
      <RowFlex justify='space-between' responsiveSmall gap="0.5rem">
      <Input label="Matric Number" onChange={(e)=>setsearch(e.target.value)} bordered rounded/>
      <Input  onChange={(e)=>{
      new Promise((resolve, reject) => {
        setroute(me.isAdmin ? `/supervisor/logs/${me.Email}/${e.target.value}` : `/student/logs/${me.MatrixNumber}/${e.target.value}`)
     resolve()
      }).then(()=>{
        setlogs("")
      })
      }} bordered rounded
      select 
      options={[
        {
            value:"",
            text:"-- Filter Level --"
        }
        ,
        {
            value:"100",
            text:"Level 100"
        }
        ,
        {
            value:"200",
            text:"Level 200"
        }
        ,
        {
            value:"300",
            text:"Level 300"
        }
       ]}
      />
    
      <div>
 
   
       <RowFlex gap='1rem'>
       <Button 
      text="Print Records"
      bg='primary'
      outlined
      rounded
      startIcon={<Icon icon='fas fa-print' />}
      onClick={HandlePrint}
      />
      <div>
      <Typography
        text='records'
        italic 
        color='primary'
        />
        <div />
        <div className='h2'>
            
        {
            logs &&
               logs
               .filter(fDoc =>{
                 if(!search){
                     return logs
                 }else if(search.toString().includes(fDoc.matric_number.slice(0 , search.length))){
                         return fDoc
                 }
               }).length
        }
        </div>
      </div>
       </RowFlex>
      </div>
      </RowFlex>
      </div>
     <div id="documents">
     <Table  stripped >
       <TableHead>
           <TableData className='text-bold'>Supervisor</TableData>
           <TableData className='text-bold'>Matric number</TableData>
           <TableData className='text-bold'>Title</TableData>
           <TableData className='text-bold'>Level</TableData>
           <TableData className='text-bold'>Date</TableData>
           <TableData className='text-bold'>Document</TableData>
           <TableData className='text-bold'>Edit</TableData>
       </TableHead>
    <tbody>
    {
      logs &&
      logs  .filter(fDoc =>{
        if(!search){
            return logs
        }else if(search.toString().includes(fDoc.matric_number.slice(0 , search.length)) ){
                return fDoc
        }
      })
      .map(doc=>(
        <TableRow key={doc.id}>
          <TableData>{doc.supervisor_email}</TableData>
        <TableData>{doc.matric_number ? doc.matric_number : ''}</TableData>
        <TableData>{doc.title.slice(0, doc.title.indexOf('.'))}</TableData>
        <TableData>{doc.level}</TableData>
        <TableData>{doc.Date}</TableData>
        <TableData>
        {doc.documents ? 
        <Link href={doc.documents} >
           <Button bg='primary' small rounded startIcon={<Icon icon="bx bx-download"  />}
          >Download</Button>
        </Link>
        : <div className="text-small text-italic">No document</div>
        }
        </TableData>
        <TableData>
          <Button bg='light' small rounded startIcon={<Icon icon="fas fa-eye"  />}
          onClick={()=>HandleModal(doc)}
          >View</Button>
       {
      me.role ?
      "" :
      <>
        
      {' | '}
        <Button onClick={()=>{
          setupdate(true)
          setupdateDoc(doc)
          setdocument(doc.documents ? doc.documents : '')
          setmodal2(true)
        }} bg='light-success' small rounded  startIcon={<Icon icon="far fa-edit"  />}>Update</Button>
        </>
       }
        </TableData>
    </TableRow>
      ))
     }
    </tbody>
    </Table>
     </div>
    </Div>
    </div>
  )
}


