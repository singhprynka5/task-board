import { useState } from "react";
import { useSelector } from "react-redux";

import AddListForm from "./AddListForm";
import ListItem from "./ListItem";

const Board = () => {
  const [addList, toggleAddList] = useState(false);
  const listReducer = useSelector(state => state.listReducer);

  return (
    <div className="board">
      <div className="add-list">
        {addList ? <AddListForm toggleAddList={toggleAddList} /> : <div
          className="add-list-btn"
          onClick={() => toggleAddList(true)}
        >
          ADD LIST
        </div>}

      </div>
      {listReducer && listReducer.list && Array.isArray(listReducer.list) && listReducer.list.length > 0 ?
        <div className="list-items">
          {listReducer.list.map((list, i) => {
            return <ListItem key={`${list.id}${i}`} list={list} />
          })}
        </div>
        : null}
    </div>
  )
}

export default Board;