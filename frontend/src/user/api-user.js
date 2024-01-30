import baseUrl from "../config";

const create = (user) => {
  return fetch(`${baseUrl}/register`, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

const getUserById = (params, token) => {
  return fetch(`${baseUrl}/user/${params.userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

const getFollowingPeople = (userId, token) => {
  return fetch(`${baseUrl}/user/${userId}/following`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token.t,
    },
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

const getFollowers = (userId, token) => {
  return fetch(`${baseUrl}/user/${userId}/followers`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token.t,
    },
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export { create, getUserById, getFollowingPeople, getFollowers };
