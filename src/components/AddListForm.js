import { useState } from "react";
import { CloseButton } from "react-bootstrap";
import { useDispatch } from "react-redux";

import { addList } from "../store/actions";

const AddListForm = (props) => {
  const { toggleAddList } = props;

  const [title, setTitle] = useState("");
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  const createList = () => {
    if(!title) {
      setError("Please provide a valid title.")
    } else {
      setError(false);
      dispatch(addList(title));
      setTitle("");
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
            <input required="" placeholder="Enter List Title..." autoComplete="off"
              onChange={(e)=>handleChange(e)} value={title}
              type="text" id="validationCustom02" className="form-control outline-none" />
            {error ? <div className="invalid-feedback">{error}</div>: null}
          </div>
        </div>
      <button type="submit" className="btn btn-outline-dark outline-none submit-list"
        onClick={createList}
      >Add List</button><CloseButton onClick={()=> toggleAddList(false)} />
    </div>
  );
}

export default AddListForm;