import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/default-highlight'
import { nightOwl } from 'react-syntax-highlighter/dist/cjs/styles/hljs'
import styles from '../styles/Quiz.module.css'
import { dataSource } from '../dataSource'

export const Quiz = () => {
  return (
    <div className={styles.container}>
      <div className={styles.quiz}>
        <span>Q.</span>
        <p className={styles.quiz_phrase}>{dataSource[1].question}</p>
      </div>
      <SyntaxHighlighter
        language="js"
        style={nightOwl}
        customStyle={{
          padding: '32px',
          borderRadius: '8px',
          fontSize: '24px',
          margin: '0px',
        }}
      >
        {dataSource[1].code!}
      </SyntaxHighlighter>
      <div className={styles.answer_container}>
        <button className={styles.answer_button}>10日間</button>
        <button className={styles.answer_button}>1ヶ月</button>
        <button className={styles.answer_button}>4ヶ月</button>
        <button className={styles.answer_button}>2年</button>
      </div>
    </div>
  )
}
