import React from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth/operations';

const RegistrationForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = form.elements.name.value;
    const email = form.elements.email.value;
    const password = form.elements.password.value;
    dispatch(register({ name, email, password }));
    form.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Name" />
      <input type="email" name="email" placeholder="Email" />
      <input type="password" name="password" placeholder="Password" />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;
