import React from 'react'
import { LoginMode } from '../../shared/enum';
import { ErrorMessage, Form, Formik } from 'formik';
import * as Yup from "yup";
import { handleToastMessage } from '../../shared/toastify';
import { backendCall } from '../../shared/backendServices';
import { SetStorage } from '../../shared/guards/credentialsService';
import { useNavigate } from 'react-router-dom';

const Login = ({loginMode}) => {
  const navigate = useNavigate()
  const FormSchema = Yup.object().shape({
    email: Yup.string()
        .email("Enter a valid email")
        .required("Email is required")
        .label("Email"),
    password: Yup.string().min(4).label("Password").required(),
  });
  
  const _initialValues = {
    email: "",
    password: "",
  };
  const handleSubmit = (values) => {
    console.log("values ==", values)
    backendCall({
      url: 'users/login',
      method: 'POST',
      data: values,
    }).then((res) => {
    console.log("res ==", res)
      if(!res?.error){
        let dataSet = res.data;
          SetStorage(dataSet);
          handleToastMessage('success', res?.message);
          navigate('/contacts');
      }else{
          handleToastMessage('error', res?.message)
          setIsLoading(false);
      }
  })

  }
  return (
      <Formik
            initialValues={_initialValues}
            validationSchema={FormSchema}
            enableReinitialize={true}
            onSubmit={handleSubmit}
        >
            {({
                errors,
                handleChange,
                handleBlur,
                touched,
                values,
                setFieldValue,
            }) => (
                    <Form>
                          <div className='p-14 border-2 rounded-large flex flex-col gap-5'>
                              <div>
                                  <p className='text-primary font-semibold text-sm14'>WELCOME TO CONTACT MANAGER</p>
                                  <p className='text-primary text-sm10'>Log In to get the moment updates on the things that interest you.</p>
                              </div>
                              <div className='flex flex-col gap-3'>
                                <div className='flex flex-col w-full'>
                                    <p className='text-left'>Eamil<span className='text-red'>*</span></p>
                                    <input
                                        name="email"
                                        className='border'
                                        type={'text'}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}
                                        error={errors.email}
                                        touched={errors.email}
                                    />
                                    <ErrorMessage
                                        name="email"
                                        component="span"
                                        className="text-sm text-red text-left"
                                    />
                                </div>
                                <div className='flex flex-col w-full'>
                                    <p className='text-left'>Password<span className='text-red'>*</span></p>
                                    <input
                                        name="password"
                                        className='border'
                                        type={'password'}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.password}
                                        error={errors.password}
                                        touched={errors.password}
                                    />
                                    <ErrorMessage
                                        name="password"
                                        component="span"
                                        className="text-sm text-red text-left"
                                    />
                                </div>
                              </div>
                              <div className='flex flex-col items-center'>
                              <button type="submit" className="!font-bold uppercase border bg-primary-light w-24 rounded-lg text-sm14 p-2">
                                    LogIn
                                </button>
                                <p className='text-blue-400 cursor-pointer underline text-sm10' onClick={() => loginMode(LoginMode.signup)}>Click here for Signup</p>
                            </div>
                      </div>
                    </Form>
            )}
        </Formik>
  )
}

export default Login