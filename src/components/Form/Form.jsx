import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Form extends React.Component {
  render() {
    const {
      category,
      currencies,
      currencyState,
      description,
      handleChange,
      handleClickAddExpense,
      handleClickEditExpense,
      isEditing,
      method,
      value,
    } = this.props;

    return (
      // Formulário para adição de uma despesa
      <form>
        <label htmlFor="valueInput">
          Valor:
          <input
            data-testid="value-input"
            id="valueInput"
            name="value"
            onChange={ handleChange }
            type="number"
            value={ value }
          />
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            data-testid="description-input"
            id="description"
            name="description"
            onChange={ handleChange }
            type="text"
            value={ description }
          />
        </label>
        <label htmlFor="coin">
          Moeda:
          <select
            data-testid="currency-input"
            id="coin"
            name="currencyState"
            onChange={ handleChange }
            value={ currencyState }
          >
            {currencies.map((currency) => (
              <option key={ currency }>{currency}</option>
            ))}
          </select>
        </label>
        <label htmlFor="method">
          Método:
          <select
            data-testid="method-input"
            id="method"
            name="method"
            onChange={ handleChange }
            value={ method }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="category">
          Categoria
          <select
            data-testid="tag-input"
            id="category"
            name="category"
            onChange={ handleChange }
            value={ category }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        <button
          type="button"
          onClick={
            isEditing ? handleClickEditExpense : handleClickAddExpense
          }
        >
          {!isEditing ? 'Adicionar despesa' : 'Editar despesa'}
        </button>
      </form>
    );
  }
}

Form.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.any),
  expenses: PropTypes.arrayOf(PropTypes.any),
  getCurrencies: PropTypes.func,
}.isRequired;

export default connect()(Form);
