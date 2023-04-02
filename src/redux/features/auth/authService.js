import axios from "axios";

export const registerService = async (data) => {
  const userExist = await axios.get(`http://localhost:5000/users`);

  for (let user of userExist.data) {
    if (user.email === data.email) {
      return { status: false, data: "Email already exist" };
    }
  }

  const res = await axios.post(`http://localhost:5000/users`, data);
  return { status: true, data: res.data };
};

export const loginService = async (data) => {
  const getAllUsers = await axios.get(`http://localhost:5000/users`);

  let userFound;

  for (let user of getAllUsers.data) {
    if (user.email === data.email) {
      userFound = user;
      if (userFound.password == data.password) {
        return { status: true, data: userFound };
      } else {
        return { status: false, data: "Wrong password" };
      }
    }
  }

  if (!userFound) {
    return { status: false, data: "User not found" };
  }
};
