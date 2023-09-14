import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from '../components/Form/Form';
import Header from '../components/Header';
import Table from '../components/Table';
import {
  addExpensesWithCurrentCurrencieThunk,
  alreadyEditedAction,
  deleteExpenseAction,
  fethCurrenciesThunk,
  requestEditFormAction,
} from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      category: 'Alimentacao',
      currencyState: 'USD',
      description: '',
      method: 'Dinheiro',
      value: '',
    };
  }

  // O que será feito antes da página ser renderizada
  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  cleanForm = () => {
    this.setState({
      value: '',
      description: '',
      currencyState: 'USD',
      method: 'Dinheiro',
      category: 'Alimentacao',
    });
  };

  handleClickAddExpense = () => {
    const { value, description, currencyState, method, category } = this.state;
    const { expenses, saveExpenses } = this.props;
    const objectExpense = {
      id: expenses.length,
      value,
      description,
      currency: currencyState,
      method,
      tag: category,
    };
    saveExpenses(objectExpense);
    this.cleanForm();
  };

  handleClickEditExpense = () => {
    const { currentForm, alreadyEdited, expenses } = this.props;
    const { value, description, currencyState, method, category } = this.state;
    const objectExpense = {
      id: currentForm.id,
      value,
      description,
      currency: currencyState,
      method,
      tag: category,
      exchangeRates: currentForm.exchangeRates,
    };
    const editedExpenses = [...expenses];
    editedExpenses.splice(currentForm.id, 1, objectExpense);
    alreadyEdited(editedExpenses);
    this.cleanForm();
  };

  requestEditExpense = (expense) => {
    const { requestEdit } = this.props;
    requestEdit(expense);

    this.setState({
      value: expense.value,
      description: expense.description,
      currencyState: expense.currency,
      method: expense.method,
      category: expense.tag,
    });
  }

  render() {
    const { isEditing, currencies, deleteExpense } = this.props;
    return (
      <>
        <Header />
        <Form
          currencies={ currencies }
          isEditing={ isEditing }
          { ...this.state }
          handleChange={ this.handleChange }
          handleClickAddExpense={ this.handleClickAddExpense }
          handleClickEditExpense={ this.handleClickEditExpense }
        />
        <Table editExpense={ this.requestEditExpense } deleteExpense={ deleteExpense } />
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => {
    dispatch(fethCurrenciesThunk());
  },
  saveExpenses: (expense) => {
    dispatch(addExpensesWithCurrentCurrencieThunk(expense));
  },
  alreadyEdited: (newExpenses) => {
    dispatch(alreadyEditedAction(newExpenses));
  },
  requestEdit: (expense) => {
    dispatch(requestEditFormAction(expense));
  },
  deleteExpense: (id) => {
    dispatch(deleteExpenseAction(id));
  },
});

const mapStateToProps = ({ wallet }) => ({
  isEditing: wallet.requestEdit,
  currencies: wallet.currencies,
  expenses: wallet.expenses,
  currentForm: wallet.currentFormEdit,
});

Wallet.propTypes = {
  isEditing: PropTypes.bool,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
