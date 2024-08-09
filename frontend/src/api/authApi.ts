import axios from 'axios';

export const sendLoginRequest = async (formData: FormData) => {
  try {
    const response = await axios.post(
      'http://localhost:5100/api/login',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    console.log('response', response);
  } catch (error) {
    console.error('Error logging in:', error);
  }
};
