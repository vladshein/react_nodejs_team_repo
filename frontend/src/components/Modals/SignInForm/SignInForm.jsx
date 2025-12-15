import style from './SignInForm.module.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useId, useState } from 'react';
import IconEye from '../../common/icons/IconEye';
import IconEyeOff from '../../common/icons/IconEyeOff';

const SignInForm = ({ submitSignIn, setView }) => {
  const handleSubmit = (data) => {
    submitSignIn(data);
  };

  const [showPassword, setShowPassword] = useState(false);

  const emailFieldId = useId();
  const passwordFieldId = useId();

  const initialValues = {
    email: '',
    password: '',
  };

  return (
    <div className={style.formContainer}>
      <h3 className={style.formHead}>SIGN IN</h3>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        className={style.form}
        // validationSchema={FeedbackSchema}
      >
        <Form className={style.form}>
          <div>
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
              <ErrorMessage name="password" />
            </div>
          </div>
          <button className={style.formBtn} type="submit">
            SIGN IN
          </button>
          <p>
            Don't have an account? <button onClick={() => setView('signUp')}>Sign Up</button>
          </p>
        </Form>
      </Formik>
    </div>
  );
};

export default SignInForm;
