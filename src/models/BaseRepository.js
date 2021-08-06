export class BaseRepository {
  async all(...args) {
    throw args
  }

  async create(...args){
    return { ...args } 
  }

  async update(id, data) {
    throw { id, data }
  }

  async delete(...args) {
    return
  }
}
