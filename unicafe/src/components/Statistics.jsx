import { useCounterFeedbackValues } from "../store"

const Statistics = () => {
  const {goodCount, neutralCount, badCount, counter} = useCounterFeedbackValues()
  const all = counter
  const average = all > 0 ? (goodCount - badCount) / all : 0
  const positive = all > 0 ? (goodCount / all) * 100 : 0

  return (
    <div>
      <h2>statistics</h2>
      <table>
        <tbody>
          <tr><td>good</td><td>{goodCount}</td></tr>
          <tr><td>neutral</td><td>{neutralCount}</td></tr>
          <tr><td>bad</td><td>{badCount}</td></tr>
          <tr><td>all</td><td>{all}</td></tr>
          <tr><td>average</td><td>{average}</td></tr>
          <tr><td>positive</td><td>{positive} %</td></tr>
        </tbody>
      </table>
    </div>
  )
}

export default Statistics
