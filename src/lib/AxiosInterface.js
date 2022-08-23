import axios from 'axios'
import toast from 'react-hot-toast';

const axiosInstance = axios.create({
  baseURL: "http://localhost:8085/zblog",
  headers: {
    'Content-Type': 'application/json',
  }
})


// response interceptor
axiosInstance.interceptors.response.use(function (response) {
  toast.dismiss();
  if(response.data.message){
    toast.success(response.data.message)
  }

  return response.data
}, function (error) {
    toast.dismiss();
    console.log(error, "ERROR")
    if (error.response?.status >= 400) {
        
        toast.error(error.response.data.message?? "Error");
    }

    if (error.response.status == 401) {
      
        return Promise.reject(error)
    } else if (error.response.status == 404) {

        return Promise.reject(error)
    } else if (error.response.status == 422) {

        return Promise.reject(error)
    } else if (error.response.status == 500) {

        return Promise.reject(error)
    } else {
        return Promise.reject(error)
    }
})

export default axiosInstance