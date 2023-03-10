import { Table, ScrollArea } from '@mantine/core'
import { useListState } from '@mantine/hooks'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { PropTypes } from 'prop-types'

// edited from https://ui.mantine.dev/category/dnd

const IngredientsTable = ({ data }) => {
  const [state, handlers] = useListState(data)

  const items = state.map((item, index) => (
    <Draggable key={item.id} index={index} draggableId={item.id}>
      {(provided) => (
        <tr ref={provided.innerRef} {...provided.draggableProps}>
          <td>
            <div {...provided.dragHandleProps}>
              X
            </div>
          </td>
          <td >{item.name}</td>
          <td >{item.altName}</td>
          <td >{item.latinName}</td>
          <td >{item.description}</td>
          <td >{item.tags}</td>
          <td >{item.warnings}</td>
          <td>{item.amount}</td>
          <td>Rmv / Edit</td>
        </tr>
      )}
    </Draggable>
  ))

  return (
    <ScrollArea>
      <DragDropContext
        onDragEnd={({ destination, source }) =>
          handlers.reorder({ from: source.index, to: destination?.index || 0 })
        }
      >
        <Table className='table-fixed'>
          <thead>
            <tr>
              <th  />
              <th >Name</th>
              <th>Alt.</th>
              <th>Latin</th>
              <th >Description</th>
              <th>Tags</th>
              <th>Warnings</th>
              <th >Amount (g)</th>
              <th />
            </tr>
          </thead>
          <Droppable droppableId="dnd-list" direction="vertical">
            {(provided) => (
              <tbody {...provided.droppableProps} ref={provided.innerRef}>
                {items}
                {provided.placeholder}
              </tbody>
            )}
          </Droppable>
          <tbody>
            <tr className='text-center'>
              <td colSpan='9'>Add</td>
            </tr>
          </tbody>
        </Table>
      </DragDropContext>
    </ScrollArea>
  )
}

IngredientsTable.propTypes = {
  data: PropTypes.array.isRequired,
}

export default IngredientsTable