import fs from 'fs/promises';
import path from 'path';
import generateId from '../utils/generateId.js';

const __dirname = path.resolve();
const filePath = path.join(__dirname, 'data', 'users.json');

class UserManager {
  async read() {
    try {
      const data = await fs.readFile(filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  async write(data) {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  }

  async create(user) {
    const users = await this.read();
    const newUser = {
      _id: generateId(),
      name: user.name,
      email: user.email
    };
    users.push(newUser);
    await this.write(users);
    return newUser;
  }

  async readOne(id) {
    const users = await this.read();
    return users.find(u => u._id === id);
  }

  async update(id, data) {
    const users = await this.read();
    const index = users.findIndex(u => u._id === id);
    if (index === -1) return null;
    users[index] = { ...users[index], ...data };
    await this.write(users);
    return users[index];
  }

  async destroy(id) {
    const users = await this.read();
    const filtered = users.filter(u => u._id !== id);
    if (users.length === filtered.length) return null;
    await this.write(filtered);
    return id;
  }
}

export default UserManager;
