import React, { FC, useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { Button, Error, H1, Field } from 'components'
import { validateEmail } from 'helpers'
import { useCurrentUser, useSearchParams } from 'hooks'
import { auth } from 'services'

const LoginPage: FC = () => {
  const history = useHistory()
  const user = useCurrentUser()
  const [email, setEmail] = useState('')
  const [emailErr, setEmailErr] = useState<string | undefined>()
  const [password, setPassword] = useState('')
  const [passwordErr, setPasswordErr] = useState<string | undefined>()
  const [firebaseErr, setFirebaseErr] = useState<string | undefined>()
  const [isLoggingIn, setIsLoggingIn] = useState(false)

  const { redirect, player } = useSearchParams()

  const performRedirect = useCallback(() => {
    if (!redirect) return history.push('/')
    if (!player) return history.push(`/${redirect}`)
    return history.push(`/${redirect}?player=${player}`)
  }, [history, player, redirect])

  useEffect(() => {
    if (user) performRedirect()
  }, [performRedirect, user])

  useEffect(() => {
    setEmailErr(undefined)
    setPasswordErr(undefined)
  }, [email, password])

  async function handleLogin() {
    if (email.length === 0) return setEmailErr('Correo requerido')
    if (!validateEmail(email)) return setEmailErr('El correo no es válido')
    if (password.length === 0) return setPasswordErr('Contraseña obligatoria')

    setIsLoggingIn(true)

    try {
      await auth.signInWithEmailAndPassword(email, password)
      performRedirect()
    } catch (err) {
      setFirebaseErr(err.message)
      setIsLoggingIn(false)
    }
  }

  function goToSignup() {
    history.push('/signup')
  }

  function goBack() {
    history.push('/')
  }

  return (
    <>
      <H1>Registro</H1>
      <Field
        errMessage={emailErr}
        id="email"
        label="Correo electrónico"
        onChange={setEmail}
        placeholder="Inserte su dirección de correo"
        type="email"
        value={email}
      />
      <Field
        errMessage={passwordErr}
        id="password"
        label="Contraseña"
        onChange={setPassword}
        placeholder="Ingrese su contraseña"
        type="password"
        value={password}
      />
      {firebaseErr && <Error>{firebaseErr}</Error>}
      <Button disabled={isLoggingIn} onClick={handleLogin}>
        Iniciar{isLoggingIn ? 'ging' : ''} Sesión
      </Button>
      <Button onClick={goToSignup}>Iniciar automático</Button>
      <Button onClick={goBack}>Regresar a inicio</Button>
    </>
  )
}

export default LoginPage
