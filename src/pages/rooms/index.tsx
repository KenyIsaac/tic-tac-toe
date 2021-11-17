import React, { FC } from 'react'
import { Button, H1 } from 'components'
import RoomList from './room-list'
import { useHistory } from 'react-router-dom'



const RoomsPage: FC = () => {
  const history = useHistory()

  function handleClick() {
    history.push('/')
  }

  return (
    <>
      <H1>Salas</H1>
      { }
      <RoomList />
      <Button onClick={handleClick}>Regresar al inicio</Button>
    </>
  )
}

export default RoomsPage
