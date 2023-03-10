import React, {useState} from 'react'
import backgroundImage from '../assets/bookstore.jpg';
import {useNavigate} from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [formLogin, setFormLogin] = useState({email: '', password: ''})

  const handleSubmit = (e) => {
    e.preventDefault()

    formLogin.email.length !== 0 && formLogin.password.length !== 0 ? navigate('/home') : console.log('Inserire valori negli input');
  };

  console.log(formLogin.email);

  return (
    <>
    <div className='overlay bg-blue-900 bg-opacity-25 w-full h-screen absolute'></div>
    <div 
      className='w-full bg-cover bg-no-repeat bg-center h-screen flex justify-center items-center' 
      style={{ backgroundImage: `url(${backgroundImage})`}}
    >
        <div className='bg-white shadow rounded-md z-20 px-10 py-10 min-w-[350px]'>
          <div className="brand flex items-center justify-center">
            <img
              className="h-8 w-8"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
              alt="Your Company"
            />
            <span className="b-title ml-2 font-bold">EPIBOOK</span>
          </div>

          <form onSubmit={handleSubmit}>

            <input 
              type='text'
              name='email'
              onChange={(e) =>
                setFormLogin({
                    ...formLogin,
                    email: e.target.value,
                })
            }
              placeholder='youremail@mail.com'
              className='w-full rounded-md mt-4 mb-4 block border border-gray-300 bg-white py-2 px-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
            />

            <input 
              type='password'
              name='password'
              onChange={(e) =>
                setFormLogin({
                    ...formLogin,
                    password: e.target.value,
                })
            }
              placeholder='password'
              className='w-full rounded-md mt-4 mb-4 block border border-gray-300 bg-white py-2 px-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
            />

            <button
              type='submit'
              className='w-full rounded-md mt-4 mb-4 block border border-gray-300 text-white bg-indigo-500 py-2 px-3 text-sm font-medium shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
            >
              Accedi
            </button>

          </form>
        </div>
    </div>
    </>
  )
}

export default Login