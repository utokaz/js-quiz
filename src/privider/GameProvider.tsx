import {
  createContext,
  ReactNode,
  useContext,
  SetStateAction,
  useState,
  Dispatch,
} from 'react'

type GameProviderProps = {
  children: ReactNode
}

type GameState = {
  isPlaying: boolean
  answers: { id: number; answer: number }[]
}
type GameContext = {
  game: GameState
  setGame: Dispatch<SetStateAction<GameState>>
}

const ctx = createContext<GameContext | null>(null)

export const GameStateProvider = ({ children }: GameProviderProps) => {
  const [game, setGame] = useState<GameState>({ isPlaying: false, answers: [] })
  return (
    <ctx.Provider
      value={{
        game,
        setGame,
      }}
    >
      {children}
    </ctx.Provider>
  )
}

export const useGame = () => {
  const game = useContext(ctx)
  if (game == null) {
    throw new Error('useGameStart must be used within Game Provider')
  }
  return game.game
}

export const useGameStart = () => {
  const mutate = useContext(ctx)
  if (mutate == null) {
    throw new Error('useGameStart must be used within Game Provider')
  }
  return () => {
    mutate.setGame((game) => {
      game.isPlaying = true
      game.answers = []
      return { ...game }
    })
  }
}

export const useGameOver = () => {
  const mutate = useContext(ctx)
  if (mutate == null) {
    throw new Error('useGameStart must be used within Game Provider')
  }
  return () => {
    mutate.setGame((game) => {
      game.isPlaying = false
      return { ...game }
    })
  }
}

export const useAnswer = () => {
  const mutate = useContext(ctx)
  if (mutate == null) {
    throw new Error('useAnswer must be used within Game Provider')
  }
  return (answer: GameState['answers'][number]) => {
    mutate.setGame((game) => {
      if (game.answers.find((a) => a.id === answer.id) === undefined) {
        const answers = [...game.answers, answer]
        game.answers = answers
        return { ...game }
      }
      return game
    })
  }
}
