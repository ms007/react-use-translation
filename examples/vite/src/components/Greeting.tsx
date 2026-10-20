import { Translate } from 'react-use-translation'

type GreetingProps = {
  user: string
}

// Translate passes every prop except `path` into the template
function Greeting({ user }: GreetingProps) {
  return (
    <section className="card">
      <h2>
        <Translate path="greeting" user={user} />
      </h2>
    </section>
  )
}

export default Greeting
