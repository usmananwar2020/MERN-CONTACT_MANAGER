import React, { useEffect, useState } from 'react'
import { ErrorMessage, Form, Formik } from 'formik';
import * as Yup from "yup";
import { handleToastMessage } from '../../shared/toastify';
import { backendCall } from '../../shared/backendServices';
import { useNavigate, useParams } from 'react-router-dom';


const _initialValues = {
    category: "",
  };

const AddUpdateCategory = () => {
     const navigate = useNavigate()
     const { id } = useParams();
     const [initialValues, setInitialValues] = useState(_initialValues);



      const FormSchema = Yup.object().shape({
        category: Yup.string().required("Category is required").label("Category"),
      });

        const handleSubmit = async(values) => {
           
            backendCall({
                url: id ? `categories/${id}` : `categories`,
                method: id ? 'PUT' : 'POST',
                data: values,
            }).then((res) => {
            console.log("res ==", res)
                if(!res?.error){
                    handleToastMessage  ('success', res?.message);
                    navigate('/categories');
                }else{
                    handleToastMessage('error', res?.message)
                }
            })
        }

        useEffect(()=>{
            if(id){
                getContactDetail();
            }
        },[])

        const getContactDetail = async () => {
            backendCall({
                url: `categories/${id}`,
                method: 'GET',
            }).then((res) => {
                if (res && !res.error) {
                    const data = res.data[0];
                    setInitialValues({
                        category: data.category,
                    })
                }else{
                    handleToastMessage('error', 'Something went wrong.')
                }
            });
        }
  return (
    <div>
        <Formik
            initialValues={initialValues}
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
                    <Form >
                            <div className='m-8 p-14 min-h-[75vh] rounded-large flex flex-col justify-between gap-5 bg-primary-light'>
                                <div className='flex flex-col gap-3'>
                                    <div className='flex justify-center gap-3'>
                                        <div className='flex flex-col w-full gap-2'>
                                            <p className='text-left text-primary-dark'>Add Category<span className='text-red'>*</span></p>
                                            <input
                                                name="category"
                                                className='border px-2'
                                                type={'text'}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.category}
                                                error={errors.category}
                                                touched={errors.category}
                                            />
                                            <ErrorMessage
                                                name="category"
                                                component="span"
                                                className="text-sm text-red text-left"
                                            />
                                        </div>
                                    </div>

                                </div>
                                <div className='flex justify-between'>
                                    <button type="button" className="!font-bold uppercase border bg-primary-light text-primary-dark w-24 rounded-lg text-sm14 p-2" onClick={() => navigate('/categories')}>
                                        back
                                    </button>
                                    <button type="submit" className="!font-bold uppercase border bg-primary-light text-primary-dark w-24 rounded-lg text-sm14 p-2">
                                        {id ? 'update' : 'create'}
                                    </button>
                                
                                </div>
                        </div>
                    </Form>
            )}
        </Formik>
    </div>
  )
}

export default AddUpdateCategory