import React from 'react'
import { useHistory } from 'react-router-dom'

import { Button, H1 } from 'components'
import { useClearBoard, useRoom } from 'hooks'

import Board from './board'
import PlayerDisplay from './player-display'
import { Container } from './styles'

const Room = () => {
  const { clearBoard, isClearing } = useClearBoard()
  const history = useHistory()
  const { isFetching, room } = useRoom()

  if (isFetching) return <H1>Esperando sala...</H1>
  if (!room) return <H1>Sala no encontrada</H1>

  const { message, startingTurn } = room

  async function handleClear() {
    await clearBoard(startingTurn)
  }

  function goBack() {
    history.push('/')
  }

  return (
    <Container>
      <H1>{message}</H1>
      <Board />
      <PlayerDisplay player="X" />
      <PlayerDisplay player="O" />
      <Button disabled={isClearing} onClick={handleClear}>
        Borrar{isClearing ? 'ing' : ''} tablero
      </Button>
      <Button onClick={goBack}>Regresar al inicio</Button>
    </Container>
  )
}

export default Room
