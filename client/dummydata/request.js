const SERVER_URL = "";
const token = "";

/* AUTH */
export const signUp = async (payload) => {
  const data = await fetch(`${SERVER_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: payload,
  }).then((res) => res.json());

  return data;
};

export const login = async (payload) => {
  const data = await fetch(`${SERVER_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: payload,
  }).then((res) => res.json());

  return data;
};

export const updateAccount = async (payload) => {
  const data = await fetch(`${SERVER_URL}/auth/${payload.userId}/edit`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: payload,
  }).then((res) => res.json());

  return data;
};

/* PICTURE */
export const createPicture = async (payload) => {
  const data = await fetch(`${SERVER_URL}/pictures`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: payload,
  }).then((res) => res.json());

  return data;
};

export const reactPicture = async (payload) => {
  const data = await fetch(
    `${SERVER_URL}/pictures/${payload.pictureID}/react`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: payload,
    }
  ).then((res) => res.json());

  return data;
};

export const updatePictureDescribtion = async (payload) => {
  const data = await fetch(
    `${SERVER_URL}/pictures/${payload.pictureID}/editDescribtion`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: payload,
    }
  ).then((res) => res.json());

  return data;
};

export const commentPicture = async (payload) => {
  const data = await fetch(
    `${SERVER_URL}/pictures/${payload.pictureID}/commentPicture`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: payload,
    }
  ).then((res) => res.json());

  return data;
};

export const deletePicture = async (payload) => {
  const data = await fetch(
    `${SERVER_URL}/pictures/${payload.pictureID}/remove`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};

/* USER */
export const getUserPictures = async (payload) => {
  const data = await fetch(`${SERVER_URL}/user/${payload.userId}/pictures`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

  return data;
};

export const getUserFriends = async (payload) => {
  const data = await fetch(`${SERVER_URL}/user/${payload.userId}/friends`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

  return data;
};

export const getMessages = async (payload) => {
  const data = await fetch(`${SERVER_URL}/user/${payload.userId}/messages`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

  return data;
};

export const sendFriendRequest = async (payload) => {
  const data = await fetch(
    `${SERVER_URL}/user/${payload.userId}/${payload.friendId}/sendFriendRequest`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  ).then((res) => res.json());

  return data;
};

export const acceptFriendRequest = async (payload) => {
  const data = await fetch(
    `${SERVER_URL}/user/${payload.userId}/${payload.friendId}/acceptFriendRequest`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  ).then((res) => res.json());

  return data;
};

export const removeFriend = async (payload) => {
  const data = await fetch(
    `${SERVER_URL}/user/${payload.userId}/${payload.friendId}/removeFriend`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  ).then((res) => res.json());

  return data;
};

export const blockOrUnblock = async (payload) => {
  const data = await fetch(
    `${SERVER_URL}/user/${payload.userId}/${payload.otherId}/blockOrUnblock`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  ).then((res) => res.json());

  return data;
};

export const updateUserProfile = async (payload) => {
  const data = await fetch(
    `${SERVER_URL}/user/${payload.userId}/updateUserProfile`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: payload,
    }
  ).then((res) => res.json());

  return data;
};

export const deleteUser = async (payload) => {
  const data = await fetch(`${SERVER_URL}/user/${payload.userId}/remove`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

  return data;
};
