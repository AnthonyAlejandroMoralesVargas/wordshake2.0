// Configuración de la API
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

// Headers comunes para las peticiones
export const getAuthHeaders = () => {
  const token = localStorage.getItem('authToken');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

// Función para manejar respuestas de la API
export const handleApiResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error('API Error Response:', {
      status: response.status,
      statusText: response.statusText,
      errorData,
      url: response.url
    });
    throw new Error(errorData.detail || errorData.message || `HTTP error! status: ${response.status}`);
  }
  return response.json();
};

// Función para hacer peticiones a la API
export const apiRequest = async (
  endpoint: string, 
  options: RequestInit = {}
) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // Log para debugging (solo en desarrollo)
  if (import.meta.env.DEV) {
    console.log('API Request:', { url, options });
  }
  
  const config: RequestInit = {
    headers: getAuthHeaders(),
    ...options
  };

  try {
    const response = await fetch(url, config);
    return handleApiResponse(response);
  } catch (error) {
    console.error('API Request failed:', { url, error });
    throw error;
  }
};

// Función de utilidad para verificar la configuración de la API
export const checkApiConfiguration = () => {
  console.log('API Configuration:', {
    baseUrl: API_BASE_URL,
    environment: import.meta.env.MODE,
    isDev: import.meta.env.DEV,
    allEnvVars: import.meta.env
  });
};