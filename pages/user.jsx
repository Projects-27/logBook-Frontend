import React from 'react'
import {isOnline} from '../Functions/Functions'
import { useEffect } from 'react'
import { useState } from 'react'
import Nav from '../components/Nav'
import Circle from 'funuicss/component/Circle'
import RowFlex from 'funuicss/component/RowFlex'
import Button from 'funuicss/component/Button'
import Icon from 'funuicss/component/Icon'
export default function User() {
    const [me, setme] = useState('')
    useEffect(() => {
    isOnline()
    .then(data=>{
        setme(data)
    })
    }, [])
    
  return (
  <div>
    {
        me ?
        <div>
        <Nav />
        <div className='content'>
         <div className='center width-800-max'>
         <Circle bg={"light"} funcss='center' size={"8rem"} hoverable>
  <Icon icon={"fas fa-user"} size='jumbo' />
  </Circle>
  <div className='section padding-top-30'>
      <RowFlex justify='center' gap='1rem'>
          <div>
          <span>Full Name: </span>
          <Button text={me.UserName} smaller rounded bg='light'/>
          </div>
          <div>
          <span>Matric: </span>
          <Button text={me.MatrixNumber} smaller rounded bg='light'/>
          </div>
          <div>
          <span>Level: </span>
          <Button text={me.Level} smaller rounded bg='light'/>
          </div>
      </RowFlex>
  </div>
  <div className='section'>
      <RowFlex justify='center' gap='1rem'>
          <div>
          <span>Department: </span>
          <Button text={me.Department} smaller rounded bg='light'/>
          </div>
          <div>
          <span>Institution: </span>
          <Button text={me.InstitutionName} smaller rounded bg='light'/>
          </div>
      </RowFlex>
  </div>
         </div>
        </div>
      </div>
      :''
    }
  </div>
  )
}
