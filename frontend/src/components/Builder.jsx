import Title from './Title'
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
      <form id="recipe" action="" className='hidden' />
      <Title form='recipe' className='flex-shrink'/>
      <div>
        <h2 className='text-2xl'>Ingredients</h2>
        <IngredientsTable data={fakeData}/>

      </div>

      <div>
        <h2 className='text-2xl'>Process</h2>
        a list, with always an addition possible
      </div>

      <div>
        <h2 className='text-2xl'>Tasting Notes / Description</h2>
        large text field
      </div>


      <button type="submit" onClick={event => event.preventDefault()}>Add Recipe</button>
    </>
 
  )
}

export default Builder