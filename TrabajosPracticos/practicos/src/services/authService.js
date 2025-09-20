// Servicio mock: simula un login remoto.

const mockUsers = [
  { email: 'juan@gmail.com', password: '12345678', name: 'Juan' }
];

export function loginApi({ email, password }) {
  return new Promise((resolve, reject) => {
    // Simula latencia de red
    setTimeout(() => {
      const user = mockUsers.find(u => u.email === email && u.password === password);
      if (user) {
        // Devolver token falso + datos mínimos
        resolve({
          user: { email: user.email, name: user.name },
          token: 'fake-jwt-token'
        });
      } else {
        reject(new Error('Credenciales inválidas. Verifica email y/o contraseña.'));
      }
    }, 700); // 700ms para UX de carga
  });
}

export function validateToken(token) {
  // Mock: solo el token 'fake-jwt-token' es válido
  return token === 'fake-jwt-token';
}
