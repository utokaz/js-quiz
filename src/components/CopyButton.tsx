import { ComponentPropsWithoutRef, useState } from 'react'
import styles from '../styles/CopyButton.module.css'

type CopyButtonProps = ComponentPropsWithoutRef<'button'> & {
  copytext: string
}

export const CopyButton = (props: CopyButtonProps) => {
  const [innnerText, setInnerText] = useState<'copy' | 'copied!'>('copy')
  const { className, copytext } = props

  const onClickCopy = () => {
    setInnerText('copied!')
    window.navigator.clipboard.writeText(copytext)
    setTimeout(() => {
      setInnerText('copy')
    }, 1000)
  }
  return (
    <button
      disabled={innnerText === 'copied!'}
      onClick={onClickCopy}
      {...props}
      className={`${styles.copy} ${className}`}
    >
      {innnerText}
    </button>
  )
}
