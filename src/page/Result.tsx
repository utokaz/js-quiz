import { useEffect, useRef } from 'react'
import {
  useGameOver,
  useGameStart,
  useIsPlaying,
  useResult,
} from '../privider/GameProvider'
import { dataSource } from '../dataSource'
import { useNavigate } from 'react-router-dom'
import styles from '../styles/Result.module.css'
import { useReward } from 'react-rewards'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { nightOwl } from 'react-syntax-highlighter/dist/cjs/styles/hljs'
import useBreakpoints from '../hooks/useBreakPoints'
import { CopyButton } from '../components/CopyButton'

export const Result = () => {
  const result = useResult()
  const gameOver = useGameOver()
  const start = useGameStart()
  const navigate = useNavigate()
  const isPlaying = useIsPlaying()
  const { reward } = useReward('result_rewards', 'confetti', {
    lifetime: 1000,
    elementCount: 300,
    spread: 120,
    zIndex: 999,
  })
  const rewardInitialized = useRef(false)
  const { isXs } = useBreakpoints()

  const correctCount = result.reduce((prev, current) => {
    const target = dataSource.find((d) => d.id === current.id)
    if (target?.answerId === current.answer) {
      return prev + 1
    } else {
      return prev
    }
  }, 0)

  const restart = () => {
    start()
    navigate('/quiz')
  }

  useEffect(() => {
    if (!rewardInitialized.current) {
      reward()
      rewardInitialized.current = true
    }

    if (!isPlaying) {
      navigate('/', { replace: true })
    }
    gameOver()
  }, [gameOver, isPlaying, navigate, reward])

  return (
    <div className={styles.container}>
      <p id="result_rewards" className={styles.correct_count}>
        {correctCount === dataSource.length
          ? '素晴らしい。全問正解です！'
          : `${dataSource.length}問中${correctCount}正解でした！`}
      </p>

      <div className={styles.answers_container}>
        {dataSource.map((d, i) => {
          const answer = d.selections.find(
            (s) => s.id === d.answerId,
          )?.selectStr
          return (
            <div key={d.id} className={styles.answer}>
              <div className={styles.answer_container}>
                <p className={styles.question}>{`Q${i + 1}. ${d.question}`}</p>
                {typeof answer === 'string' ? (
                  <p className={styles.question}>{`A. ${answer}`}</p>
                ) : (
                  <>
                    <span>A. </span>
                    {answer}
                  </>
                )}
                {d.keywords && (
                  <p className={styles.keywords}>
                    <span>キーワード: </span>
                    {`${d.keywords.join(', ')}`}
                  </p>
                )}
              </div>

              {d.code && (
                <div className={styles.code}>
                  <CopyButton copytext={d.code} className={styles.copy}>
                    copy
                  </CopyButton>
                  <SyntaxHighlighter
                    language="js"
                    style={nightOwl}
                    customStyle={{
                      fontSize: isXs ? '12px' : '16px',
                      padding: '16px',
                      borderRadius: '16px',
                      margin: '0px',
                      width: '100%',
                    }}
                  >
                    {d.code}
                  </SyntaxHighlighter>
                </div>
              )}
            </div>
          )
        })}
      </div>
      <button className={styles.restart_button} onClick={restart}>
        もう一度挑戦する
      </button>
    </div>
  )
}
