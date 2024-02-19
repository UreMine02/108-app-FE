import { axiosInstance } from "./const"

// login
export async function login(username, password) {
    try {
      const res = await axiosInstance.post(`/notes/login`, {
        username,
        password,
      })
      return {
        success: true,
        data: res.data.data,
      }
    } catch (error) {
      return {
        success: false,
      }
    }
}
// register
export async function register(email, password, username) {
    try {
      const res = await axiosInstance.post(`/notes/register`, {
        email,
        password,
        username,
      })
      return {
        success: true,
        data: res.data.data,
      }
    } catch (error) {
      return {
        success: false,
      }
    }
}
// get all notes
export async function getAllNotes() {
    try {
      const res = await axiosInstance.get(`/notes`)
      return {
        success: true,
        data: res.data.data,
      }
    } catch (error) {
      return {
        success: false,
      }
    }
}

// get note by id
export async function getNoteById(id) {
    try {
      const res = await axiosInstance.get(`/notes/${id}`)
      return {
        success: true,
        data: res.data.data,
      }
    } catch (error) {
      return {
        success: false,
      }
    }
}

// update note
export async function updateNote(id, title, content) {
    try {
      const res = await axiosInstance.put(`/notes/${id}`, {
        title,
        content,
      })
      return {
        success: true,
        data: res.data.data,
      }
    } catch (error) {
      return {
        success: false,
      }
    }
}

// delete note
export async function deleteNote(id) {
    try {
      const res = await axiosInstance.delete(`/notes/${id}`)
      return {
        success: true,
        data: res.data.data,
      }
    } catch (error) {
      return {
        success: false,
      }
    }
}
