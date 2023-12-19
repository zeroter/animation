import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

function createAnimation() {
  const root = document.createElement('div')
  root.id = 'ushopaid-animation'
  document.body.appendChild(root)

  ReactDOM.createRoot(document.getElementById('ushopaid-animation')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}

window.onload = () => {
  createAnimation()
}
