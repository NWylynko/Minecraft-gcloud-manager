import React, { useEffect, useState } from "react"
import firebase from "firebase/app"
import 'firebase/functions'
import 'firebase/auth'
import 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyBN5okyImN5ZKVomqIetX0wf1f89Kr9B-s",
  authDomain: "minecraft-80045.firebaseapp.com",
  databaseURL: "https://minecraft-80045-default-rtdb.firebaseio.com",
  projectId: "minecraft-80045",
  storageBucket: "minecraft-80045.appspot.com",
  messagingSenderId: "83377254027",
  appId: "1:83377254027:web:b086e07d0cb8e427d62e8e"
};

const firebaseApp = firebase.apps[0] ?? firebase.initializeApp(firebaseConfig)
const functions = firebase.functions()
const auth = firebase.auth()
const database = firebase.database();

const requestStart = window && functions.httpsCallable('start', { timeout: 5000 })
const requestStop = window && functions.httpsCallable('stop', { timeout: 5000 })

const serverStatus = database.ref('mc-server-1/status')

const startServer = async () => {
  try {
    serverStatus.set('RUNNING')
    await requestStart()
    console.log('started')
  } catch (error) {
    console.log(error)
  }
}

const stopServer = async () => {
  try {
    serverStatus.set('STOPPED')
    await requestStop()
    console.log('stopped')
  } catch (error) {
    console.log(error)
  }
}

// Creates the provider object.
const provider = new firebase.auth.GoogleAuthProvider();

const login = async () => {
  return auth.signInWithPopup(provider)
}

export default function Home() {

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<firebase.User>()
  const [status, setStatus] = useState<"STOPPED" | "RUNNING">()

  useEffect(() => {
    auth.onAuthStateChanged((user) => { setUser(user); setLoading(false) })
  }, [])

  useEffect(() => {
    database.ref('mc-server-1/status').on("value", (snapshot) => {
      setStatus(snapshot.val())
    })
  }, [])

  if (loading) {
    return (
      <main>
        <h3>Loading</h3>
      </main>
    )
  }

  if (!user) {
    return (
      <main>
        <h2>Login</h2>
        <button onClick={login}>Sign in with Google</button>
      </main>
    )
  }

  return (
    <main>
      <h1>Mc Control</h1>
      <h3>{status}</h3>
      <button onClick={startServer}>Start Server</button>
      <button onClick={stopServer}>Stop Server</button>
    </main>
    )
}