import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE} from '../constants/actionTypes';

const dealsReducer = (deals = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;    
    case CREATE:
      return [...deals, action.payload];
    case UPDATE:
      return deals.map((post) => (post._id === action.payload._id ? action.payload : post));
    case DELETE:
      return deals.filter((post) => post._id !== action.payload);
    default:
      return deals;
  }
};

const sensorsContentReducer = (sensorsContent = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;    
   
    default:
      return sensorsContent;
  }
};
export default sensorsContentReducer;