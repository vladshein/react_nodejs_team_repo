import style from './SignUpForm.module.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useId } from 'react';
import { Toaster } from 'react-hot-toast';

const SignUpForm = ({ submitSignUp }) => {
  const handleSubmit = (values, actions) => {
    actions.reset;
    console.log(values);
    submitSignUp(values);
  };

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
            Send
          </button>
          <Toaster />
        </Form>
      </Formik>
    </div>
  );
};

export default SignUpForm;
