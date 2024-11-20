/**
 * Envía la petición al backend y devuelve los datos
 */
import axios from "axios";

const tasksApi = axios.create({
  baseURL: "http://localhost:8000/tasks/api/v1/tasks",
});

/* export const getAllTasks = () => {
  // return axios.get("http://localhost:8000/tasks/api/v1/tasks")
  return tasksApi.get("/"); // Para abreviar si hemos creado una BaseURL
};

export const createTask = (task) => {
  return tasksApi.post("/", task);
}; */

// Refactored for concision:

export const getAllTasks = () => tasksApi.get("/");

export const createTask = (task) => tasksApi.post("/", task);

export const deleteTask = (id) => tasksApi.delete(`/${id}/`);

export const updateTask = (id, task) => tasksApi.put(`/${id}/`, task); // Id de la tarea a actualizar y la tarea con los nuevos campos

export const getTask = (id) => tasksApi.get(`/${id}`);
