export const apiRoute = {
  /* Authentication */
  signin: "/auth/signin",
  signup: "/auth/signup",
  logout: (token: string) => `/auth/logout/${token}`,
  token: (token: string) => `/user/${token}`,

  /* E-mail */
  receiveMembership: "/send/receive-membership",
  sendMembership: `/send/send-membership`,
  checkToken: (token: string) => `/send/${token}`,

  /* User */
  user: "/user", // get
  client: "/user/client",
  employee: "/user/employee",
  idUser: (id: string) => `/user/${id}`,
  idClient: (id: string) => `/user/client/${id}`, // delete and update
  idEmployee: (id: string) => `/user/employee/${id}`,
};
