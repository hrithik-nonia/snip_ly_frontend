// built in imports
import axios from "axios";

// custom imports

class AuthApi {
  // POST signup data
  async createUser(userData) {
    const response = await axios.post("/auth/sign-up", userData);

    return response.data;
  }

}
export default new AuthApi()