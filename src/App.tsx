import { BrowserRouter } from 'react-router-dom'
import { GameStateProvider } from './privider/GameProvider'
import { AppRoutes } from './routes'

function App() {
  return (
    <BrowserRouter basename="js-quiz">
      <GameStateProvider>
        <AppRoutes />
      </GameStateProvider>
    </BrowserRouter>
  )
}

export default App
