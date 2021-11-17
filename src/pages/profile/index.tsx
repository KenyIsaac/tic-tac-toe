import React, { FC } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import { Button, H1, P } from 'components'
import { useUser } from 'hooks'

import Content from './content'

const ProfilePage: FC = () => {
  const history = useHistory()
  const { userId } = useParams()
  const { isFetching, user } = useUser(userId)

  if (isFetching) return <H1>Obteniendo otros perfiles</H1>

  function goBack() {
    history.push('/')
  }

  return (
    <>
      <H1>Perfil de usuario</H1>
      {user ? (
        <Content user={user} />
      ) : (
        <P>No se pudo conseguir el usuario: {userId}</P>
      )}
      <Button onClick={goBack}>Regresar</Button>
    </>
  )
}

export default ProfilePage
