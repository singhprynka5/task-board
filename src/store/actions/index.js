import {
    ADD_LIST,
    ADD_CARD,
    DELETE_LIST,
    DELETE_CARD,
    DRAG_DROP
} from "./actionType";

export const addList = (title) => {
    const id = Date.now().toString(36) + Math.random().toString(36).substr(2);

    return {
        type: ADD_LIST,
        payload: { title, id }
    };
};

export const addCard = (title, desc, listId) => {
    const id = Date.now().toString(36) + Math.random().toString(36).substr(2);

    return {
        type: ADD_CARD,
        payload: { title, desc, listId, id, date: new Date() }
    };
};

export const deleteList = (id) => {
    return {
        type: DELETE_LIST,
        payload: { id }
    };
};

export const deleteCard = (listId, carId) => {
    return {
        type: DELETE_CARD,
        payload: { listId, carId }
    };
};

export const dragAndDrop = (srcListId, destinationListId, cardIndex) => {
    return {
        type: DRAG_DROP,
        payload: {
            srcListId,
            destinationListId,
            cardIndex
        }
    };
};
