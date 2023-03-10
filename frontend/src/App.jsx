import Header from './components/Header'
import Footer from './components/Footer'
import Builder from './components/Builder'




function App() {
  return (
    <div className="flex flex-col h-screen justify-between w-screen max-w-6xl items-center">
      <Header />
      
      <hr className="w-full h-0.5 my-4 bg-slate-200"/>

      <main className="flex-grow w-10/12 self-center my-4 flex flex-col justify-between">
        <Builder />
      </main>

      <hr className="w-full h-0.5 my-4 bg-slate-200"/>

      <Footer />

    </div>
  )
}

export default App
