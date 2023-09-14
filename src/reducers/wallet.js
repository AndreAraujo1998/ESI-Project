// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const GET_CURRENCIES = 'GET_CURRENCIES';
const SAVED_EXPENSE = 'SAVED_EXPENSE';
const DELET_EXPENSE = 'DELET_EXPENSE';
const REQUEST_EDIT_FORM = 'REQUEST_EDIT_FORM';
const ALREADY_EDITED = 'ALREADY_EDITED';

const stateDefault = {
  currencies: [],
  expenses: [],
  requestEdit: false,
  currentFormEdit: {},
};

const wallet = (state = stateDefault, action) => {
  switch (action.type) {
  case GET_CURRENCIES:
    return { ...state, currencies: action.payload };
  case SAVED_EXPENSE:
    return { ...state, expenses: [...state.expenses, action.payload] };
  case DELET_EXPENSE:
    return {
      ...state,
      expenses: [
        ...state.expenses.slice(0, action.payload),
        ...state.expenses.slice(action.payload + 1, state.expenses.length),
      ],
    };
  case REQUEST_EDIT_FORM:
    return { ...state, requestEdit: true, currentFormEdit: action.payload };
  case ALREADY_EDITED:
    return {
      ...state,
      expenses: action.payload,
      requestEdit: false,
      currentFormEdit: {},
    };
  default:
    return { ...state };
  }
};

export default wallet;
