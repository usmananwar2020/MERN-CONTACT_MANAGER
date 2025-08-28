import React, { useEffect, useState } from 'react'
import { ErrorMessage, Form, Formik } from 'formik';
import * as Yup from "yup";
import { handleToastMessage } from '../../shared/toastify';
import { backendCall } from '../../shared/backendServices';
import { useNavigate, useParams } from 'react-router-dom';
import { GetStorage } from '../../shared/guards/credentialsService';


const _initialValues = {
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    address: "",
    note: "",
    category: "",
  };

const AddUpdateContact = () => {
     const navigate = useNavigate()
     const { id } = useParams();
     const [initialValues, setInitialValues] = useState(_initialValues);
     const [categories, setcategories] = useState([]);



      const FormSchema = Yup.object().shape({
        firstname: Yup.string().required("Firstname is required").label("Firstname"),
        lastname: Yup.string().required("Lastname is required").label("Lastname"),
        email: Yup.string().email("Enter a valid email").required("Email is required").label("Email"),
        phone: Yup.string().required("Phone is required").label("Phone"),
        address: Yup.string().required("Address is required").label("Address"),
        note: Yup.string().required("Note is required").label("Note"),
        category: Yup.string().required("Category is required").label("Category")
      });

        const handleSubmit = async(values) => {
            const storage = await GetStorage();
            const data = {
                ...values,
                userId: storage?._id
            }
            backendCall({
                url: id ? `contacts/${id}` : `contacts`,
                method: id ? 'PUT' : 'POST',
                data: data,
            }).then((res) => {
            console.log("res ==", res)
                if(!res?.error){
                    handleToastMessage  ('success', res?.message);
                    navigate('/contacts');
                }else{
                    handleToastMessage('error', res?.message)
                }
            })
        }

        useEffect(()=>{
            if(id){
                getContactDetail();
            }
            getCategories();
        },[])

        const getContactDetail = async () => {
            backendCall({
                url: `contacts/${id}`,
                method: 'GET',
            }).then((res) => {
                if (res && !res.error) {
                    const data = res.data[0];
                    setInitialValues({
                        firstname: data.firstname,
                        lastname: data.lastname,
                        email: data.email,
                        phone: data.phone,
                        address: data.address,
                        note: data.note,
                        category: data.category
                    })
                }else{
                    handleToastMessage('error', 'Something went wrong.')
                }
            });
        }
         const getCategories = (search) => {
            backendCall({
              url: `categories`,
              method: 'GET',
            }).then((res) => {
                if (res && !res.error) {
                  setcategories(res.data)
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
                        {console.log("value == ", values, categories)}
                            <div className='m-8 p-14 min-h-[75vh] rounded-large flex flex-col justify-between gap-5 bg-primary-light'>
                                <div className='flex flex-col gap-3'>
                                        <div className='flex flex-col w-full'>
                                        <p className='text-left'>Select Category<span className='text-red'>*</span></p>
                                            <select id="category" value={values.category} onChange={handleChange} >
                                                {/* Placeholder option */}
                                                <option value="" disabled>
                                                    Select the category
                                                </option>

                                                {/* Category options */}
                                                {categories.map((cate, index) => (
                                                    <option key={index} value={cate.category}>
                                                    {cate.category}
                                                    </option>
                                                ))}
                                            </select>
                                            <ErrorMessage
                                                name="category"
                                                component="span"
                                                className="text-sm text-red text-left"
                                            />
                                        </div>
                                    <div className='flex justify-center gap-3'>
                                        <div className='flex flex-col w-full'>
                                            <p className='text-left'>Firstname<span className='text-red'>*</span></p>
                                            <input
                                                name="firstname"
                                                className='border px-2'
                                                type={'text'}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.firstname}
                                                error={errors.firstname}
                                                touched={errors.firstname}
                                            />
                                            <ErrorMessage
                                                name="firstname"
                                                component="span"
                                                className="text-sm text-red text-left"
                                            />
                                        </div>
                                        <div className='flex flex-col w-full'>
                                            <p className='text-left'>Lastname<span className='text-red'>*</span></p>
                                            <input
                                                name="lastname"
                                                className='border px-2'
                                                type={'text'}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.lastname}
                                                error={errors.lastname}
                                                touched={errors.lastname}
                                            />
                                            <ErrorMessage
                                                name="lastname"
                                                component="span"
                                                className="text-sm text-red text-left"
                                            />
                                        </div>
                                    </div>

                                    <div className='flex justify-center gap-3'>
                                        <div className='flex flex-col w-full'>
                                            <p className='text-left'>Eamil<span className='text-red'>*</span></p>
                                            <input
                                                name="email"
                                                className='border px-2'
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
                                            <p className='text-left'>Phone Number<span className='text-red'>*</span></p>
                                            <input
                                                name="phone"
                                                className='border px-2'
                                                type={'text'}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.phone}
                                                error={errors.phone}
                                                touched={errors.phone}
                                            />
                                            <ErrorMessage
                                                name="phone"
                                                component="span"
                                                className="text-sm text-red text-left"
                                            />
                                        </div>
                                    </div>

                                    <div className='flex justify-center gap-3'>
                                        <div className='flex flex-col w-full'>
                                            <p className='text-left'>Address<span className='text-red'>*</span></p>
                                            <input
                                                name="address"
                                                className='border px-2'
                                                type={'text'}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.address}
                                                error={errors.address}
                                                touched={errors.address}
                                            />
                                            <ErrorMessage
                                                name="address"
                                                component="span"
                                                className="text-sm text-red text-left"
                                            />
                                        </div>
                                        <div className='flex flex-col w-full'>
                                            <p className='text-left'>Note<span className='text-red'>*</span></p>
                                            <textarea
                                                name="note"
                                                className='border px-2'
                                                type={'text'}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.note}
                                                error={errors.note}
                                                touched={errors.note}
                                            />
                                            <ErrorMessage
                                                name="note"
                                                component="span"
                                                className="text-sm text-red text-left"
                                            />
                                        </div>
                                    </div>

                                </div>
                                <div className='flex justify-between'>
                                    <button type="button" className="!font-bold uppercase border bg-primary-light text-primary-dark w-24 rounded-lg text-sm14 p-2" onClick={() => navigate('/contacts')}>
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

export default AddUpdateContact