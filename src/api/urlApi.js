// built in imports


// custom imports
import axiosInstance from "./axiosInstance";

class UrlApi {
  // post url
  async createUrl(url) {
    const response = await axiosInstance.post("/url/short-url", { original_url: url })
    return response.data
  }

  // GET HOME STATES DATA
  async stats() {
    const response = await axiosInstance.get("/url/home_stats_data")
    return response.data
  }
}
export default new UrlApi