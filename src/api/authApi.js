// built in imports


// custom imports
import axiosInstance from "./axiosInstance";


class AuthApi {
  // POST signup data
  async createUser(userData) {
    const response = await axiosInstance.post("/auth/sign-up", userData);
    return response.data;
  }

  // POST login
  async loginUser(userData) {
    const response = await axiosInstance.post("/auth/", userData);
    return response.data;
  }

}
export default new AuthApi()