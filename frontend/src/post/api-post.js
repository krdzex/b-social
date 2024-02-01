import baseUrl from "../config";

const create = async (jwtToken, post) => {
  try {
    return fetch(`${baseUrl}/posts`, {
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

const listNewsFeed = async (userId, jwtToken, page, take) => {
  try {
    let response = await fetch(`${baseUrl}/posts/feed/${userId}?page=${page}&take=${take}`, {
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

const comment = async (jwtToken, postId, comment) => {
  try {
    let response = await fetch(`${baseUrl}/posts/${postId}/comments`, {
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
    let response = await fetch(`${baseUrl}/posts/${postId}/comments`, {
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

const removePost = async (postId, jwtToken) => {
  try {
    let response = await fetch(`${baseUrl}/posts/${postId}`, {
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

export {
  create,
  listNewsFeed,
  comment,
  getComments,
  deleteComment,
  removePost,
};
