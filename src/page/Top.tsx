import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGameOver, useGameStart } from '../privider/GameProvider'
import styles from '../styles/Top.module.css'

export const Top = () => {
  const navigate = useNavigate()
  const start = useGameStart()
  const gameOver = useGameOver()
  const onCLickStart = () => {
    navigate('/quiz')
    start()
  }

  useEffect(() => {
    gameOver()
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.inner_container}>
        <h1>JavaScript Quiz</h1>
        <button className={styles.start_button} onClick={onCLickStart}>
          クイズを始める
        </button>
      </div>
    </div>
  )
}
