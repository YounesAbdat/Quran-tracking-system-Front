import LoginForm from "@/components/LoginForm";
import React, { useState } from 'react';


export default function Home() {
const [role, setRole] = useState(() => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('role');
  }
  return null;
});

  const handleLogin = (userRole) => {
    setRole(userRole);
    localStorage.setItem('role', userRole);
  };

  return (
    <div>
      <LoginForm onLogin={handleLogin}/>
    </div>
  );
}
