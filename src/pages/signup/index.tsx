import React, { FC, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { Button, Error as ErrComponent, Field, H1 } from 'components'
import { validateEmail } from 'helpers'
import { useCurrentUser } from 'hooks'
import { auth, db } from 'services'

const SignupPage: FC = () => {
  const history = useHistory()
  const user = useCurrentUser()
  const [email, setEmail] = useState('')
  const [emailErr, setEmailErr] = useState<string | undefined>()
  const [password, setPassword] = useState('')
  const [passwordErr, setPasswordErr] = useState<string | undefined>()
  const [confirmPassword, setConfirmPassword] = useState('')
  const [confirmPasswordErr, setConfirmPasswordErr] = useState<
    string | undefined
  >()
  const [firebaseErr, setFirebaseErr] = useState<string | undefined>()
  const [isSigningUp, setIsSigningUp] = useState(false)

  useEffect(() => {
    if (user) history.push('/')
  }, [history, user])

  useEffect(() => {
    setEmailErr(undefined)
    setPasswordErr(undefined)
    setConfirmPasswordErr(undefined)
    setFirebaseErr(undefined)
  }, [email, password, confirmPassword])

  async function handleSignup() {
    if (email.length === 0) return setEmailErr('Correo es requerido')
    if (!validateEmail(email)) return setEmailErr('Correo inválido')
    if (password.length === 0) return setPasswordErr('Contraseña requerida')
    if (password.length < 6)
      return setPasswordErr('La contraseña debe tener al menos 6 carateres')
    if (confirmPassword.length === 0)
      return setConfirmPasswordErr('Debes confirmar la contraseña')
    if (password !== confirmPassword) {
      setPasswordErr('Las contraseñas deben coincidir')
      return setConfirmPasswordErr('Las contraseñas deben coincidir')
    }

    setIsSigningUp(true)

    try {
      const response = await auth.createUserWithEmailAndPassword(
        email,
        password
      )

      if (!response.user) throw new Error('Algo no va bien :(')

      await db
        .collection('Usuario')
        .doc(response.user.uid)
        .set({
          displayName: response.user.email?.split('@')[0] ?? '<Indefinido>',
        })
      history.push('/')
    } catch (ex) {
      setFirebaseErr(ex.message)
      setIsSigningUp(false)
    }
  }

  function goToLogin() {
    history.push('/login')
  }

  function goBack() {
    history.push('/')
  }

  return (
    <>
      <H1>Inicia Sesión</H1>
      <Field
        errMessage={emailErr}
        id="email"
        label="Correo"
        onChange={setEmail}
        placeholder="Ingresa tu correo"
        type="email"
        value={email}
      />
      <Field
        errMessage={passwordErr}
        id="password"
        label="Contraseña"
        onChange={setPassword}
        placeholder="Ingresa tu contraseña"
        type="password"
        value={password}
      />
      <Field
        errMessage={confirmPasswordErr}
        id="confirm-password"
        label="Confirma tu contraseña"
        onChange={setConfirmPassword}
        placeholder="Ingresa nuevamente tu contraseña"
        type="password"
        value={confirmPassword}
      />
      {firebaseErr && <ErrComponent>{firebaseErr}</ErrComponent>}
      <Button disabled={isSigningUp} onClick={handleSignup}>
        Regístarte{isSigningUp ? 'ing' : ''} aquí
      </Button>
      <Button onClick={goToLogin}>Inicia sesión</Button>
      <Button onClick={goBack}>Regresar al inicio</Button>
    </>
  )
}

export default SignupPage
