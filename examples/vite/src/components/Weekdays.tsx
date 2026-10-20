import { Translate, useTranslation } from 'react-use-translation'

const days = [0, 1, 2, 3, 4, 5, 6]

function Weekdays() {
  const title = useTranslation('weekdays.title')

  return (
    <section className="card">
      <h2>{title}</h2>
      <ul className="weekdays">
        {days.map((index) => (
          <li key={index}>
            <Translate path={`weekdays.days[${index}]`} />
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Weekdays
