import axios from 'axios';

const axiosInterceptorInstance:any = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const SendAsync = <T>(
  request: any & { next?: { revalidate: number } },
): Promise<T> => {
  return new Promise((resolve, reject) => {
    axiosInterceptorInstance
      .request(request)
      // eslint-disable-next-line
      .then(({ data, errors }: any) => {
        console.log(data,'asdklfjaskdlfjaslkd')
        if (data?.data) {
          resolve(data?.data);
        } else {
          reject(data?.errors);
          throw new Error(errors);
        }
      })
      .catch((err:any) => {
        console.log('asdjflkjasdflkjasdlkfjasdlkfjasdlkfjasdlk')
        reject(err);
      });
  });
};

// Request interceptor
axiosInterceptorInstance.interceptors.request.use(
  (config:any) => {
    if (config.data && config.data.files) {
      config.headers['Content-Type'] = 'multipart/form-data';
    }
    return config;
  },
  (error:any) => {
    // Handle request errors here
    return Promise.reject(error);
  },
);
// End of Request interceptor

// Response interceptor
axiosInterceptorInstance.interceptors.response.use(
  (response:any) => {
    // Modify the response data here
    return response;
  },
  (error:any) => {
    // Handle response errors here
    return Promise.reject(error);
  },
);
// End of Response interceptor

export default axiosInterceptorInstance;
