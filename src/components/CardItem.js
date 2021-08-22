import { Card, CloseButton } from "react-bootstrap";
import { useDispatch } from "react-redux";

import { deleteCard } from "../store/actions";

const CardItem = (props) => {
  const { card } = props;
  const dispatch = useDispatch();

  const removeCard = (listId, carId) => {
    dispatch(deleteCard(listId, carId))
  }

  const handleDragStart = (e) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData("listId", props.listId);
    e.dataTransfer.setData("cardIndex", props.index);
    e.dataTransfer.setDragImage(e.target,0,0);

    return true;
  };

  return (
    <Card style={{ width: '18rem' }}
      draggable
      id={card.id}
      onDragStart={(e) => handleDragStart(e)}
    >
      <Card.Body>
        <CloseButton onClick={() => removeCard(props.listId, card.id)} />
        <Card.Title>{card.title}  </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{new Date(card.date).toLocaleString()}</Card.Subtitle>
        <Card.Text>
          {card.desc}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default CardItem;