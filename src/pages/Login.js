import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { savedEmailAction } from '../actions';

class Login extends React.Component {
  // Preciso estudar essa parte
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      isValid: false,
    };
  }

  // Metodo responsavel por verificar se o login está de acordo
  // com o formato valido, alguem@alguem.com, e habilitar o botao
  allowButtonLogin = () => {
    // Desestruturando o estado porque uso só o email e a senha
    const { email, password } = this.state;
    // confirm sera true se o email e a senha forem verificados
    const confirm = this.emailIsMatch(email) && this.checkPassword(password);
    // Preciso estudar essa parte
    this.setState({
      isValid: confirm,
    });
  };

  // recebe o evento e atualiza as mudancas no input
  handleChangeInput = (event) => {
    // desestruta o evento para usar somente o value e name
    const { value, name } = event.target;
    this.setState(
      {
        [name]: value,
      },
      this.allowButtonLogin,
    );
  };

  // Verifica com REGEX se o email está no formato válido
  emailIsMatch = (email) => {
    if (
      !email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)
    ) {
      return false;
    }
    return true;
  };

  // Verifica se a senha possui ao menos 6 caracteres
  checkPassword = (password) => {
    const minLengthPassword = 6;
    if (password.length >= minLengthPassword) {
      return true;
    }
    return false;
  };

  handleClick = (event, email) => {
    event.preventDefault();
    const { history } = (this.props);
    const { saveEmail } = this.props;
    saveEmail(email);
    history.push('/carteira');
  };

  render() {
    const { email, password, isValid } = this.state;
    return (
      <main className="login--main">
        <header>TrybeWallet</header>
        <div>
          <form>
            <input
              placeholder="Digite seu email"
              type="email"
              name="email"
              value={ email }
              data-testid="email-input"
              onChange={ this.handleChangeInput }
            />
            <input
              placeholder="Digite sua senha"
              type="password"
              name="password"
              data-testid="password-input"
              value={ password }
              onChange={ this.handleChangeInput }
            />
            <button
              type="button"
              disabled={ !isValid }
              onClick={ (event) => this.handleClick(event, email) }
            >
              Entrar
            </button>
          </form>
        </div>
      </main>
    );
  }
}

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  saveEmail: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  saveEmail: (email) => { dispatch(savedEmailAction(email)); },
});

export default connect(null, mapDispatchToProps)(Login);
