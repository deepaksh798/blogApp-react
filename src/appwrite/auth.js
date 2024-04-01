import conf from "../conf.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      await this.account.create(ID.unique(), email, password, name);
      if (userAccount) {
        //call another method
        return this.login("email", "password");
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailSession("email", "password");
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("appwrite :: getCurrentUser :: error ", error);
    }
    return null;
  }

  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      console.log("appwrite :: logout :: error ", error);
    }
  }
}

const authService = new AuthService();

export default authService;

// Here first we create a class
// Then create Account through constructor on the basis of appwrite docs
// And create methods for createAccount, login, getCurrentUser, logout
