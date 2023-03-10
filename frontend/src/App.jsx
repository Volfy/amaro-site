import Header from './components/Header'
import Footer from './components/Footer'
import Builder from './components/Builder'




function App() {
  return (
    <div className="flex flex-col h-screen justify-between w-screen max-w-7xl">
      <Header />
      <hr className="my-4 bg-black"/>

      <main className="flex-grow w-full my-4 flex flex-col items-center justify-between">
        <Builder />
      </main>

      <hr className="my-4"/>
      <Footer />

    </div>
  )
}

export default App
