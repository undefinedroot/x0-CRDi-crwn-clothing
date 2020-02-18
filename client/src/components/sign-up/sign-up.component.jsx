import React, { useState } from 'react';
import './sign-up.styles.scss';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

// import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';
import { connect } from 'react-redux';
import { signUpStart } from '../../redux/user/user.actions';

const SignUp = ({ signUpStart }) => {
  const [userCredentials, setUserCredentials] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // constructor() {
  //   super();
  //   this.state = {
  //     displayName: '',
  //     email: '',
  //     password: '',
  //     confirmPassword: ''
  //   };
  // }

  const { displayName, email, password, confirmPassword } = userCredentials;

  const handleSubmit = async event => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert(`passwords don't match`);
      return;
    }

    signUpStart({ displayName, email, password });

    //#region old code
    //try {

    // // important to destructure at second argument so that you avoid storing this as an array.
    // // this method is provided by firebase.
    // const { user } = await auth.createUserWithEmailAndPassword(
    //   email,
    //   password
    // );

    // // use our own method to create a new record on database
    // await createUserProfileDocument(user, { displayName });

    // clear form
    //   this.setState({
    //     displayName: '',
    //     email: '',
    //     password: '',
    //     confirmPassword: ''
    //   });
    // } catch (error) {
    //   console.log(error);
    // }
    //#endregion old code
  };

  const handleChange = event => {
    const { name, value } = event.target;
    // this.setState({ [name]: value });
    setUserCredentials({ ...userCredentials, [name]: value });
  };

  // NOTE: you should enable Authentication in Firebase using Email/Password

  // const { displayName, email, password, confirmPassword } = this.state;
  return (
    <div className="sign-up">
      <h2 className="title">I do not have an account</h2>
      <span>Sign up with your email and password</span>
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <FormInput
          type="text"
          name="displayName"
          value={displayName}
          onChange={handleChange}
          label="Display Name"
          required
        />
        <FormInput
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          label="Email"
          required
        />
        <FormInput
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          label="Password"
          required
        />
        <FormInput
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
          label="Confirm Password"
          required
        />
        <CustomButton type="submit">SIGN UP</CustomButton>
      </form>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  signUpStart: userCredentials => dispatch(signUpStart(userCredentials))
});

export default connect(
  null,
  mapDispatchToProps
)(SignUp);
