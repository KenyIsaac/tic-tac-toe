import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'

firebase.initializeApp({
  apiKey: "AIzaSyDPNuFH6S-1RadukcGrxpd6QY902Cij7Og",
  authDomain: "tic-tac-toe-393d0.firebaseapp.com",
  projectId: "tic-tac-toe-393d0",
  storageBucket: "tic-tac-toe-393d0.appspot.com",
  messagingSenderId: "1032649954521",
  appId: "1:1032649954521:web:5943721c6f551835c85ac8",
})

export const db = firebase.firestore()
export const auth = firebase.auth()
