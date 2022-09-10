import { createContext, ReactNode, useContext } from 'react'

type GameProviderProps = {
  children: ReactNode
}

type GameContext = {
  isPlaying: boolean
  answers: { id: number; answer: number }[]
}

const ctx = createContext<GameContext | null>(null)

export const GameProvider = ({ children }: GameProviderProps) => {
  return (
    <ctx.Provider value={{ isPlaying: false, answers: [] }}>
      {children}
    </ctx.Provider>
  )
}

export const useGameStart = () => {
  const game = useContext(ctx)
  if (game == null) {
    throw new Error('useGameStart must be used within Game Provider')
  }
  return () => {
    game.answers = []
    game.isPlaying = true
  }
}

export const useGameOver = () => {
  const game = useContext(ctx)
  if (game == null) {
    throw new Error('useGameOver must be used within Game Provider')
  }
  return () => {
    game.isPlaying = false
  }
}

export const useIsPlaying = () => {
  const game = useContext(ctx)
  if (game == null) {
    throw new Error('useIsPlaying must be used within Game Provider')
  }
  return game.isPlaying
}

export const useAnswer = () => {
  const game = useContext(ctx)
  if (game == null) {
    throw new Error('useAnswer must be used within Game Provider')
  }
  return (answer: GameContext['answers'][number]) => {
    game.answers.push(answer)
  }
}

export const useResult = () => {
  const game = useContext(ctx)
  if (game == null) {
    throw new Error('useAnswer must be used within Game Provider')
  }
  return [...game.answers]
}
