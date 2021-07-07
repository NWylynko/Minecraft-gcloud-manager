import React from "react"
import axios from "axios"

const { post } = axios.create({
  baseURL: "https://us-central1-minecraft-80045.cloudfunctions.net/",
  timeout: 10000,
})

const startServer = () => {
  return post("/start")
}

const stopServer = () => {
  return post("/stop")
}

export default function Home() {
  return (
    <main>
      <h1>Mc Control</h1>
      <button onClick={startServer}>Start Server</button>
      <button onClick={stopServer}>Stop Server</button>
    </main>
    )
}