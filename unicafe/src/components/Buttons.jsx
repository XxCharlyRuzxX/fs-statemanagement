import { useCounterFeedBackControls } from "../store"

const Buttons = () => {
  const {incrementGoodCount, incrementNeutralCount, incrementBadCount} = useCounterFeedBackControls()
  return (
    <div>
      <h2>give feedback</h2>
      <button type="button" onClick={incrementGoodCount}>good</button>
      <button type="button" onClick={incrementNeutralCount}>neutral</button>
      <button type="button" onClick={incrementBadCount}>bad</button>
    </div>
  )
}

export default Buttons
