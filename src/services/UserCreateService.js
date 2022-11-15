const { hash } = require('bcryptjs')
const { AppErrors } = require("../utils/AppErrors")

class UserCreateService {
  constructor(userRepository) {
    this.userRepository = userRepository
  }

  async execute({name, email, password}) {

    if(!name || !password || !email) {
      throw new AppErrors("O nome, senha e password é obrigatório!")
    }

    const verifyEmailExist = await  this.userRepository.findByEmail(email)

    if(verifyEmailExist) {
      throw new AppErrors("Este e-mail já está cadastrado.", 401)
    }

    const hashedPassword = await hash(password, 8)
    
    const userCreated = await this.userRepository.create({name, email, password:hashedPassword})

    return userCreated
  }

}

module.exports = { UserCreateService }