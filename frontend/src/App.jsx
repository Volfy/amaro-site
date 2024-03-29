import Header from './components/Header'
import Footer from './components/Footer'
import Builder from './components/Builder'
import Recipes from './components/Recipes'
import Recipe from './components/Recipe'
import Ingredients from './components/Ingredients'
import { BuilderContextProvider } from './BuilderContext'
import { 
  BrowserRouter as Router,
  Routes, Route
} from 'react-router-dom'
import { useQuery } from 'react-query'
import { getRecipes } from './requests'

const BuilderWrapped = () => (
  <BuilderContextProvider>
    <Builder />
  </BuilderContextProvider>
)


function App() {
  const recipeData = useQuery('recipes', getRecipes, {
    refetchOnWindowFocus: false,
  })
  
  if(recipeData.isLoading) { 
    return <div>LOADING DATA</div>
  }
  if (recipeData.isError) {
    return <div>ERROR IN DATA</div>
  }

  return (
    <div className="flex flex-col h-screen justify-between w-screen max-w-6xl items-center">
      <Router>
        <Header />
        
        <hr className="w-full h-0.5 my-4 bg-slate-200"/>

        <main className="flex-grow w-10/12 self-center my-4 flex flex-col justify-between">
          
          <Routes>
            <Route path='/' element={<BuilderWrapped />}/>
            <Route path='/:id' element={<div>supposed pre-fill builder</div>}/>
            <Route path='/recipes' element={<Recipes />}/>
            <Route path='/recipes/:id' element={<Recipe />} />
            <Route path='/ingredients' element={<Ingredients />}/>
          </Routes>
          
        </main>
      </Router>

      <hr className="w-full h-0.5 my-4 bg-slate-200"/>

      <Footer />

    </div>
  )
}

export default App
