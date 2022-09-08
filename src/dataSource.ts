type DataSource = {
  question: string
  code?: string
  answerId: number
  selections: {
    id: number
    selectStr: string
  }[]
}[]

export const dataSource: DataSource = [
  {
    question:
      'ブレンダン・アイク(JavaScriptを作った人)がJavaScriptの処理系（実行するためのプログラム）をどれくらいの期間で作成したでしょう？',
    answerId: 1,
    selections: [
      { id: 1, selectStr: '10日間' },
      { id: 2, selectStr: '1ヶ月' },
      { id: 3, selectStr: '4ヶ月' },
      { id: 4, selectStr: '2年' },
    ],
  },
  {
    question: 'このプログラムの出力結果を選んでください',
    code: `var companyName = "sys21"

for (let i = 0; i < 5; i++) {
    var companyName = \`sys2\${\i\}\`
}

console.log(companyName)`,
    answerId: 3,
    selections: [],
  },
  {
    question: 'このプログラムの出力結果を選んでください',
    code: `console.log("1")

setTimeout(() => {
    console.log("2")
})

console.log("3")`,
    answerId: 3,
    selections: [],
  },
  {
    question:
      '環境に左右されない汎用的な言語のコア部分としてのJavaScriptの標準規格はなんという名前でしょうか',
    answerId: 4,
    selections: [],
  },
]
