import style from '../SignInForm/SignInForm.module.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useId, useState } from 'react';
import * as Yup from 'yup';
import IconEye from '../../common/icons/IconEye';
import IconEyeOff from '../../common/icons/IconEyeOff';

const SignUpForm = ({ submitSignUp, setView }) => {
  const handleSubmit = (data, actions) => {
    actions.setSubmitting(false);
    submitSignUp(data, actions);
  };

  const [showPassword, setShowPassword] = useState(false);

  const nameFieldId = useId();
  const emailFieldId = useId();
  const passwordFieldId = useId();

  const initialValues = {
    name: '',
    email: '',
    password: '',
  };

  const SignInSchema = Yup.object().shape({
    name: Yup.string().required('Required').min(2, 'Name must be at least 2 characters'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required').min(8, 'Password must be at least 8 characters'),
  });

  return (
    <div className={style.formContainer}>
      <h3 className={style.formHead}>SIGN UP</h3>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        className={style.form}
        validationSchema={SignInSchema}>
        {({ isValid, dirty, isSubmitting }) => (
          <Form className={style.form}>
            <div className={style.formFieldsContainer}>
              <div className={style.fieldWrapper}>
                <Field
                  type="text"
                  name="name"
                  id={nameFieldId}
                  placeholder="Name*"
                  className={style.formField}
                />
                <ErrorMessage name="name" component="span" className={style.errorText} />
              </div>
              <div className={style.fieldWrapper}>
                <Field
                  type="email"
                  name="email"
                  id={emailFieldId}
                  placeholder="Email*"
                  className={style.formField}
                />
                <ErrorMessage name="email" component="span" className={style.errorText} />
              </div>
              <div className={style.fieldWrapper}>
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
                </div>
                <ErrorMessage name="password" component="span" className={style.errorText} />
              </div>
            </div>

            <button disabled={!isValid || !dirty} className={style.formBtn} type="submit">
              {isSubmitting ? 'Creating...' : 'CREATE'}
            </button>
            <p className={style.createAccount}>
              I already have an account?{' '}
              <button
                type="button"
                className={style.createAccountLink}
                onClick={(e) => {
                  e.preventDefault();
                  setView('signIn');
                }}>
                Sign In
              </button>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUpForm;
