import style from './SignUpForm.module.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useId, useState } from 'react';
import IconEye from '../../common/icons/IconEye';
import IconEyeOff from '../../common/icons/IconEyeOff';

const SignUpForm = ({ submitSignUp, setView }) => {
  const handleSubmit = (values) => {
    submitSignUp(values);
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

  return (
    <div className={style.formContainer}>
      <h3 className={style.formHead}>Sign Up</h3>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        className={style.form}
        // validationSchema={FeedbackSchema}
      >
        <Form className={style.feedbackFormItem}>
          <div>
            <Field
              type="text"
              name="name"
              id={nameFieldId}
              placeholder="Name*"
              className={style.formField}
            />
            <ErrorMessage name="name" />
          </div>
          <div>
            <Field
              type="email"
              name="email"
              id={emailFieldId}
              placeholder="Email*"
              className={style.formField}
            />
            <ErrorMessage name="email" />
          </div>
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
          <button className={style.formBtn} type="submit">
            Send
          </button>
          <p>
            Already have an account? <button onClick={() => setView('signIn')}>Sign In</button>
          </p>
        </Form>
      </Formik>
    </div>
  );
};

export default SignUpForm;
