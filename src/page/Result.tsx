import { useEffect, useRef } from 'react'
import { useGame, useGameOver, useGameStart } from '../privider/GameProvider'
import { dataSource } from '../dataSource'
import { useNavigate } from 'react-router-dom'
import styles from '../styles/Result.module.css'
import { useReward } from 'react-rewards'
import { Prism } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'
import useBreakpoints from '../hooks/useBreakPoints'
import { CopyButton } from '../components/CopyButton'

export const Result = () => {
  const gameOver = useGameOver()
  const start = useGameStart()
  const navigate = useNavigate()
  const { isPlaying, answers: result } = useGame()

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <p id="result_rewards" className={styles.correct_count}>
          {correctCount === dataSource.length
            ? '素晴らしい。全問正解です！'
            : `${dataSource.length}問中${correctCount}正解でした！`}
        </p>
        <div className={styles.answers_container}>
          {dataSource.map((d, i) => {
            const answer = d.selections.find((s) => s.id === d.answerId)
            const userAnswerId = result.find((r) => r.id === d.id)?.answer
            const userAnswer = d.selections.find(
              (s) => s.id === userAnswerId,
            )?.selectStr
            return (
              <div key={d.id} className={styles.answer}>
                <span className={styles.result_mark}>
                  {userAnswerId === answer?.id ? `✔︎` : `❌`}
                </span>
                <div className={styles.answer_container}>
                  <p className={styles.question}>{`Q${i + 1}. ${
                    d.question
                  }`}</p>
                  {typeof answer?.selectStr === 'string' ? (
                    <>
                      <p
                        className={styles.question}
                      >{`答え. ${answer.selectStr}`}</p>
                      <hr className={styles.horizontal_line} />
                      <p className={styles.question}>
                        あなたの選んだ選択肢. {userAnswer}
                      </p>
                    </>
                  ) : (
                    <>
                      <span>答え. </span>
                      {answer?.selectStr}
                      <hr className={styles.horizontal_line} />
                      <span className={styles.question}>
                        あなたの選んだ選択肢.{' '}
                      </span>
                      {userAnswer}
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
                    <Prism
                      language="js"
                      style={dracula}
                      customStyle={{
                        fontSize: isXs ? '12px' : '16px',
                        padding: '16px',
                        borderRadius: '16px',
                        margin: '0px',
                        width: '100%',
                      }}
                    >
                      {d.code}
                    </Prism>
                  </div>
                )}
              </div>
            )
          })}
        </div>
        <button className={styles.restart_button} onClick={restart}>
          もう一度挑戦する
        </button>
      </main>
    </div>
  )
}
