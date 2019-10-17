import React, {useState, useEffect} from 'react';
import {withFormik, Form, Field} from 'formik';
import * as Yup from "yup";
import axios from 'axios';
//THE WHOLE FORM
function UserForm ({errors, touched, status}) {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        if (status){
            setUsers([...users, status])
        }
    }, [status])

    //THE FORM STRUCTURE
    return(
        <Form className='user-form'> 

            <h2> Welcome! </h2>
            <Field className='user-field' type='text' name='username' placeholder='username'/>
            <div className='form-error-message'> 
            {touched.username && errors.username && <p>{errors.username}</p>} 
            </div> 

            <Field className='user-field' type='email' name='email' placeholder='email'/>
            <div className='form-error-message'> 
            {touched.email && errors.email && <p>{errors.email}</p>} 
            </div> 

            <Field  className='user-field' type='password' name='password' placeholder='password'/>                 <div className='form-error-message'> 
            {touched.password && errors.password && <p>{errors.password}</p>} 
            </div> 

            <label className='terms-of-service'>
            <Field type='checkbox' name='checkbox' />
            <div className='form-error-message1'> 
            {touched.checkbox && errors.checkbox && <p>{errors.checkbox}</p>} 
            </div> 
            <p> Terms of Service </p>
          
            
            </label>
        
            <button className='user-button' type='submit'> Submit </button>

            {/* temp */}
            <div> 
                {users.map(user => (
                <p>
                {user.data.username},{user.data.email} </p>
                ))}

            </div>
        </Form>
    )
}

const FormikUserForm = withFormik({
    mapPropsToValues({ username, email, password, checkbox }) {
      return {
        username: username || "",
        email: email || "",
        password: password || "",
        checkbox: checkbox || false
      };
    },
    //THE VALIDATION
    validationSchema: Yup.object().shape({
        username: Yup.string().required('Username is required'),
        email: Yup.string().email().required('Email is required'),
        password: Yup.string()
        .min(6, "Password must be 6 characters or longer")
        .required("Password is required")
        ,
        checkbox: Yup.boolean().required().oneOf([true], 'Must Accept ')
    }),



    // HANDLE SUBMIT EVENT 
    handleSubmit (values, {setStatus}) {
        console.log(values);
        // POST REQUEST
        axios
            .post('https://reqres.in/api/users', values)
            .then(response => {
                setStatus(response);
            })
            .catch(error => {
            })
        
    }
    
  })(UserForm );


  
  export default FormikUserForm;