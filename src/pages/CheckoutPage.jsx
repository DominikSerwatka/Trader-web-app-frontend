// import React, { useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useState } from 'react';
// import { useCheckout } from '../context/CheckoutContext.jsx';
// import { useAddresses } from '../context/AddressesContext.jsx';
// import { useCart } from '../context/CartContext.jsx';

// function CheckoutPage() {
//   const navigate = useNavigate();

//   const { addresses, addAddress, deleteAddress, updateAddress } = useAddresses();

//   const { setAndValidateCheckoutData, checkoutData } = useCheckout();

//   const { cart } = useCart();

//   const [deliveryMethod, setDeliveryMethod] = useState('');
//   const [paymentMethod, setPaymentMethod] = useState('');

//   const choose_payment = (method) => {
//     if (method === paymentMethod) {
//       setPaymentMethod("");
//       return;
//     }
//     setPaymentMethod(method);
//   }

//   const choose_delivery = (method) => {
//     if (method === deliveryMethod) {
//       setDeliveryMethod("")
//       return;
//     }
//     setDeliveryMethod(method);
//   }

//   const [nameFocus, setNameFocus] = useState(false);
//   const [lastNameFocus, setLastNameFocus] = useState(false);
//   const [emailFocus, setEmailFocus] = useState(false);
//   const [numberFocus, setNumberFocus] = useState(false);
//   const [streetFocus, setStreetFocus] = useState(false);
//   const [houseNumberFocus, setHouseNumberFocus] = useState(false);
//   const [postalCodeFocus, setPostalCodeFocus] = useState(false);
//   const [cityFocus, setCityFocus] = useState(false);

//   const onSubmitAction = () => {
//     console.log(chooseAddress);

//     var address = {
//         name: chooseAddress.name,
//         last_name: chooseAddress.last_name,
//         email: chooseAddress.email,
//         phone_number: chooseAddress.phone_number,
//         street: chooseAddress.street,
//         house_number: chooseAddress.house_number,
//         postal_code: chooseAddress.postal_code,
//         city: chooseAddress.city,
//       };
//     var order_items = [...cart.map(item => ({
//         product_id: item.id,
//         qty: item.quantity,
//       }))]

//     var order = {
//         items: order_items,
//         delivery_address_snapshot: address,
//         delivery_address_id: chooseAddress.id,
//         delivery_fee: 10,
//         discount_total: 0,
//         payment_method: paymentMethod,
//       }
    
//     console.log("Address:", address);
//     setAndValidateCheckoutData(address, order_items, order);
//     navigate('/checkout/summary');
//   };

//   const [isAddressesModalOpen, setIsAddressesModalOpen] = useState(false);
//   const [isNewAddressModalOpen, setIsNewAddressModalOpen] = useState(false);

//   const [chooseAddress, setChooseAddress] = useState(() => {
//     return addresses.length > 0 ? addresses[0] : null;
//   });

//   useEffect(() => {
//     if (addresses.length > 0 && !chooseAddress) {
//       setChooseAddress(addresses[0]);
//       return;
//     }

//     const fresh = addresses.find(address => address.id == chooseAddress.id)
//     if (fresh) {
//       setChooseAddress(fresh);
//     }

//   }, [addresses])

//   const [currentAddress, setCurrentAddress] = useState({
//     name: '',
//     lastName: '',
//     email: '',
//     phoneNumber: '',
//     street: '',
//     houseNumber: '',
//     postalCode: '',
//     city: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCurrentAddress((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const inputOnBlur = (compareValue, methodToSet, key) => {
//     console.log(key);
//     methodToSet(compareValue !== '');
//   };

//   const openAddressModal = (addressId) => {
//     const address = addresses.find((addr) => addr.id === addressId);
//     if (address) {
//       setCurrentAddress({
//         id: address.id,
//         name: address.name,
//         lastName: address.last_name,
//         street: address.street,
//         houseNumber: address.house_number,
//         postalCode: address.postal_code,
//         city: address.city,
//         phoneNumber: address.phone_number,
//         email: address.email,
//       });
//     } else {
//       setCurrentAddress({
//         id: 0,
//         name: '',
//         lastName: '',
//         street: '',
//         houseNumber: '',
//         postalCode: '',
//         city: '',
//         phoneNumber: '',
//         email: '',
//       });
//       console.log('Creating new address with id: 0');
//     }
//     setIsAddressesModalOpen(false);
//     setIsNewAddressModalOpen(true);
//   };

