import React from 'react';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form';
import { signUpUserAPI } from 'actions/ApiCall';
import {
  EMAIL_RULE,
  EMAIL_RULE_MESSAGE,
  fieldErrorMessage,
  FIELD_REQUIRED_MESSAGE,
  PASSWORD_RULE,
  PASSWORD_RULE_MESSAGE,
} from 'utilities/validatiors'

function SignUp() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const navigate = useNavigate()
  const onSubmitSignUp = (data) => {
    toast.promise(signUpUserAPI(data), {pending: 'Signing up....'})
    .then(user => {
      navigate(`/signIn?registeredEmail=${user.email}`)
    })
  }

  return (
    <form
      className='auth__form form__sign-up'
      onSubmit={handleSubmit(onSubmitSignUp)}
    >
      <h2 className='auth__form__title'>Sign Up</h2>
      <div className='auth__form__input-field'>
        <i className='fa fa-envelope'></i>
        <input
          type='text'
          placeholder='Email'
          autoComplete='nope'
          {...register('email', {
            required: FIELD_REQUIRED_MESSAGE,
            pattern: {
              value: EMAIL_RULE,
              message: EMAIL_RULE_MESSAGE,
            },
          })}
        />
      </div>
      {fieldErrorMessage(errors,'email')}
      <div className='auth__form__input-field'>
        <i className='fa fa-lock'></i>
        <input
          type='password'
          placeholder='Password'
          autoComplete='nope'
          {...register('password', {
            required: FIELD_REQUIRED_MESSAGE,
            pattern: {
              value: PASSWORD_RULE,
              message: PASSWORD_RULE_MESSAGE,
            },
          })}
        />
      </div>
      {fieldErrorMessage(errors,'password')}
      <div className='auth__form__input-field'>
        <i className='fa fa-lock'></i>
        <input
          type='password'
          placeholder='Password Confirmation'
          {...register('password_confirmation', {
            validate: (value) => {
                return value === watch('password') || 'Password confirmation does not match.' // check ????ng v???i password
            }
          })}
        />
      </div>
      {fieldErrorMessage(errors,'password_confirmation')}   
      <button className='auth__form__submit' type='submit'>
        Sign Up
      </button>
    </form>
  );
}

export default SignUp;
