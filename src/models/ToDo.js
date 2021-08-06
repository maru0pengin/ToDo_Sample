import { baseAPI } from '../api/base'
import { BaseRepository } from './BaseRepository'


export class ToDoRepository extends BaseRepository {
  get baseEndpoint() {
    return 'posts'
  }

  async create(data) {
    try {
      await baseAPI({
        endpoint: this.baseEndpoint,
        method: 'POST',
        body:data
      })      
    } catch (err) {
      return err
    }
  }

  async all() {
    return await baseAPI({
      endpoint: this.baseEndpoint,
    })
  }

  async update(id, data) {
    try {
      await baseAPI({
        endpoint: `${this.baseEndpoint}/${id}`,
        method: 'PATCH',
        body: data,
      })
    } catch(err) {
      return err
    }
  }

  async delete(id) {
    try {
      return await baseAPI({ endpoint: `${this.baseEndpoint}/${id}`, method: 'DELETE' })      
    } catch (err) {
      return err
    }
  }
}