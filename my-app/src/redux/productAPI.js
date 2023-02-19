import Axios from "axios";

const callAPI = async ({ url, method, data }) => {
  return await Axios({
    url,
    method,
    data
  });
};

// User Login
export function userLogin(user) {
  return callAPI({ url: "https://mocki.io/v1/18dc5464-ea83-46f8-ac62-7c53fb0f3c47", method: "get", data: user });
}

// User Signup
export function userSignup(user) {
  return callAPI({ url: "https://mocki.io/v1/18dc5464-ea83-46f8-ac62-7c53fb0f3c47", method: "get", data: user });
}

// Item list
export function fetchItemList(userId) {
  return callAPI({ url: "https://mocki.io/v1/5a6f5476-566f-4f5b-a808-fc82176c8473", method: "get", data: {userId} });
}
