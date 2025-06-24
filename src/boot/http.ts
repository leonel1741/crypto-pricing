import axios from "axios";

const http = async (url: string, config = {}) => {
  const response = await axios.get(`${url}`, config)
  return response.data
}

export default http;
