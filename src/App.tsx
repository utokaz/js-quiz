import { Route, Routes } from 'react-router-dom'

import { Quiz } from './page/Quiz'
import { Result } from './page/Result'
import { Top } from './page/Top'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Top />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/result" element={<Result />} />
    </Routes>
  )
}

export default App
