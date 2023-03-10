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
    <li ref={setNodeRef} style={style} >
      <div className='inline' {...attributes} {...listeners}>{props.dragHandle}</div>
      &nbsp;
      {props.children}
    </li>
  ) 
}
DraggableListItem.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]).isRequired,
  dragHandle: PropTypes.any.isRequired,
}

export default DraggableListItem