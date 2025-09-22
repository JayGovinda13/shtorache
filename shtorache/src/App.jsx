import { useState } from 'react'
import LandingPage from './components/Landing-Page/Landing-Page'
import CssBaseline from '@mui/material/CssBaseline';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div style={{ margin: 0, padding: 0 }}>
      <CssBaseline />
      <LandingPage />
    </div>
  )
}

export default App
