const ALREADY_EDITED = 'ALREADY_EDITED';
const DELET_EXPENSE = 'DELET_EXPENSE';
const ERROR_GET_CURRENCIES = 'ERROR_GET_CURRENCIES';
const GET_CURRENCIES = 'GET_CURRENCIES';
const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
const REQUEST_EDIT_FORM = 'REQUEST_EDIT_FORM';
const SAVED_EMAIL = 'SAVED_EMAIL';
const SAVED_EXPENSE = 'SAVED_EXPENSE';

// Action é o objeto javascript que contém a alteração que será inserida no objeto
// Quando um componente quer atualizar um componente, ele vai enviar uma action
export const savedEmailAction = (email) => ({
  type: SAVED_EMAIL,
  payload: email,
});

export const requestCurrenciesAction = () => ({ type: REQUEST_CURRENCIES });

export const getCurrenciesAction = (currencies) => ({
  type: GET_CURRENCIES,
  payload: currencies,
});

export const errorGetCurrenciesAction = (message) => ({
  type: ERROR_GET_CURRENCIES,
  payload: message,
});

export const saveExpensesAction = (expense) => ({
  type: SAVED_EXPENSE,
  payload: expense,
});

export const deleteExpenseAction = (id) => ({
  type: DELET_EXPENSE,
  payload: id,
});

export const requestEditFormAction = (expense) => ({
  type: REQUEST_EDIT_FORM,
  payload: expense,
});

export const alreadyEditedAction = (newExpenses) => ({
  type: ALREADY_EDITED,
  payload: newExpenses,
});

const fetchCurrencies = async () => {
  const url = 'https://economia.awesomeapi.com.br/json/all';
  const response = await fetch(url);
  const data = await response.json();
  delete data.USDT;
  return data;
};

export const fethCurrenciesThunk = () => async (dispatch) => {
  dispatch(requestCurrenciesAction());
  try {
    const currenciesResponse = await fetchCurrencies();
    const currencies = Object.keys(currenciesResponse);
    dispatch(getCurrenciesAction(currencies));
  } catch (err) {
    return dispatch(errorGetCurrenciesAction(err));
  }
};

export const addExpensesWithCurrentCurrencieThunk = (expenses) => async (dispatch) => {
  const currencies = await fetchCurrencies();
  expenses.exchangeRates = currencies;
  dispatch(saveExpensesAction(expenses));
};
