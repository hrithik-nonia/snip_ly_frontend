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

  // POST URL PRIVATE ROUTE KE LIYA
  async createUrlWithAlias(originalUrl, customAlias) {
    const response = await axiosInstance.post("/url/shorten", {
      original_url: originalUrl,
      ...(customAlias && { custom_alias: customAlias })  // optional agar custom alias nahi diya to ye field nahi jayga
    })
    return response.data
  }

  // GET USER DATA
  async getUserDashBoardData(page = 1, limit = 5, search = "") {
    const response = await axiosInstance.get("/url/get_user_data", {
      params: { page, limit, search }
    })
    return response.data
  }

  // DELETE LINK
  async deleteLink(short_code) {
    const response = await axiosInstance.delete("/url/delete", {
      params: { short_code }
    });
    return response.data;
  }

  // GET ANALYTICS LINK DATA
  async get_analytics_data(short_code) {
    const response = await axiosInstance.get("/url/link_analytics", {
      params: { short_code }
    })
    return response.data
  }
}
export default new UrlApi