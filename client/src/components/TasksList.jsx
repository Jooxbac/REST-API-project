import { useEffect, useState } from "react";
import { getAllTasks } from "../api/tasks.api";
import { TaskCard } from "./TaskCard";

export function TasksList() {
  /* Para cargar tareas una vez hemos llamado a la api */
  const [tasks, setTasks] = useState(
    []
  ); /* Beware! Specify an empty array as the useState argument */

  /* useEffect se ejecuta al cargar la página */
  useEffect(() => {
    console.log("Página cargada");

    /* Esto se ejecuta de forma asíncrona, tenemos que añadir await y async */
    async function loadTasks() {
      const response = await getAllTasks();
      /* Para ver que efectivamente obtenemos una respuesta */
      /* console.log(response);
      console.log(response.data); */
      setTasks(response.data);
    }
    loadTasks();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-3">
      {tasks.map((task) => (
        /* id needed to avoid warning message on console */
        <TaskCard task={task} key={task.id} />
      ))}
    </div>
  );
}
