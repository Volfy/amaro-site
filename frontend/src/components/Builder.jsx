import Title from './Title'
import Process from './Process'
import Notes from './Notes'
import IngredientsTable from './IngredientsTable'

const fakeData = [
  {
    id: '1',
    name:'wormwood',
    latinName: 'artemisia absinthium',
    description: 'its a herb',
    warnings: 'thujone',
    amount: '20'
  },
  {
    id: '2',
    name:'anise',
    description: 'its a seed',
    amount: '10'
  },
  {
    id: '3',
    name:'gentian',
    description: 'its a root',
    tags: 'bitter, earthy, uncooked potato',
    amount: '2'
  }
]

const Builder = () => {
  return (
    <>
      <Title className='w-full basis-1/12'/>
      <div className='w-full basis-5/12 ml-1'>
        <h2 className='text-2xl'>Ingredients</h2>
        <IngredientsTable data={fakeData}/>

      </div>

      <div className='w-full basis-3/12 ml-1'>
        <h2 className='text-2xl'>Process</h2>
        <Process />
      </div>

      <div className='w-full basis-3/12 ml-1'>
        <h2 className='text-2xl'>Tasting Notes / Description</h2>
        <Notes />
      </div>


      {/*<button type="submit" onClick={event => event.preventDefault()}>Add Recipe</button>*/}
    </>
 
  )
}

export default Builder