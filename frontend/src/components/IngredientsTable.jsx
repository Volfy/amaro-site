import { PropTypes } from 'prop-types'


{/* data structure
th>
<th >Name</th>
<th>Alt.</th>
<th>Latin</th>
<th >Description</th>
<th>Tags</th>
<th>Warnings</th>
<th >Amount (g)</th>
<th /> 
*/}

const IngredientsTable = ({ data }) => {
  
  return (
    <div>
      Todo: Use dndkit to build a table
    </div>
  )
}

IngredientsTable.propTypes = {
  data: PropTypes.array.isRequired,
}

export default IngredientsTable