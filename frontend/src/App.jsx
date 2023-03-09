import Header from './components/Header'
import Footer from './components/Footer'
import { useState } from 'react'

const Title = () => {
  const [title, setTitle] = useState('Title')
  const [isTitleFocused, setIsTitleFocused] = useState(false)

  return (
    <div>
      {!isTitleFocused
        ? (
          <h2 onClick={() => {setIsTitleFocused(true)}}
            className='text-4xl flex-shrink'>
            {title}
          </h2>
        )
        : (
          <input type="text" 
            autoFocus
            value={title}
            onChange={event => setTitle(event.target.value)}
            onBlur={() => setIsTitleFocused(false)}
            className='text-4xl flex-shrink'
          />
        )
      }
    </div>
  )
}

function App() {
  return (
    <div className="flex flex-col h-screen justify-between w-screen max-w-7xl">
      <Header />
      <hr className="my-4 bg-black"/>

      <main className="flex-grow w-full my-4 flex flex-col items-center">
        <form action="" className='h-full flex flex-col justify-between'>
          <Title />
          <div>
            <h2>INGREDIENTS</h2>
          </div>

          <div>
            <h2>PROCESS</h2>
          </div>

          <div>
            <h2>Tasting Notes / Description</h2>
          </div>


          <button type="submit" onClick={event => event.preventDefault()}>Add Recipe</button>
        </form>
      </main>

      <hr className="my-4"/>
      <Footer />

    </div>
  )
}

export default App
