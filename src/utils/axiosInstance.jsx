import axios from "axios";

function AxiosInstance() {
  const axiosInstance = axios.create({
    baseURL: "http://localhost:8080",
    timeout: 10000,
    headers: { "Content-Type": "application/json" },
  });

  // Add interceptor to dynamically insert token
  axiosInstance.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem("accessToken");
    //console.log(accessToken);

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    console.log("Request made with:", config);
    return config;
  });
  // axiosInstance.interceptors.response.use(
  //   (config) => {
  //     console.log("Response made :", config);
  //     return config;
  //   },
  //   (error) => {
  //     return Promise.resolve(error.response);
  //   }
  // );

  return axiosInstance;
}

export default AxiosInstance;