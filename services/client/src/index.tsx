import React from "react"
import ReactDOM from "react-dom/client"

function App() {
  return <p>Hello, client!</p>
}

const root = document.getElementById("root")
if (!root) throw new Error("Missing root")
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
