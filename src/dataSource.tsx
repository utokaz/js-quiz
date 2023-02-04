import { ReactElement } from 'react'
import brendanEichImage from './assets/BrendanEich.jpeg'
import jsLogo from './assets/js_logo.png'
import styles from './styles/DataSource.module.css'

type DataSource = {
  id: number
  question: string
  code?: string
  answerId: number
  Image?: ReactElement
  keywords?: string[]
  selections: {
    id: number
    selectStr: ReactElement | string
  }[]
}[]

export const dataSource: DataSource = [
  {
    id: 1,
    question:
      '2022年現在、JavaScriptは現在全てのウェブサイトのうちどのくらいの割合で利用されているでしょう？',
    answerId: 2,
    Image: (
      <img
        alt="javascript logo"
        height={300}
        className={styles.image}
        src={jsLogo}
      />
    ),
    selections: [
      { id: 1, selectStr: '100%' },
      { id: 2, selectStr: '97%' },
      { id: 3, selectStr: '78%' },
      { id: 4, selectStr: '65%' },
    ],
  },
  {
    id: 2,
    question:
      'ブレンダン・アイク(JavaScriptの生みの親)がJavaScriptを作るのにかかった期間は次のうちどれでしょう？',
    answerId: 1,
    Image: (
      <div className={styles.eich_image_container}>
        <img
          alt="Brendan Eich"
          height={300}
          className={styles.image}
          src={brendanEichImage}
        />
        <p className={styles.eich_cap}>
          <a href="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Brendan_Eich_Mozilla_Foundation_official_photo.jpg/1024px-Brendan_Eich_Mozilla_Foundation_official_photo.jpg">
            Brendan_Eich_Mozilla_Foundation_official_photo.jpg
          </a>
          <br />
          by Darcy Padilla is licensed under CC By-SA 3.0
        </p>
      </div>
    ),
    selections: [
      { id: 1, selectStr: '10日間' },
      { id: 2, selectStr: '1ヶ月' },
      { id: 3, selectStr: '4ヶ月' },
      { id: 4, selectStr: '2年' },
    ],
  },
  {
    id: 3,
    question: 'このプログラムを実行したときの出力結果を選んでください',
    code: `var companyName = "sys21"

for (let i = 0; i< 5; i++) {
    var companyName = \`sys2\${i}\`
}

console.log(companyName)`,
    answerId: 4,
    selections: [
      { id: 1, selectStr: 'sys21' },
      { id: 2, selectStr: 'sys22' },
      { id: 3, selectStr: 'sys23' },
      { id: 4, selectStr: 'sys24' },
    ],
    keywords: ['グローバルスコープ', '巻き上げ', 'let', 'const'],
  },
  {
    id: 4,
    question:
      '環境に左右されない汎用的な言語のコア部分としてのJavaScriptの標準規格はなんという名前でしょうか',
    answerId: 1,
    selections: [
      { id: 1, selectStr: 'ECMAScript' },
      { id: 2, selectStr: 'LiveScript' },
      { id: 3, selectStr: 'ActionScript' },
      { id: 4, selectStr: 'CoffeeScript' },
    ],
    keywords: ['Ecma International', 'CommonJS', 'サーバーサイドJS'],
  },
  {
    id: 5,
    question: 'このプログラムを実行したときの出力結果を選んでください',
    code: `class Person {
    hobby = "play piano"
    logHobbyOneSecLater = function() {
        // 第一引数に1000ミリ秒後(1秒後)に実行される関数を渡す
        setTimeout(function() {
            console.log(this.hobby)
        }, 1000)
    }
}

const p = new Person();
p.logHobbyOneSecLater()`,
    answerId: 3,
    selections: [
      { id: 1, selectStr: 'play piano' },
      { id: 2, selectStr: 'null' },
      { id: 3, selectStr: 'undefined' },
      { id: 4, selectStr: 'ランタイムエラーが起きる' },
    ],
    keywords: [
      'this',
      'bindメソッド',
      'callメソッド',
      'applyメソッド',
      'レキシカルスコープ',
      'アロー関数',
    ],
  },
  {
    id: 6,
    question: 'このプログラムを実行したときの出力結果を選んでください',
    code: `console.log("1")

setTimeout(() => {
    console.log("2")
}, 0)

console.log("3")`,
    answerId: 2,
    selections: [
      {
        id: 1,
        selectStr: (
          <>
            1<br />
            2<br />
            3<br />
          </>
        ),
      },
      {
        id: 2,
        selectStr: (
          <>
            1<br />
            3<br />
            2<br />
          </>
        ),
      },
      {
        id: 3,
        selectStr: (
          <>
            3<br />
            2<br />
            1<br />
          </>
        ),
      },
      {
        id: 4,
        selectStr: (
          <>
            2<br />
            1<br />
            3<br />
          </>
        ),
      },
    ],
    keywords: ['非同期処理', 'イベントループ', 'シングルスレッド'],
  },
]
