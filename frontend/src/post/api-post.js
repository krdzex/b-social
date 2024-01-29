import baseUrl from "../config";

const create = async (credentials, post) => {
  try {
    return fetch(`${baseUrl}/post`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + credentials.t,
      },
      body: JSON.stringify(post),
    })
      .then((response) => response.json())
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
  }
};

export { create };
