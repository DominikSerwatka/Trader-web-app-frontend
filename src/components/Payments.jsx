import React from 'react';
import { useState } from 'react';
import { useAddresses } from '../context/AddressesContext';

function Payments() {
  const { addresses, addAddress, deleteAddress, updateAddress } = useAddresses();

  const [nameFocus, setNameFocus] = useState(false);
  const [lastNameFocus, setLastNameFocus] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [numberFocus, setNumberFocus] = useState(false);
  const [streetFocus, setStreetFocus] = useState(false);
  const [houseNumberFocus, setHouseNumberFocus] = useState(false);
  const [postalCodeFocus, setPostalCodeFocus] = useState(false);
  const [cityFocus, setCityFocus] = useState(false);

  const inputOnBlur = (compareValue, methodToSet, key) => {
    console.log(key);
    methodToSet(compareValue !== '');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentAddress((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [currentAddress, setCurrentAddress] = useState(null);

  const openModal = (addressId) => {
    const address = addresses?.find((addr) => addr.id === addressId);
    if (address) {
      setCurrentAddress({
        id: address.id,
        name: address.name,
        lastName: address.last_name,
        street: address.street,
        houseNumber: address.house_number,
        postalCode: address.postal_code,
        city: address.city,
        phoneNumber: address.phone_number,
        email: address.email,
      });
    } else {
      setCurrentAddress({
        id: 0,
        name: '',
        lastName: '',
        street: '',
        houseNumber: '',
        postalCode: '',
        city: '',
        phoneNumber: '',
        email: '',
      });
      console.log('Creating new address with id: 0');
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNameFocus(false);
    setLastNameFocus(false);
    setEmailFocus(false);
    setNumberFocus(false);
    setStreetFocus(false);
    setHouseNumberFocus(false);
    setPostalCodeFocus(false);
    setCityFocus(false);
  };

  const submitAddress = () => {
    if (currentAddress.id === 0) {
      var newAddress = {
        name: currentAddress.name,
        last_name: currentAddress.lastName,
        email: currentAddress.email,
        phone_number: currentAddress.phoneNumber,
        street: currentAddress.street,
        house_number: currentAddress.houseNumber,
        postal_code: currentAddress.postalCode,
        city: currentAddress.city,
      };
      addAddress(newAddress);
    } else {
      console.log('Updating address with id:', currentAddress.id);
      var updatedAddress = {
        name: currentAddress.name,
        last_name: currentAddress.lastName,
        email: currentAddress.email,
        phone_number: currentAddress.phoneNumber,
        street: currentAddress.street,
        house_number: currentAddress.houseNumber,
        postal_code: currentAddress.postalCode,
        city: currentAddress.city,
      };
      updateAddress(currentAddress.id, updatedAddress);
    }
    closeModal();
  };

  const handleDelete = (id) => {
    deleteAddress(id);
  };

  return (
    <div>
      <h3 className="text-lg font-bold mb-4">Ustawienia Adressów i metody płatności</h3>
      <div className="grid grid-cols-3 gap-6">
        {addresses &&
          addresses.map((address) => (
            <div key={address.id} className="bg-gray-100 p-3 rounded shadow">
              <h4 className="font-semibold">
                {address.name} {address.lastName}
              </h4>
              <p>
                {address.street} {address.houseNumber}
              </p>
              <p>
                {address.postalCode} {address.city}
              </p>
              <p>{address.phoneNumber}</p>
              <p>{address.email}</p>
              <div className="grid grid-cols-2 gap-6 px-6">
                <button
                  onClick={() => openModal(address.id)}
                  className="mt-2 px-1 py-2 bg-gray-300 text-dark rounded"
                >
                  Edytuj
                </button>
                <button
                  className="mt-2 px-1 py-2 bg-gray-300 text-dark rounded"
                  onClick={() => handleDelete(address.id)}
                >
                  Usuń
                </button>
              </div>
            </div>
          ))}
      </div>

      <button
        onClick={() => openModal(0)}
        className="mt-4 px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
      >
        Dodaj nowy adres
      </button>

      {isModalOpen && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <h4 className="text-lg font-bold mb-4">Dodaj nowy adres</h4>

            <div className="relative">
              {(nameFocus || currentAddress.name !== '') && (
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
                placeholder={nameFocus ? '' : 'Imię'}
                className="border p-3 rounded w-full"
                onChange={handleChange}
                value={currentAddress.name}
                onFocus={() => setNameFocus(true)}
                onBlur={() => inputOnBlur(currentAddress.name, setNameFocus, 'name')}
              />
            </div>

            <div className="mt-3 relative">
              {(lastNameFocus || currentAddress.lastName !== '') && (
                <label className="absolute left-3 -top-3 px-1 text-s text-gray-500 bg-white">
                  Nazwisko
                </label>
              )}
              <input
                required
                type="text"
                name="lastName"
                placeholder={lastNameFocus ? '' : 'Nazwisko'}
                className="border p-3 rounded w-full"
                onChange={handleChange}
                value={currentAddress.lastName}
                onFocus={() => setLastNameFocus(true)}
                onBlur={() => inputOnBlur(currentAddress.lastName, setLastNameFocus, 'lastName')}
              />
            </div>

            <div className="mt-3 relative">
              {(emailFocus || currentAddress.email !== '') && (
                <label
                  htmlFor="email"
                  className="absolute left-3 -top-3 px-1 text-s text-gray-500 bg-white"
                >
                  Email
                </label>
              )}
              <input
                type="text"
                name="email"
                placeholder={emailFocus ? '' : 'Email'}
                className="border p-3 rounded w-full"
                onChange={handleChange}
                value={currentAddress.email}
                onFocus={() => setEmailFocus(true)}
                onBlur={() => inputOnBlur(currentAddress.email, setEmailFocus, 'email')}
              />
            </div>

            <div className="mt-3 relative">
              {(numberFocus || currentAddress.phoneNumber !== '') && (
                <label
                  htmlFor="number"
                  className="absolute left-3 -top-3 px-1 text-s text-gray-500 bg-white"
                >
                  Numer telefonu
                </label>
              )}
              <input
                type="text"
                name="phoneNumber"
                placeholder={numberFocus ? '' : 'Numer telefonu'}
                className="border p-3 rounded w-full"
                onChange={handleChange}
                value={currentAddress.phoneNumber}
                onFocus={() => setNumberFocus(true)}
                onBlur={() =>
                  inputOnBlur(currentAddress.phoneNumber, setNumberFocus, 'phoneNumber')
                }
              />
            </div>

            <div className="mt-3 relative">
              {(streetFocus || currentAddress.street !== '') && (
                <label
                  htmlFor="street"
                  className="absolute left-3 -top-3 px-1 text-s text-gray-500 bg-white"
                >
                  Ulica
                </label>
              )}
              <input
                type="text"
                name="street"
                placeholder={streetFocus ? '' : 'Ulica'}
                className="border p-3 rounded w-full"
                onChange={handleChange}
                value={currentAddress.street}
                onFocus={() => setStreetFocus(true)}
                onBlur={() => inputOnBlur(currentAddress.street, setStreetFocus, 'street')}
              />
            </div>

            <div className="mt-3 relative">
              {(houseNumberFocus || currentAddress.houseNumber !== '') && (
                <label
                  htmlFor="houseNumber"
                  className="absolute left-3 -top-3 px-1 text-s text-gray-500 bg-white"
                >
                  Numer domu
                </label>
              )}
              <input
                type="text"
                name="houseNumber"
                placeholder={houseNumberFocus ? '' : 'Numer domu'}
                className="border p-3 rounded w-full"
                onChange={handleChange}
                value={currentAddress.houseNumber}
                onFocus={() => setHouseNumberFocus(true)}
                onBlur={() =>
                  inputOnBlur(currentAddress.houseNumber, setHouseNumberFocus, 'houseNumber')
                }
              />
            </div>

            <div className="mt-3 relative">
              {(postalCodeFocus || currentAddress.postalCode !== '') && (
                <label
                  htmlFor="postalCode"
                  className="absolute left-3 -top-3 px-1 text-s text-gray-500 bg-white"
                >
                  Kod pocztowy
                </label>
              )}
              <input
                type="text"
                name="postalCode"
                placeholder={postalCodeFocus ? '' : 'Kod pocztowy'}
                className="border p-3 rounded w-full"
                onChange={handleChange}
                value={currentAddress.postalCode}
                onFocus={() => setPostalCodeFocus(true)}
                onBlur={() =>
                  inputOnBlur(currentAddress.postalCode, setPostalCodeFocus, 'postalCode')
                }
              />
            </div>

            <div className="mt-3 relative">
              {(cityFocus || currentAddress.city !== '') && (
                <label
                  htmlFor="city"
                  className="absolute left-3 -top-3 px-1 text-s text-gray-500 bg-white"
                >
                  Miejscowość
                </label>
              )}
              <input
                type="text"
                name="city"
                placeholder={cityFocus ? '' : 'Miejscowość'}
                className="border p-3 rounded w-full"
                onChange={handleChange}
                value={currentAddress.city}
                onFocus={() => setCityFocus(true)}
                onBlur={() => inputOnBlur(currentAddress.city, setCityFocus, 'city')}
              />
            </div>

            <div className="flex justify-between mt-3">
              <button
                onClick={() => submitAddress()}
                className="bg-black text-white rounded px-3 py-2 hover:bg-gray-800 order-1"
              >
                Zapisz
              </button>
              <button
                onClick={() => closeModal()}
                className="bg-gray-200 text-gray-600 px-3 py-2 hover:underline rounded order-2"
              >
                Anuluj
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Payments;
