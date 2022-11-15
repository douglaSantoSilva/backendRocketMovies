const { UserCreateService } = require("./UserCreateService")
const { UserRepositoryInMemory } = require("../repositories/UserRepositoryInMemory")
const { AppErrors } = require("../utils/AppErrors")

describe("UserCreateService", () => {

  let userRepositoryInMemory = null
  let userCreateService = null

  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory()
    userCreateService = new UserCreateService(userRepositoryInMemory)
  })

  it("user should be create", async () => {
    const user = {
      name: "user Test",
      password: "123",
      email: "teste@gmail.com"
    }
  
    const userCreated = await userCreateService.execute(user)
    expect(userCreated).toHaveProperty("id")  
  })

  it("user not should be created if email exist", async () => {
  const user1 = {
    name:"User Test 1",
    email: "user@test.com",
    password: "123"
  }

  const user2 = {
  name:"User Test 1",
  email: "user@test.com",
  password: "456"
}
  await userCreateService.execute(user1)
  await expect(userCreateService.execute(user2)).rejects.toEqual(new AppErrors("Este e-mail já está cadastrado.", 401))

  })
})

