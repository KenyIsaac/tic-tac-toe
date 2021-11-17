import React, { FC } from 'react'
import { useHistory } from 'react-router-dom'

import { Button, H1, Logout } from 'components'
import { useCreateRoom, useCurrentUser } from 'hooks'

const Home: FC = () => {
  const history = useHistory()
  const user = useCurrentUser()
  const { createRoom, isCreatingRoom } = useCreateRoom()

  function goToJoinRoom() {
    history.push('/r')
  }

  function goToLogin() {
    history.push('/login')
  }

  function goToProfile() {
    history.push(`/u/${user!.id}`)
  }

  function goToSignup() {
    history.push('/signup')
  }

  async function handleCreateRoom() {
    const roomId = await createRoom()
    history.push(`/r/${roomId}`)
  }

  return (
    <>
      <H1>Página de inicio</H1>
      <Button onClick={goToJoinRoom}>Salas de juego</Button>
      {user ? (
        <>
          <Button disabled={isCreatingRoom} onClick={handleCreateRoom}>
            Crear{isCreatingRoom ? 'ing' : 'e'} Nueva sala
          </Button>
          <Button onClick={goToProfile}>Perfil</Button>
          <Logout />
        </>
      ) : (
        <>
          <Button onClick={goToLogin}>Registrarse</Button>
          <Button onClick={goToSignup}>Iniciar Sesión</Button>
        </>
      )}
    </>
  )
}

export default Home
