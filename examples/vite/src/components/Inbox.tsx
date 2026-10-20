import { useState } from 'react'
import { useTranslation } from 'react-use-translation'

function Inbox() {
  const [count, setCount] = useState(1)
  const title = useTranslation('inbox.title')
  const message = useTranslation('inbox.count', { count })
  const add = useTranslation('inbox.add')
  const clear = useTranslation('inbox.clear')

  return (
    <section className="card">
      <h2>{title}</h2>
      <p aria-live="polite">{message}</p>
      <div className="actions">
        <button type="button" onClick={() => setCount((c) => c + 1)}>
          {add}
        </button>
        <button type="button" onClick={() => setCount(0)}>
          {clear}
        </button>
      </div>
    </section>
  )
}

export default Inbox
