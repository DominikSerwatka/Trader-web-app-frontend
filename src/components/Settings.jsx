import React from 'react';
import { useAuth } from '../context/AuthContext';

function Settings() {
  const { user } = useAuth();

  return (
    <div>
      <h3 className="text-lg font-bold mb-4">Ustawienia konta</h3>
      <p>Imię: {user.name}</p>
      <p>Nazwisko: {user.lastName}</p>
      <p>Email: {user.email}</p>
    </div>
  );
}

export default Settings;
