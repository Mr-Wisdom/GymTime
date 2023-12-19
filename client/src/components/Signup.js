import { useState } from 'react';
import {  Button , FormControl, Input, InputLabel, TextField } from '@mui/material';
import Box from '@mui/system/Box';
import { useFormik } from 'formik'
import * as yup from 'yup'

function Signup ({setUser}) {



    const [signup, setSignup] = useState(true)

    const signupSchema = yup.object().shape({
        username: yup.string()
        .min(3, 'Too Short!')
        .max(30, 'Too Long!'),
        // .required(' A username is required!'),
        email: yup.string()
        .email('Invalid Email'),
        // .required('All users must have an email.'),
        password: yup.string()
        .min(2, 'Too Short!')
        .max(30, 'Too Long!'),
        passwordConfirmation: yup.string().oneOf([yup.ref('password')], 'Passwords do not match')
    })
    const loginSchema = yup.object().shape({
        username: yup.string().required('username is required'),
        password: yup.string().required('password required')
    })

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            passwordConfirmation: ''
        },
        
        validationSchema: signup ? signupSchema : loginSchema,
        onSubmit: (values) => {
            const endpoint = signup ? '/users' : '/login'
            fetch(endpoint, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(values)
            }).then((resp) => {
                if (resp.ok) {
                    resp.json().then(({user}) => {
                        setUser(user)
                        //navigate into site here
                    })
                } else {
                    console.log('error handling to be made')
                }
            })
        }
    })

    function toggleSignup() {
        setSignup((currentSignup) => !currentSignup)
    }

    return (
        <Box>
            {/* {Object.keys(formik.errors).map((key) => <li>{formik.errors[key]}</li> )} */}
            <Button onClick = {toggleSignup}>{signup ? 'Login' : 'Create a new account'}</Button>
            <form onSubmit={formik.handleSubmit}>
               <TextField 
                   id="username" 
                   label="Username" 
                   variant="outlined" 
                   error = {!!formik.errors.username}
                   helperText={formik.errors.username}
                   required
                   value = {formik.values.username}
                   onChange = {formik.handleChange}
               />
               {signup &&<TextField 
                    id="email" 
                    variant="outlined"
                    label = "Email"
                    error = {!!formik.errors.email} 
                    helperText={formik.errors.email}
                    required
                    value = {formik.values.email}
                    onChange = {formik.handleChange}
                />}
                <TextField 
                    id="password" 
                    variant="outlined"
                    label = 'Password'
                    error = {!!formik.errors.password}
                    helperText={formik.errors.password}
                    type = 'password'
                    required
                    value = {formik.values.password}
                    onChange = {formik.handleChange}
                />
                {signup &&<TextField 
                    id="passwordConfirmation" 
                    variant="outlined"
                    label = 'passwordConfirmation'
                    error = {!!formik.errors.passwordConfirmation}
                    helperText={formik.errors.passwordConfirmation}
                    type = 'password'
                    required
                    value = {formik.values.passwordConfirmation}
                    onChange = {formik.handleChange}
                />}
            <Button variant = "contained" type = "submit" color='success'>{signup ? 'Signup' : 'Login'}</Button>
            </form>
        </Box>
    )
}
export default Signup;