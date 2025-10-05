import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setMessage('Por favor, completa todos los campos');
      return;
    }

    try {
      setLoading(true);
      setMessage('');
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });
      
      if (error) {
        console.error('Error de login:', error);
        throw error;
      }

      console.log('Login exitoso:', data);
      setMessage('¡Login exitoso! Redirigiendo...');
      
      // Redirigir inmediatamente
      window.location.href = '/Dashboard';
      
    } catch (error: any) {
      console.error('Error capturado:', error);
      
      // Mensajes de error más descriptivos
      let errorMessage = 'Error desconocido';
      
      if (error.message.includes('Invalid login credentials')) {
        errorMessage = 'Email o contraseña incorrectos';
      } else if (error.message.includes('Email not confirmed')) {
        errorMessage = 'Debes confirmar tu email primero';
      } else {
        errorMessage = error.message;
      }
      
      setMessage('Error: ' + errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="logo-container">
        <img src="/src/assets/theweathertrap_logo_degradado.svg" className="logo" alt="Logo" />
      </div>
      <h1 className="titleLogIn">Log In</h1>

      {message && (
        <div style={{
          padding: '10px',
          marginBottom: '20px',
          borderRadius: '6px',
          backgroundColor: message.includes('Error') ? '#ff4444' : '#4CAF50',
          textAlign: 'center',
          color: 'white'
        }}>
          {message}
        </div>
      )}

      <form onSubmit={handleEmailLogin}>
        <div className="form-group">
          <input 
            type="email" 
            placeholder="Email..." 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            required
          />
        </div>

        <div className="form-group">
          <input 
            type="password" 
            placeholder="Password..." 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            required
          />
        </div>

        <button 
          type="submit" 
          className="continue-btn"
          disabled={loading}
        >
          {loading ? 'Iniciando sesión...' : 'Continue'}
        </button>
      </form>

      <div className="signup-link">
        If you don't have an account, <a href="/signup">Sign up here</a>
      </div>
    </div>
  );
}

