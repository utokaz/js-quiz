import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/default-highlight'
import { nightOwl } from 'react-syntax-highlighter/dist/cjs/styles/hljs'
import styles from '../styles/Quiz.module.css'
import { dataSource } from '../dataSource'
import { useEffect, useInsertionEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAnswer, useIsPlaying } from '../privider/GameProvider'
import useBreakpoints from '../hooks/useBreakPoints'

export const Quiz = () => {
  const navigate = useNavigate()
  const answer = useAnswer()
  const [gameIndex, setGameIndex] = useState(0)
  const quiz = dataSource[gameIndex]
  const isPlaying = useIsPlaying()
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
  }, [])

  useEffect(() => {
    if (innerContainerRef.current) {
      requestAnimationFrame(() => {
        if (innerContainerRef.current) {
          innerContainerRef.current.style.transition = '600ms'
          innerContainerRef.current.style.opacity = '1'
          innerContainerRef.current.style.transform = 'translateY(0px)'
        }
      })
    }
    return () => {
      if (innerContainerRef.current) {
        innerContainerRef.current.style.transition = ''
        innerContainerRef.current.style.opacity = ''
        innerContainerRef.current.style.transform = ''
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
        {quiz.Image && <quiz.Image className={styles.image} />}
        {quiz.code && (
          <SyntaxHighlighter
            language="js"
            style={nightOwl}
            customStyle={{
              maxWidth: '80%',
              padding: '24px',
              borderRadius: '16px',
              fontSize: isXs ? '14px' : '24px',
              margin: '0px',
            }}
          >
            {quiz.code}
          </SyntaxHighlighter>
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
