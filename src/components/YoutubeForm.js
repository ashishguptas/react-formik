import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray, FastField } from 'formik';
import * as Yup from 'yup'
import TextError from './TextError';

const initialValues = {
    name: '',
    email: '',
    channel: '',
    comments: '',
    address: '',
    social:{
        facebook: '',
        twitter: ''
    },
    phoneNumbers: ['', ''],
    phNumbers: ['']
}

const savedValues = {
    name: 'Ashish',
    email: 'a@gmail.com',
    channel: 'code',
    comments: 'Hey There',
    address: 'Mumbai',
    social:{
        facebook: '',
        twitter: ''
    },
    phoneNumbers: ['', ''],
    phNumbers: ['']
}

const onSubmit = (values, onSubmitProps) => {
    console.log('visite value', values)
    console.log('submit value', onSubmitProps)
    onSubmitProps.setSubmitting(false)
    onSubmitProps.resetForm()
}

const validationSchema = Yup.object({
    name: Yup.string().required('Required!'),
    email: Yup.string().email('Invalid').required('Required'),
    channel: Yup.string().required('Required'),
    // comments: Yup.string().required('Required'),
})


const validateComment = values => {
    let error
    if(!values){
        error = 'This is Required'
    }

    return error
}

function YoutubeForm() {
    const [loadData, setLoadData] = useState(null)
    return (
        <Formik initialValues={loadData || initialValues} validationSchema={validationSchema} onSubmit={onSubmit} validateOnMount enableReinitialize>
            {formik => {
                console.log('formik', formik)
                return (
                    <Form>
                        <div className='form-control'>
                            <label htmlFor='name'>Name</label>
                            <Field type='text' id='name' name='name' />
                            <ErrorMessage name='name'  component={TextError} />
                        </div>
                        <div className='form-control'>
                            <label htmlFor='enail'>E-mail</label>
                            <Field type='text' id='email' name='email' />
                            <ErrorMessage name='email' component={TextError} />
                        </div>
        
                        <div className='form-control'>
                            <label htmlFor='channel'>Channel</label>
                            <Field type='text' id='channel' name='channel' />
                            <ErrorMessage name='channel'>
                                {errorMsg => <div className='error'>{errorMsg}</div>}
                            </ErrorMessage>
                        </div>
        
                        <div className='form-control'>
                            <label htmlFor='comments'>Comments</label>
                            <Field as='textarea' id='comments' name='comments' validate={validateComment} />
                            <ErrorMessage name='comments' component={TextError} />
                        </div>
                        
                        <div className='form-control'>
                            <label htmlFor='address'>Address</label>
                            <FastField name='address'>
                                {
                                    (props) => {
                                        console.log('Renders Props', props)
                                        const { field, form, meta } = props
                                        return (
                                            <div>
                                                    {meta.touched && meta.error ? <div>{meta.error}</div> : null}
                                                    <input type='text' id="address" {...field} />
                                                </div>
                                        )
                                    }
                                }
                            </FastField>
                        </div>
                        <div className='form-control'>
                            <label htmlFor='facebook'>Facebook Profile</label>
                            <Field type='text' id='facebook' name='social.facebook' />
                        </div>
        
                        <div className='form-control'>
                            <label htmlFor='twitter'>Twitter</label>
                            <Field type='text' id='twitter' name='social.twitter' />
                        </div>
        
                        <div className='form-control'>
                            <label htmlFor='primaryPh'>Primary Phone Number</label>
                            <Field type='text' id='primaryPh' name='phoneNumbers[0]' />
                        </div>
        
                        <div className='form-control'>
                            <label htmlFor='secondaryPh'>Secondary Phone Numbe</label>
                            <Field type='text' id='secondaryPh' name='phoneNumbers[1]' />
                        </div>
        
                        <div className='form-control'>
                            <label>List of phone number</label>
                            <FieldArray name='phNumbers'>
                                {fieldArrayProps => {
                                        // console.log('Field Array', fieldArrayProps)
                                        const { push, remove, form } = fieldArrayProps
                                        const { values } = form
                                        const { phNumbers } = values
                                        return (
                                            <div>
                                            {phNumbers.map((phNumber, index) => (
                                                    <div key={index}>
                                                        <Field name={`phNumbers[${index}]`} />
                                                        {
                                                            index > 0 && <button type='button' onClick={() => remove(index)}>-</button>
                                                        }
                                                        <button type='button' onClick={() => push('')}>+</button>
                                                    </div>
                                                ))
                                            }
                                            </div>
                                        )
                                    }
                                }
                            </FieldArray>
                        </div>
                        {/*<button type='button' onClick={() => formik.setFieldTouched('comments')}>Visit comment</button>
                        <button type='button' onClick={() => formik.setTouched({
                            name:true,
                            email:true
                        })}>Visit All</button>*/}
                        <button type='button' onClick={() => setLoadData(savedValues)}>Load saved data</button>
                        <button type='reset'>Reset</button>
                        <button type='submit' disabled={!formik.isValid || formik.isSubmitting}>Submit</button>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default YoutubeForm
