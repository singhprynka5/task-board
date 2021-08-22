import { useState } from "react";
import { useDispatch } from "react-redux";
import { ListGroup, CloseButton } from "react-bootstrap";
import CardItem from "./CardItem";
import AddCardForm from "./AddCardForm";

import { deleteList, dragAndDrop } from "../store/actions";

const ListItem = (props) => {
  const [addCardForm, toggleAddCardForm] = useState(false);
  const dispatch = useDispatch();

  const removeList = () => {
    const { id } = props.list;
    dispatch(deleteList(id));
  }

  const handleDragEnter = (event) => {
    event.preventDefault();
    return true;
  };

  const handleDrop = (event, listId) => {
    let srcListId = event.dataTransfer.getData("listId");
    let cardIndex = event.dataTransfer.getData("cardIndex");

    let destinationListId = listId;
    if (destinationListId) {
      dispatch(
        dragAndDrop(
          srcListId,
          destinationListId,
          cardIndex
        )
      );
    }
  };

  const { title, cards, id } = props.list;
  return (
    <ListGroup
      onDragEnter={(e) => handleDragEnter(e)}
      onDrop={(e) => handleDrop(e, id)}
      onDragOver={(e) => e.preventDefault(e)}
    >
      <ListGroup.Item>{title} <CloseButton onClick={removeList} /></ListGroup.Item>
      {cards && Array.isArray(cards) && cards.length > 0 ?
        <ListGroup.Item className="card-container">
          {cards.map((card, i) => <CardItem card={card} key={`${card.id}${i}`}
            listId={id}
            index={i}
          />)}
        </ListGroup.Item>
        : null}
      {addCardForm ? <AddCardForm toggleAddCardForm={toggleAddCardForm} listId={id} /> :
        <ListGroup.Item className="add-card-btn"
          onClick={() => toggleAddCardForm(true)}>
          <i className="fas fa-plus-circle"></i>
        </ListGroup.Item>}

    </ListGroup>
  )
}

export default ListItem;