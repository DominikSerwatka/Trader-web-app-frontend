import React from 'react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const { user, isLoggedIn, login } = useAuth();

  const navigate = useNavigate();

  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: '',
  });

  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (!loginFormData.email) {
      errors.email = 'Podaj email';
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(loginFormData.email)) {
      errors.email = 'Nieprawidłowy format emaila';
    }
    if (!loginFormData.password) {
      errors.password = 'Podaj hasło';
    }

    console.log(errors);

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validateForm();
    setFormErrors(errors);

    console.log('Validation errors: ', errors);
    if (Object.keys(errors).length === 0) {
      if (isLoggedIn) {
        console.log('User is already logged in: ', user);
        navigate('/profile');
        return;
      }
      const loginResult = login(loginFormData.email, loginFormData.password);
      if (loginResult) {
        console.log('User logged in successfully:', user);
        navigate('/profile');
      } else {
        console.log('Invalid email or password');
        setFormErrors((prevState) => ({
          ...prevState,
          email: 'Nieprawidłowy email lub hasło',
        }));
      }
    }
  };

  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [passwordButton, setPasswordButton] = useState(false);

  const slashEye = 'fa-solid fa-eye-slash';
  const eye = 'fa-solid fa-eye';

  const inputOnBlur = (compareValue, methodToUse, key) => {
    methodToUse(compareValue !== '');
    if (compareValue !== '') {
      setFormErrors((prevState) => ({
        ...prevState,
        [key]: '',
      }));
    }
  };

  return (
    <>
      <section className="pt-10 bg-gray-50 px-4 pb-60">
        <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow">
          <h2 className="text-2xl font-bold mb-6 text-center">Zaloguj się</h2>
          <form onSubmit={null} className="space-y-4">
            <div className="relative">
              {emailFocus && (
                <label
                  htmlFor="email"
                  className="absolute left-3 -top-3 px-1 text-s text-gray-500 bg-white"
                >
                  Email
                </label>
              )}
              <input
                type="email"
                name="email"
                value={loginFormData.email}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-md px-3 py-2 hover:bg-gray-50 focus:bg-white"
                onFocus={() => setEmailFocus(true)}
                onBlur={() => inputOnBlur(loginFormData.email, setEmailFocus, 'email')}
                placeholder={emailFocus ? '' : 'Email'}
              />
              {formErrors.email === '' ? null : (
                <p className="text-red-500 text-sm pl-1 mt-1">{formErrors.email}</p>
              )}
            </div>

            <div className="relative">
              {passwordFocus && (
                <label
                  htmlFor="Hasło"
                  className="absolute left-3 -top-3 px-1 text-s text-gray-500 bg-white"
                >
                  Hasło
                </label>
              )}
              <input
                type={passwordButton ? 'text' : 'password'}
                name="password"
                value={loginFormData.password}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-md px-3 -mb-3 py-2 hover:bg-gray-50 focus:bg-white"
                onFocus={() => setPasswordFocus(true)}
                onBlur={() => inputOnBlur(loginFormData.password, setPasswordFocus, 'password')}
                placeholder={passwordFocus ? '' : 'Hasło'}
              />
              <button
                type="button"
                onClick={() => setPasswordButton((prevState) => !prevState)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black focus:outline-none"
                tabIndex={-1}
              >
                <i className={passwordButton ? slashEye : eye}></i>
              </button>
            </div>
            <div>
              {formErrors.password === '' ? null : (
                <p className="text-red-500 text-sm pl-1">{formErrors.password}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full border border-black text-dark py-2 px-4 rounded-md hover:bg-gray-200 transition"
              onClick={handleSubmit}
            >
              Zaloguj się
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

export default LoginPage;