//   const closeNewAddressModal = () => {
//     setIsNewAddressModalOpen(false);
//     setIsAddressesModalOpen(true);
//     setNameFocus(false);
//     setLastNameFocus(false);
//     setEmailFocus(false);
//     setNumberFocus(false);
//     setStreetFocus(false);
//     setHouseNumberFocus(false);
//     setPostalCodeFocus(false);
//     setCityFocus(false);
//   };

//   const submitNewAddress = async () => {
//     console.log('Submitting new address');
//     if (currentAddress.id === 0) {
//       var newAddress = {
//         name: currentAddress.name,
//         last_name: currentAddress.lastName,
//         email: currentAddress.email,
//         phone_number: currentAddress.phoneNumber,
//         street: currentAddress.street,
//         house_number: currentAddress.houseNumber,
//         postal_code: currentAddress.postalCode,
//         city: currentAddress.city,
//       };
//       await addAddress(newAddress);
//     } else {
//       console.log('Updating address with id:', currentAddress.id);
//       var updatedAddress = {
//         name: currentAddress.name,
//         last_name: currentAddress.lastName,
//         email: currentAddress.email,
//         phone_number: currentAddress.phoneNumber,
//         street: currentAddress.street,
//         house_number: currentAddress.houseNumber,
//         postal_code: currentAddress.postalCode,
//         city: currentAddress.city,
//       };
//       await updateAddress(currentAddress.id, updatedAddress);
//     }
//     closeNewAddressModal();
//   };

//   const handleDelete = (id) => {
//     deleteAddress(id);
//   };

//   const [addressCandidate, setAddressCandidate] = useState(chooseAddress);

//   useEffect(() => {
//     setAddressCandidate(chooseAddress);
//   }, [chooseAddress]);

//   const submitAddressModal = () => {
//     setIsAddressesModalOpen(false);
//     setChooseAddress(addressCandidate);
//   };

//   return (
//     <>
//       <form>
//         <h2 className="text-2xl font-bold mb-3">Dane osobowe</h2>

//         {chooseAddress ? (
//           <div
//             key={chooseAddress.id}
//             className="relative bg-gray-50 shadow rounded-lg mt-4 mb-4 p-4 border"
//           >
//             <h4 className="font-semibold">
//               {chooseAddress.name} {chooseAddress.lastName}
//             </h4>
//             <p>
//               {chooseAddress.street} {chooseAddress.houseNumber}
//             </p>
//             <p>
//               {chooseAddress.postalCode} {chooseAddress.city}
//             </p>
//             <p>{chooseAddress.phoneNumber}</p>
//             <p>{chooseAddress.email}</p>
//             <button
//               className="absolute top-2 right-2 border p-2 rounded-md hover:bg-gray-100 border-black"
//               onClick={() => setIsAddressesModalOpen(true)}
//               type="button"
//             >
//               Zmień
//             </button>
//           </div>
//         ) : (
//           <div className="mb-3">
//             <button
//               className="rounded border p-3 border-black hover:bg-gray-100 w-1/3"
//               onClick={() => openAddressModal(0)}
//               type="button"
//             >
//               Dodaj nowy adres
//             </button>
//           </div>
//         )}

//         <h2 className="pt-3 text-2xl font-bold">Metoda dostawy</h2>
//         <div className="mt-2">
//           <label className="flex items-center">
//             <input
//               className="accent-black"
//               type="radio"
//               name="deliveryMethod"
//               value="kurier"
//               checked={deliveryMethod === 'kurier'}
//               onChange={null}
//               onClick={() => choose_delivery('kurier')}
//             />
//             <span className="ml-2">Kurier (15 zł)</span>
//           </label>

//           <label className="flex items-center">
//             <input
//               className="accent-black"
//               type="radio"
//               name="deliveryMethod"
//               value="paczkomat"
//               checked={deliveryMethod === 'paczkomat'}
//               onClick={() => choose_delivery('paczkomat')}
//             />
//             <span className="ml-2">Paczkomat (10 zł)</span>
//           </label>
//         </div>

//         <h2 className="pt-3 text-2xl font-bold">Metoda płatności</h2>
//         <div className="mt-2">
//           <label className="flex items-center">
//             <input
//               className="accent-black"
//               type="radio"
//               name="paymentMethod"
//               value="blik"
//               checked={paymentMethod === 'blik'}
//               onClick={() => choose_payment('blik')}
//             />
//             <span className="ml-2">BLIK</span>
//           </label>
//         </div>

//         <div className="flex justify-between items-center mt-10">
//           <Link
//             to="/shop-cart"
//             className="inline-block bg-white text-dark px-4 py-2 rounded-md hover:bg-gray-200 border border-black transition"
//           >
//             Wróć do koszyka
//           </Link>

