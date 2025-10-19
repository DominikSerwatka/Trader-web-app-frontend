import React from 'react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const navigate = useNavigate();
  const { user, register, isLoggedIn } = useAuth();

  const [registerFormData, setRegisterFormData] = useState({
    name: '',
    last_name: '',
    email: '',
    password: '',
  });

  const [formErrors, setFormErrors] = useState({
    name: '',
    last_name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (!registerFormData.name) {
      errors.name = 'Imię jest wymagane';
    }
    if (!registerFormData.last_name) {
      errors.lastName = 'Nazwisko jest wymagane';
    }
    if (!registerFormData.email) {
      errors.email = 'Email jest wymagany';
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(registerFormData.email)) {
      errors.email = 'Nieprawidłowy format emaila';
    }
    if (!registerFormData.password) {
      errors.password = 'Hasło jest wymagane';
    } else if (registerFormData.password.length < 6) {
      errors.password = 'Hasło musi mieć co najmniej 6 znaków';
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validateForm();
    setFormErrors(errors);

    console.log('Validation errors: ', errors);

    if (Object.keys(errors).length === 0) {
      if (isLoggedIn) {
        console.log('User is already logged in:', user);
      } else {
        const registrationResult = register({
          email: registerFormData.email,
          password: registerFormData.password,
          name: registerFormData.name,
          last_name: registerFormData.last_name,
        });
        if (registrationResult) {
          console.log('User registered successfully:', registerFormData);
          navigate('/profile');
        } else {
          console.log('Registration failed. User already exists with this email.');
          setFormErrors((prevState) => ({
            ...prevState,
            email: 'Użytkownik z tym adresem email już istnieje',
          }));
        }
      }
    }

    console.log('Form submitted: ', registerFormData);
  };

  const [nameFocus, setNameFocus] = useState(false);
  const [lastNameFocus, setLastNameFocus] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [passwordButton, setPasswordButton] = useState(false);

  const slashEye = 'fa-solid fa-eye-slash';
  const eye = 'fa-solid fa-eye';

  const eyeButtonClassName =
    'absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black focus:outline-none';

  const nameInputOnBlur = (compareValue, methodToUse, key) => {
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
          <h2 className="text-2xl font-bold mb-6 text-center">Zarejestruj się</h2>
          <form onSubmit={null} className="space-y-4">
            <div className="relative">
              {nameFocus && (
                <label
                  htmlFor="firstName"
                  className="absolute left-3 -top-3 px-1 text-s text-gray-500 bg-white"
                >
                  Imię
                </label>
              )}

              <input
                type="text"
                name="name"
                id="firstName"
                value={registerFormData.name}
                onChange={handleChange}
                onFocus={() => setNameFocus(true)}
                onBlur={() => nameInputOnBlur(registerFormData.name, setNameFocus, 'name')}
                placeholder={nameFocus ? '' : 'Imię'}
                className="mt-1 block w-full border rounded-md px-3 py-2 hover:bg-gray-50 focus:bg-white"
              />
              {formErrors.name === '' ? null : (
                <p className="text-red-500 text-sm pl-1 mt-1">{formErrors.name}</p>
              )}
            </div>

            <div className="relative">
              {lastNameFocus && (
                <label
                  htmlFor="lastName"
                  className="absolute left-3 -top-3 px-1 text-s text-gray-500 bg-white"
                >
                  Nazwisko
                </label>
              )}
              <input
                type="text"
                name="last_name"
                value={registerFormData.last_name}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-md px-3 py-2 hover:bg-gray-50 focus:bg-white"
                onFocus={() => setLastNameFocus(true)} // send true if lastName is not empty
                onBlur={() =>
                  nameInputOnBlur(registerFormData.last_name, setLastNameFocus, 'lastName')
                } // send false if lastName is empty
                placeholder={lastNameFocus ? '' : 'Nazwisko'}
              />
              {formErrors.last_name === '' ? null : (
                <p className="text-red-500 text-sm pl-1 mt-1">{formErrors.last_name}</p>
              )}
            </div>

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
                value={registerFormData.email}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-md px-3 py-2 hover:bg-gray-50 focus:bg-white"
                onFocus={() => setEmailFocus(true)}
                onBlur={() => nameInputOnBlur(registerFormData.email, setEmailFocus, 'email')}
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
                value={registerFormData.password}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-md px-3 py-2 -mb-3 hover:bg-gray-50 focus:bg-white"
                onFocus={() => setPasswordFocus(true)}
                onBlur={() =>
                  nameInputOnBlur(registerFormData.password, setPasswordFocus, 'password')
                }
                placeholder={passwordFocus ? '' : 'Hasło'}
              />
              <button
                type="button"
                onClick={() => setPasswordButton((prevState) => !prevState)}
                className={eyeButtonClassName}
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
              Zarejestruj się
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

export default RegisterPage;
