// Esse reducer será responsável por tratar as informações da pessoa usuária

const SAVED_EMAIL = 'SAVED_EMAIL';

const stateDefault = {
  email: '',
};

const user = (state = stateDefault, action) => {
  switch (action.type) {
  case SAVED_EMAIL:
    return { ...state, email: action.payload };
  default:
    return { ...state };
  }
};

export default user;
