import axios from 'axios';
import { Todo, CreateTodoRequest, UpdateTodoRequest } from '../types/Todo';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API service class
export class TodoService {
  // Health check
  static async healthCheck(): Promise<any> {
    const response = await api.get('/health');
    return response.data;
  }

  // Get welcome message
  static async getWelcome(): Promise<any> {
    const response = await api.get('/welcome');
    return response.data;
  }

  // Get all todos
  static async getAllTodos(): Promise<Todo[]> {
    const response = await api.get('/todos');
    return response.data;
  }

  // Get todo by ID
  static async getTodoById(id: number): Promise<Todo> {
    const response = await api.get(`/todos/${id}`);
    return response.data;
  }

  // Create new todo
  static async createTodo(todo: CreateTodoRequest): Promise<Todo> {
    const response = await api.post('/todos', todo);
    return response.data;
  }

  // Update todo
  static async updateTodo(id: number, todo: UpdateTodoRequest): Promise<Todo> {
    const response = await api.put(`/todos/${id}`, todo);
    return response.data;
  }

  // Delete todo
  static async deleteTodo(id: number): Promise<void> {
    await api.delete(`/todos/${id}`);
  }

  // Delete all todos
  static async deleteAllTodos(): Promise<void> {
    await api.delete('/todos');
  }

  // Get completed todos
  static async getCompletedTodos(): Promise<Todo[]> {
    const response = await api.get('/todos/completed');
    return response.data;
  }

  // Get pending todos
  static async getPendingTodos(): Promise<Todo[]> {
    const response = await api.get('/todos/pending');
    return response.data;
  }

  // Search todos
  static async searchTodos(keyword: string): Promise<Todo[]> {
    const response = await api.get(`/todos/search?keyword=${encodeURIComponent(keyword)}`);
    return response.data;
  }
}

export default api;