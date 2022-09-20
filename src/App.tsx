import { BrowserRouter } from 'react-router-dom'
import { GameProvider } from './privider/GameProvider'
import { AppRoutes } from './routes'

function App() {
  return (
    <BrowserRouter>
      <GameProvider>
        <AppRoutes />
      </GameProvider>
    </BrowserRouter>
  )
}

export default App
