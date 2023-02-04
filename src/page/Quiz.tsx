import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'
import styles from '../styles/Quiz.module.css'
import { dataSource } from '../dataSource'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAnswer, useGame } from '../privider/GameProvider'
import useBreakpoints from '../hooks/useBreakPoints'
import { Prism } from 'react-syntax-highlighter'

export const Quiz = () => {
  const navigate = useNavigate()
  const { isPlaying } = useGame()
  const answer = useAnswer()
  const [gameIndex, setGameIndex] = useState(0)
  const quiz = dataSource[gameIndex]
  const { isXs } = useBreakpoints()
  const innerContainerRef = useRef<HTMLDivElement | null>(null)

  const onClickAnswer = (answerId: number) => {
    const id = dataSource[gameIndex].id
    answer({ id, answer: answerId })
    if (gameIndex + 1 !== dataSource.length) {
      setGameIndex((prev) => prev + 1)
    } else {
      navigate('/result')
    }
  }

  useEffect(() => {
    if (!isPlaying) {
      navigate('/', { replace: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const containerRef = innerContainerRef.current
    let id: number | undefined
    if (containerRef) {
      id = requestAnimationFrame(() => {
        if (innerContainerRef.current) {
          innerContainerRef.current.style.transition = '600ms'
          innerContainerRef.current.style.opacity = '1'
          innerContainerRef.current.style.transform = 'translateY(0px)'
        }
      })
    }
    return () => {
      if (containerRef) {
        containerRef.style.transition = ''
        containerRef.style.opacity = ''
        containerRef.style.transform = ''
      }
      if (id !== undefined) {
        cancelAnimationFrame(id)
        id = undefined
      }
    }
  }, [gameIndex])

  return (
    <div className={styles.container}>
      <div className={styles.inner_container} ref={innerContainerRef}>
        <div className={styles.quiz}>
          <span>Q{gameIndex + 1}. </span>
          <p className={styles.quiz_phrase}>{quiz.question}</p>
        </div>
        {quiz.Image && quiz.Image}
        {quiz.code && (
          <Prism
            language="javascript"
            style={dracula}
            customStyle={{
              maxWidth: '80%',
              padding: '24px',
              borderRadius: '16px',
              fontSize: isXs ? '14px' : '24px',
              margin: '0px',
            }}
          >
            {quiz.code}
          </Prism>
        )}

        <div className={styles.answer_container}>
          {quiz.selections.map((s) => (
            <button
              key={s.id}
              className={styles.answer_button}
              onClick={() => onClickAnswer(s.id)}
            >
              {s.selectStr}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
