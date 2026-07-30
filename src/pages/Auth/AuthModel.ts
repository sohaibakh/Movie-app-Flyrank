import {
  registerUser,
  loginUser,
  logoutUser,
} from '../../services/authService'
import type { User } from 'firebase/auth'

export class AuthModel {
  async register(email: string, password: string): Promise<User> {
    const cleaned = email.trim().toLowerCase()

    if (!cleaned || !password) {
      throw new Error('Email and password are required')
    }

    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters')
    }

    return registerUser(cleaned, password)
  }

  async login(email: string, password: string): Promise<User> {
    const cleaned = email.trim().toLowerCase()

    if (!cleaned || !password) {
      throw new Error('Email and password are required')
    }

    return loginUser(cleaned, password)
  }

  async logout(): Promise<void> {
    return logoutUser()
  }
}
