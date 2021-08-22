import { ADD_LIST, ADD_CARD, DELETE_LIST, DELETE_CARD, DRAG_DROP } from "../actions/actionType";

const initialState = {
  list: [],
};

const listReducer = (state = initialState, action) => {

  switch (action.type) {
    case ADD_LIST: {
      const { title, id } = action.payload;
      const newList = {
        title: title,
        cards: [],
        id
      };
      const newState = {
        ...state,
        list: [...state.list, newList]
      };
      return newState;
    }

    case DELETE_LIST: {
      const { id } = action.payload;
      const newList = state.list.filter(
        listItem => listItem.id !== id
      );
      const newState = {
        ...state,
        list: newList
      };
      return newState;
    }

    case ADD_CARD: {
      const { title, desc, listId, id, date } = action.payload;
      const newList = state.list.map(item => {
        if (item.id === listId) {
          return {
            ...item,
            cards: [...item.cards, { id, title, desc, date }]
          };
        } else {
          return item;
        }
      });
      const newState = {
        ...state,
        list: newList
      };
      return newState;
    }

    case DELETE_CARD: {
      const { listId, carId } = action.payload;
      let listItems = state.list.find(item => item.id === listId);
      let newCards = listItems.cards.filter(card => carId !== card.id);
      const newList = state.list.map(list => {
        if (list.id === listId) {
          return {
            ...list,
            cards: newCards
          };
        } else {
          return list;
        }
      });
      const newState = {
        ...state,
        list: newList
      };
      return newState;
    }

    case DRAG_DROP: {
      const { srcListId, destinationListId, cardIndex } = action.payload;
      let newList;
      if (srcListId === destinationListId) {
        newList = state.list;
      } else {
        const dragList = state.list.find(
          list => srcListId === list.id
        );
        const dropList = state.list.find(
          list => destinationListId === list.id
        );
        const dragListNewCards = dragList.cards;
        const dropListNewCards = dropList.cards;
        let card = dragListNewCards.splice(cardIndex, 1);
        dropListNewCards.push(...card)
        let sorted = dropListNewCards.sort((a, b) => {
          return new Date(b.date) - new Date(a.date);
        });

        newList = state.list.map(list => {
          if (list.id === dropList.id) {
            return {
              ...dropList,
              cards: sorted
            };
          }
          else if (list.id === dragList.id) {
            return {
              ...dragList,
              cards: dragListNewCards
            };
          } else {
            return list;
          }
        });
      }
      const newState = {
        ...state,
        list: newList
      };
      return newState;
    }

    default:
      return state;
  }
};

export default listReducer;
