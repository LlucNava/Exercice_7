var users = [
    {
      "id": 1,
      "forename": "Roy",
      "surname": "Fielding"
    },
    {
      "id": 2,
      "forename": "Tim",
      "surname": "Berners-Lee"
    }
  ]

export function getUsers () {
    // replace with actual database query
    return users
}

export function getUserById ( id ) {
  // replace with actual database query
  return users.find(item => item.id === id)
}

export function createUser( newData ) {
    // find next id (auto-increment simulation)
    const nextId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1
  
    const newId = { id: nextId }
    const newUser = { ...newId, ...newData }
  
    // "insert" to simulated database
    users.push( newUser )
  
    // return the new user (like an INSERT returning its row)
    return newUser
  }

export function updateUser(id, data) {
  const user = getUserById(id);
  // If no user exists → create one
  if (!user) {
    users.push({ id, ...data });
    return true;  // user was created
  }

  // Update existing user
  Object.assign(user, data);
  return false;  // user was updated
}