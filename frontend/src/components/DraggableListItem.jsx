import { PropTypes } from 'prop-types'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

const DraggableListItem = (props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({id: props.id})

  const style = {
    transform: CSS.Transform.toString(transform),
    transition, 
  }

  return (
    <li ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {props.content}
    </li>
  ) 
}
DraggableListItem.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
}

export default DraggableListItem