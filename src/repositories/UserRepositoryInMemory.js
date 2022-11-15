class UserRepositoryInMemory {
  users = []

  async create({ email, password, name}) {
    const user = {
      id: Math.floor(Math.random() * 1000) + 1,
      email,
      password,
      name
    }

    this.users.push(user)

    return user
  }

  async findByEmail(email) {
    return this.users.find(user => user.email === email)
  }
}

module.exports = { UserRepositoryInMemory }