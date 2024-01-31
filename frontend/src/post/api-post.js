import baseUrl from "../config";

const create = async (jwtToken, post) => {
  try {
    return fetch(`${baseUrl}/post`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwtToken,
      },
      body: JSON.stringify(post),
    })
      .then((response) => response.json())
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
  }
};

const listNewsFeed = async (userId, jwtToken, signal) => {
  try {
    let response = await fetch(`${baseUrl}/post/feed/` + userId, {
      method: "GET",
      signal: signal,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwtToken,
      },
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const comment = async (jwtToken, postId, comment) => {
  try {
    let response = await fetch(`${baseUrl}/post/${postId}/comments`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwtToken,
      },
      body: JSON.stringify(comment),
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const getComments = async (jwtToken, postId) => {
  try {
    let response = await fetch(`${baseUrl}/post/${postId}/comments`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwtToken,
      },
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const deleteComment = async (jwtToken, commentId) => {
  try {
    let response = await fetch(`${baseUrl}/comments/${commentId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwtToken,
      },
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const removePost = async (postId, token) => {
  try {
    let response = await fetch(`${baseUrl}/post/${postId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token.t,
      },
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export {
  create,
  listNewsFeed,
  comment,
  getComments,
  deleteComment,
  removePost,
};