//           <button
//             onClick={() => onSubmitAction()}
//             type="button"
//             className="inline-block bg-white text-dark px-4 py-2 rounded-md hover:bg-gray-200 border border-black transition"
//           >
//             Przejdź dalej
//           </button>
//         </div>

//         {isAddressesModalOpen && (
//           <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center">
//             <div className="bg-white p-6 rounded shadow-md w-full max-w-md max-h-[80vh] overflow-y-auto">
//               <h1 className="text-lg mb-4">Zapisane adresy</h1>
//               {addresses.map((address) => (
//                 <div key={address.id} className="relative bg-gray-100 p-3 rounded shadow mb-4">
//                   <h4 className="font-semibold">
//                     {address.name} {address.lastName}
//                   </h4>
//                   <p>
//                     {address.street} {address.houseNumber}
//                   </p>
//                   <p>
//                     {address.postalCode} {address.city}
//                   </p>
//                   <p>{address.phoneNumber}</p>
//                   <p>{address.email}</p>
//                   <div className="grid grid-cols-2 gap-6 px-6">
//                     <button
//                       onClick={() => openAddressModal(address.id)}
//                       className="mt-2 px-1 py-2 bg-gray-300 text-dark rounded"
//                     >
//                       Edytuj
//                     </button>
//                     <button
//                       className="mt-2 px-1 py-2 bg-gray-300 text-dark rounded"
//                       onClick={() => handleDelete(address.id)}
//                     >
//                       Usuń
//                     </button>
//                     <input
//                       className="absolute accent-black top-3 right-3"
//                       name="address"
//                       type="radio"
//                       checked={addressCandidate?.id === address.id}
//                       onChange={() => setAddressCandidate(address)}
//                     />
//                   </div>
//                 </div>
//               ))}
//               <div className="mb-4">
//                 <button
//                   className="rounded border p-3 border-black hover:bg-gray-100 w-full "
//                   onClick={() => openAddressModal(0)}
//                   type="button"
//                 >
//                   Dodaj nowy adres
//                 </button>
//               </div>
//               <div className="flex justify-between mt-3">
//                 <button
//                   className="bg-black text-white rounded px-3 py-2 hover:bg-gray-300 order-1"
//                   onClick={() => submitAddressModal()}
//                   type="button"
//                 >
//                   Zamknij
//                 </button>
//                 <button
//                   className="bg-black text-white rounded px-3 py-2 hover:bg-gray-300 order-2"
//                   onClick={() => submitAddressModal()}
//                   type="button"
//                 >
//                   Wybierz
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {isNewAddressModalOpen && (
//           <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center">
//             <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
//               <h4 className="text-lg font-bold mb-4">Dodaj nowy adres</h4>
//               <div className="relative">
//                 {(nameFocus || currentAddress.name !== '') && (
//                   <label
//                     htmlFor="firstName"
//                     className="absolute left-3 -top-3 px-1 text-s text-gray-500 bg-white"
//                   >
//                     Imię
//                   </label>
//                 )}
//                 <input
//                   type="text"
//                   name="name"
//                   placeholder={nameFocus ? '' : 'Imię'}
//                   className="border p-3 rounded w-full"
//                   onChange={handleChange}
//                   value={currentAddress.name}
//                   onFocus={() => setNameFocus(true)}
//                   onBlur={() => inputOnBlur(currentAddress.name, setNameFocus, 'name')}
//                 />
//               </div>

//               <div className="mt-3 relative">
//                 {(lastNameFocus || currentAddress.lastName !== '') && (
//                   <label className="absolute left-3 -top-3 px-1 text-s text-gray-500 bg-white">
//                     Nazwisko
//                   </label>
//                 )}
//                 <input
//                   required
//                   type="text"
//                   name="lastName"
//                   placeholder={lastNameFocus ? '' : 'Nazwisko'}
//                   className="border p-3 rounded w-full"
//                   onChange={handleChange}
//                   value={currentAddress.lastName}
//                   onFocus={() => setLastNameFocus(true)}
//                   onBlur={() => inputOnBlur(currentAddress.lastName, setLastNameFocus, 'lastName')}
//                 />
//               </div>

//               <div className="mt-3 relative">
//                 {(emailFocus || currentAddress.email !== '') && (
//                   <label
//                     htmlFor="email"
//                     className="absolute left-3 -top-3 px-1 text-s text-gray-500 bg-white"
//                   >
//                     Email
//                   </label>
//                 )}
//                 <input
//                   type="text"
//                   name="email"
//                   placeholder={emailFocus ? '' : 'Email'}
//                   className="border p-3 rounded w-full"
//                   onChange={handleChange}
//                   value={currentAddress.email}
//                   onFocus={() => setEmailFocus(true)}
//                   onBlur={() => inputOnBlur(currentAddress.email, setEmailFocus, 'email')}
//                 />
//               </div>

//               <div className="mt-3 relative">
//                 {(numberFocus || currentAddress.phoneNumber !== '') && (
//                   <label
//                     htmlFor="number"
//                     className="absolute left-3 -top-3 px-1 text-s text-gray-500 bg-white"
//                   >
//                     Numer telefonu
//                   </label>
//                 )}
//                 <input
//                   type="text"
//                   name="phoneNumber"
//                   placeholder={numberFocus ? '' : 'Numer telefonu'}
//                   className="border p-3 rounded w-full"
//                   onChange={handleChange}
//                   value={currentAddress.phoneNumber}
//                   onFocus={() => setNumberFocus(true)}
//                   onBlur={() =>
//                     inputOnBlur(currentAddress.phoneNumber, setNumberFocus, 'phoneNumber')
//                   }
//                 />
//               </div>

//               <div className="mt-3 relative">
//                 {(streetFocus || currentAddress.street !== '') && (
//                   <label
//                     htmlFor="street"
//                     className="absolute left-3 -top-3 px-1 text-s text-gray-500 bg-white"
//                   >
//                     Ulica
//                   </label>
//                 )}
//                 <input
//                   type="text"
//                   name="street"
//                   placeholder={streetFocus ? '' : 'Ulica'}
//                   className="border p-3 rounded w-full"
//                   onChange={handleChange}
//                   value={currentAddress.street}
//                   onFocus={() => setStreetFocus(true)}
//                   onBlur={() => inputOnBlur(currentAddress.street, setStreetFocus, 'street')}
//                 />
//               </div>

//               <div className="mt-3 relative">
//                 {(houseNumberFocus || currentAddress.houseNumber !== '') && (
//                   <label
//                     htmlFor="houseNumber"
//                     className="absolute left-3 -top-3 px-1 text-s text-gray-500 bg-white"
//                   >
//                     Numer domu
//                   </label>
//                 )}
//                 <input
//                   type="text"
//                   name="houseNumber"
//                   placeholder={houseNumberFocus ? '' : 'Numer domu'}
//                   className="border p-3 rounded w-full"
//                   onChange={handleChange}
//                   value={currentAddress.houseNumber}
//                   onFocus={() => setHouseNumberFocus(true)}
//                   onBlur={() =>
//                     inputOnBlur(currentAddress.houseNumber, setHouseNumberFocus, 'houseNumber')
//                   }
//                 />
//               </div>

//               <div className="mt-3 relative">
//                 {(postalCodeFocus || currentAddress.postalCode !== '') && (
//                   <label
//                     htmlFor="postalCode"
//                     className="absolute left-3 -top-3 px-1 text-s text-gray-500 bg-white"
//                   >
//                     Kod pocztowy
//                   </label>
//                 )}
//                 <input
//                   type="text"
//                   name="postalCode"
//                   placeholder={postalCodeFocus ? '' : 'Kod pocztowy'}
//                   className="border p-3 rounded w-full"
//                   onChange={handleChange}
//                   value={currentAddress.postalCode}
//                   onFocus={() => setPostalCodeFocus(true)}
//                   onBlur={() =>
//                     inputOnBlur(currentAddress.postalCode, setPostalCodeFocus, 'postalCode')
//                   }
//                 />
//               </div>

//               <div className="mt-3 relative">
//                 {(cityFocus || currentAddress.city !== '') && (
//                   <label
//                     htmlFor="city"
//                     className="absolute left-3 -top-3 px-1 text-s text-gray-500 bg-white"
//                   >
//                     Miejscowość
//                   </label>
//                 )}
//                 <input
//                   type="text"
//                   name="city"
//                   placeholder={cityFocus ? '' : 'Miejscowość'}
//                   className="border p-3 rounded w-full"
//                   onChange={handleChange}
//                   value={currentAddress.city}
//                   onFocus={() => setCityFocus(true)}
//                   onBlur={() => inputOnBlur(currentAddress.city, setCityFocus, 'city')}
//                 />
//               </div>

//               <div className="flex justify-between mt-3">
//                 <button
//                   type="button"
//                   onClick={() => submitNewAddress()}
//                   className="bg-black text-white rounded px-3 py-2 hover:bg-gray-800 order-1"
//                 >
//                   Zapisz
//                 </button>
//                 <button
//                   onClick={() => closeNewAddressModal()}
//                   className="bg-gray-200 text-gray-600 px-3 py-2 hover:underline rounded order-2"
//                 >
//                   Anuluj
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </form>
//     </>
//   );
// }

// export default CheckoutPage;
