import { useState } from "react";
import { CloseButton } from "react-bootstrap";
import { useDispatch } from "react-redux";

import { addCard } from "../store/actions";

const AddCardForm = (props) => {
  const { toggleAddCardForm } = props;

  const [title, setTitle] = useState("");
  const [desc, setDescription] = useState("");
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  const createList = () => {
    if (!title) {
      setError("Please provide a valid title.")
    } else {
      setError(false);
      dispatch(addCard(title, desc, props.listId));
      setTitle("");
      setDescription("");
    }
  };

  const handleChange = (e) => {
    setError(false);
    setTitle(e.target.value);
  }

  return (
    <div className="list-form">
      <div className="mb-3 row">
        <div>
          <input required="" placeholder="Enter Card Title..." autoComplete="off"
            onChange={(e) => handleChange(e)} value={title}
            type="text" id="validationCustom02" className="form-control outline-none" />
          {error ? <div className="invalid-feedback">{error}</div> : null}
        </div>
      </div>
      <div className="mb-3">
        <textarea placeholder="Enter description" value={desc} rows="3"
          onChange={(e) => setDescription(e.target.value)}
          id="exampleForm.ControlTextarea1" className="form-control outline-none"></textarea>
      </div>
      <button type="submit" className="btn btn-outline-dark outline-none submit-list"
        onClick={createList}
      >Add Card</button><CloseButton onClick={() => toggleAddCardForm(false)} />
    </div>
  );
}

export default AddCardForm;