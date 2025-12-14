import style from './SignInForm.module.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useId } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const SignInForm = ({ submitSignIn }) => {
  const handleSubmit = (data, actions) => {
    actions.reset;
    submitSignIn(data);
    toast.success(`Successfully signed in!`);
  };

  const emailFieldId = useId();
  const passwordFieldId = useId();

  const initialValues = {
    email: '',
    password: '',
  };

  return (
    <div className={style.formContainer}>
      <h3 className={style.formHead}>Sign In</h3>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        className={style.form}
        // validationSchema={FeedbackSchema}
      >
        <Form className={style.feedbackFormItem}>
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
          <div>
            <Field
              type="password"
              name="password"
              id={passwordFieldId}
              placeholder="Password*"
              className={style.formField}
            />
            <ErrorMessage name="password" />
          </div>
          <button className={style.formBtn} type="submit">
            SIGN IN
          </button>
          <Toaster />
        </Form>
      </Formik>
    </div>
  );
};

export default SignInForm;
