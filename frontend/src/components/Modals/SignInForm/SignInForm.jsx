import style from './SignInForm.module.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useId, useState } from 'react';
import * as Yup from 'yup';
import IconEye from '../../common/icons/IconEye';
import IconEyeOff from '../../common/icons/IconEyeOff';

const SignInForm = ({ submitSignIn, setView }) => {
  const handleSubmit = (data, actions) => {
    console.log(data);

    submitSignIn(data, actions);
  };

  const [showPassword, setShowPassword] = useState(false);

  const emailFieldId = useId();
  const passwordFieldId = useId();

  const initialValues = {
    email: '',
    password: '',
  };

  const SignInSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required'),
  });

  return (
    <div className={style.formContainer}>
      <h3 className={style.formHead}>SIGN IN</h3>
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={SignInSchema}>
        {({ isValid, dirty, isSubmitting }) => (
          <Form className={style.form}>
            <div className={style.formFieldsContainer}>
              <Field
                type="email"
                name="email"
                id={emailFieldId}
                placeholder="Email*"
                className={style.formField}
              />
              <div className={style.passwordFieldContainer}>
                <Field
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  id={passwordFieldId}
                  placeholder="Password*"
                  className={style.formField}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={style.eyeBtn}>
                  {showPassword ? <IconEye /> : <IconEyeOff />}
                </button>
                {/* <ErrorMessage name="password" /> */}
              </div>
            </div>
            <button
              disabled={!isValid || !dirty || isSubmitting}
              className={style.formBtn}
              type="submit">
              {isSubmitting ? 'Signing In...' : 'SIGN IN'}
            </button>
            <p className={style.createAccount}>
              Don't have an account?
              <button
                type="button"
                className={style.createAccountLink}
                onClick={(e) => {
                  e.preventDefault();
                  setView('signUp');
                }}>
                Create an account
              </button>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignInForm;
