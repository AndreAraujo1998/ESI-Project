import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Header.css';

class Header extends React.Component {
  sumExpense = () => {
    const initialValue = 0;
    const { expenses } = this.props;
    const sum = expenses.reduce((acc, current) => {
      const currentValue = Number(current.value);
      const currentCurrency = current.currency;
      const currencyValue = Number(current.exchangeRates[currentCurrency].ask);
      const valueItem = currentValue * currencyValue;
      acc += valueItem;
      return acc;
    }, initialValue);
    return sum;
  }

  render() {
    const { email } = this.props;
    this.sumExpense();
    return (
      <div className="header--all">
        <div className="header--logo">
          Trybe
        </div>
        <section className="header--info">
          <div className="header--email" data-testid="email-field">
            {`Email: ${email}`}
          </div>
          <div className="header--despesa" data-testid="total-field">
            {`Despesa Total: R$ ${this.sumExpense().toFixed(2)}`}
          </div>
          <div className="header--moeda" data-testid="header-currency-field">BRL</div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps)(Header);
