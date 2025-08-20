'use client';

import { useState } from 'react';
import Visibility from './Visibility';

interface LoginInputProps {
  label: string;
  name: string;
  placeHolder: string;
}

export function LoginEmail({ label, name, placeHolder }: LoginInputProps) {
  const [email, setEmail] = useState('');

  function handleChange(newValue: string) {
    setEmail(newValue);
  }

  return (
    <div className="flex gap-1 flex-col w-full">
      <label htmlFor={name} className="text-sm">
        {label}
      </label>
      <div className="flex items-center relative">
        <input
          className="w-full h-10 px-3 text-sm rounded-md border border-input-border"
          name={name}
          type="email"
          placeholder={placeHolder}
          value={email}
          onChange={(event) => handleChange(event.target.value)}
          required
        />
      </div>
    </div>
  );
}

export function LoginPassword({ label, name, placeHolder }: LoginInputProps) {
  const [password, setPassword] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  function handleChange(newPassword: string) {
    setPassword(newPassword);
  }

  return (
    <div className="flex gap-1 flex-col w-full">
      <label htmlFor={name} className="text-sm">
        {label}
      </label>
      <div className="flex items-center relative">
        <input
          className="w-full h-10 px-3 text-sm rounded-md border border-input-border"
          name={name}
          type={isVisible ? 'text' : 'password'}
          placeholder={placeHolder}
          value={password}
          onChange={(event) => handleChange(event.target.value)}
          required
        />
        <Visibility isVisible={isVisible} setIsVisible={setIsVisible} />
      </div>
    </div>
  );
}
