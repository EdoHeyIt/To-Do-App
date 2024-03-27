const apiUrl = 'http://localhost:3000'

export const apiConstant = {
  login: {
    loginUser: `${apiUrl}/authentication/login`
  },
  signup: {
    signupUser: `${apiUrl}/authentication/signup`,
    checkUserName: (username: string) =>
      `${apiUrl}/authentication/check-username/${username}`,
    checkUserEmail: (email: string) =>
      `${apiUrl}/authentication/check-email/${email}`
  },
  tasks: {
    createTask: (userId: string) => `${apiUrl}/task/${userId}`,
    deleteTask: (userId: string, taskId: string) =>
      `${apiUrl}/task/${userId}/${taskId}/delete`,
    updateTask: (userId: string, taskId: string) =>
      `${apiUrl}/task/${userId}/${taskId}/update`,
    toggleStatus: (userId: string, taskId: string) =>
      `${apiUrl}/task/${userId}/${taskId}/toggle-status`,
    getTasks: (userId: string) => `${apiUrl}/task/${userId}`
  }
}
