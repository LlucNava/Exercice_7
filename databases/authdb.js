const authUsers = [
    { "username": "jk", "password": "Sala", rateLimiting: { window: 0, requestCounter: 0}},
    { "username": "pl", "password": "pass", rateLimiting: { window: 0, requestCounter: 0}},
  ]

export const getAuthUser = (username) => authUsers.find(u => u.username === username)

//export const userNameExist = (username) => !!authUsers.find(u => u.username === username)
export const userNameExist = (username) => authUsers.some(u => u.username === username)
