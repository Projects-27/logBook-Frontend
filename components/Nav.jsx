import React from 'react'
import Navbar from 'funuicss/component/NavBar'
import Typography from 'funuicss/component/Typography'
import SidebarTrigger from 'funuicss/component/SidebarTrigger'
import LinkWrapper from 'funuicss/component/LinkWrapper'
import NavLink from 'funuicss/component/NavLink'
import Icon from 'funuicss/component/Icon'
import NavLogo from 'funuicss/component/NavLogo'
import Div from 'funuicss/component/Div'
import DropDown from 'funuicss/component/DropDown'
import DropMenu from 'funuicss/component/DropMenu'
import DropItem from 'funuicss/component/DropItem'
import Button from 'funuicss/component/Button'
import { useEffect } from 'react'
import { useState } from 'react'
import {isOnline, logOut} from '../Functions/Functions'
import Link from 'next/link'
import List from 'funuicss/component/List'
import ListItem from 'funuicss/component/ListItem'
import RowFlex from 'funuicss/component/RowFlex';
export default function Nav() {
const [drop1, setdrop1] = useState(false);
const [me, setme] = useState('')
const [sidebar, setsidebar] = useState('')
useEffect(() => {
isOnline()
.then(data=>{
  setme(data)
})
}, [])

useEffect(() => {
  const drop = document.querySelector(".myBtn")
  window.addEventListener("click" ,(e)=>{
    if(e.target != drop){
      setdrop1(false)
    }else{
        setdrop1(!drop1)
    }
  })
},[])

useEffect(() => {
  window.addEventListener('resize' , ()=>{
    if(screen.width > 800){
      setsidebar("")
    }
  })
}, [])



  return (
    <div>
      {
        me ?
        <div>
        <Navbar funcss="card" fixedTop>
  <NavLogo>
  <Typography heading="h5" text="Log Book" color="gradient"/>
  </NavLogo>
  
  <LinkWrapper visibleLinks>
<Link href='/user'>
<>
<RowFlex gap='0.5rem'>
  <div><Icon icon={"bx bx-user"} /></div>
<div>
{me.UserName}
<div className='text-small text-bold text-primary italic'>{me.role ? me.role : ''}</div>
</div>
</RowFlex>
</>
</Link>
  </LinkWrapper>
  <SidebarTrigger
    onClick={()=>setsidebar("200px")}
  content={<Icon icon="fas fa-bars" />}
  />
  </Navbar>
      </div>
      :''
      }
      <div className="side_bar " style={{width:sidebar}}>
      <List>
      {/* <ListItem>
        <Button fullWidth 
        onClick={handleTheme}
        funcss='text-left card' rounded startIcon={  <Icon icon={theme == "light" ? "fas fa-moon" : "fas fa-sun"}/>} 
        text={theme == "light" ? "Dark Mode" : "Light Mode"}/>
        </ListItem> */}
      <Link href={'/user'}>
      <ListItem>
        <Button fullWidth funcss='text-left card' rounded startIcon={<Icon icon="bx bx-home-alt" />} text="Profile" />
        </ListItem>
      </Link>
   {
    me.role === 'super' ?
    <Link href={'/staff'}>
    <ListItem>
      <Button fullWidth funcss='text-left card' rounded startIcon={<Icon icon="bx bx-user" />} text="Staffs" />
      </ListItem>
    </Link>
    : ''
   }
     {
      me.role ?
      <>
       <Link href={'/dashboard'}>
      <ListItem>
        <Button fullWidth funcss='text-left card' rounded startIcon={<Icon icon="bx bx-chart" />} text="DashBoard" />
        </ListItem>
      </Link>
      <Link href={'/students'}>
      <ListItem>
        <Button fullWidth funcss='text-left card' rounded startIcon={<Icon icon="bx bx-user-pin" />} text="Students" />
        </ListItem>
      </Link>
      </>
      :      <Link href={'/user/update'}>
      <ListItem>
        <Button fullWidth funcss='text-left card' rounded startIcon={<Icon icon="bx bx-edit" />} text="Update" />
        </ListItem>
      </Link>
     }
      <Link href={'/log'}>
      <ListItem>
        <Button fullWidth funcss='text-left card' rounded startIcon={<Icon icon="bx bx-book" />} text="Logs" />
        </ListItem>
      </Link>
      <div className='section bt' />
      <Link href={'/'}>
      <ListItem>
        <Button onClick={()=>logOut()} fullWidth rounded bg='light-danger card' startIcon={<Icon icon="bx bx-exit" />} text="Logout" />
        </ListItem>
      </Link>
      </List>
      </div>
    </div>
  )
}
