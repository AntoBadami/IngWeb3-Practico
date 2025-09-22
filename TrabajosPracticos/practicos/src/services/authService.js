// Servicio mock con persistencia localStorage para usuarios creados desde UI.

const MOCK_USERS = [
  { email: 'juan@gmail.com', password: '12345678', name: 'Juan' }
];

const USERS_STORAGE_KEY = 'app_users_v1';

function loadStoredUsers() {
  try {
    const raw = localStorage.getItem(USERS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch (e) {
    console.warn('[authService] error leyendo users from storage', e);
    return [];
  }
}

function saveStoredUsers(users) {
  try {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  } catch (e) {
    console.warn('[authService] error guardando users to storage', e);
  }
}

function getAllUsers() {
  const stored = loadStoredUsers();
  // return mock users first, then stored
  return [...MOCK_USERS, ...stored];
}

/**
 * loginApi({email,password}) -> Promise resolves {user, token} or rejects Error
 */
export function loginApi({ email, password }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = getAllUsers();
      const user = users.find(u => u.email === email && u.password === password);
      if (user) {
        resolve({
          user: { email: user.email, name: user.name },
          token: 'fake-jwt-token'
        });
      } else {
        reject(new Error('Credenciales inválidas. Verifica email y/o contraseña.'));
      }
    }, 700);
  });
}

/**
 * - Valida email único y password >= 6
 * - Guarda en localStorage 
 */
export function registerApi({ name, email, password }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!name || String(name).trim().length < 3) {
        return reject(new Error('El nombre debe tener al menos 3 caracteres.'));
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email)) {
        return reject(new Error('Formato de email inválido.'));
      }
      if (!password || password.length < 6) {
        return reject(new Error('La contraseña debe tener al menos 6 caracteres.'));
      }

      const all = getAllUsers();
      const exists = all.find(u => u.email === email);
      if (exists) {
        return reject(new Error('Ya existe un usuario con ese email.'));
      }

      const stored = loadStoredUsers();
      const newUser = { name: String(name).trim(), email, password };
      stored.push(newUser);
      saveStoredUsers(stored);

      console.log('[authService] nuevo usuario registrado:', newUser);

      resolve({ email: newUser.email, name: newUser.name });
    }, 600);
  });
}

export function validateToken(token) {
  return token === 'fake-jwt-token';
}

// utilidad para listar todos los usuarios (mock + guardados)
export function getAllUsersExport() {
  return getAllUsers();
}

// default export (compatibilidad)
const defaultExport = {
  loginApi,
  registerApi,
  validateToken,
  getAllUsers: getAllUsersExport
};

export default defaultExport;
