import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/default-highlight'
import { nightOwl } from 'react-syntax-highlighter/dist/cjs/styles/hljs'
import styles from '../styles/Quiz.module.css'
import { dataSource } from '../dataSource'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAnswer, useIsPlaying } from '../privider/GameProvider'

export const Quiz = () => {
  const navigate = useNavigate()
  const answer = useAnswer()
  const [gameIndex, setGameIndex] = useState(0)
  const quiz = dataSource[gameIndex]
  const isPlaying = useIsPlaying()

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

  return (
    <div className={styles.container}>
      <div className={styles.quiz}>
        <span>Q{gameIndex + 1}. </span>
        <p className={styles.quiz_phrase}>{quiz.question}</p>
      </div>
      {quiz.image}
      {quiz.code && (
        <SyntaxHighlighter
          language="js"
          style={nightOwl}
          customStyle={{
            padding: '16px',
            borderRadius: '24px',
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
  )
}
