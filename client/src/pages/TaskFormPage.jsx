import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { createTask, deleteTask, updateTask, getTask } from "../api/tasks.api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

export function TaskFormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const navigate = useNavigate(); // Para redireccionar
  const params = useParams(); // Guardamos los parámetros de la URL
  // console.log(params);

  const onSubmit = handleSubmit(async (data) => {
    // console.log(data);
    /*     const response = await createTask(data);
    console.log("Tarea creada: " + response);
    navigate("/tasks"); // Redireccionamos tras crear una tarea */
    // Elegimos si actualizar o crear
    if (params.id) {
      console.log("Actualizando datos");
      await updateTask(params.id, data);
      toast.success("Task updated successfully", {
        position: "bottom-right",
        style: {
          background: "#101010",
          color: "white",
        },
      });
    } else {
      await createTask(data);
      toast.success("Task created successfully", {
        position: "bottom-right",
        style: {
          background: "#101010",
          color: "white",
        },
      });
    }
    navigate("/tasks");
  });

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        console.log("Obteniendo datos");
        /* Se refactoriza justo debajo
        const response = await getTask(params.id);
        console.log(response);
        setValue("title", response.data.title); // Ponemos los valores que cogemos de la api ya en los campos del formulario
        setValue("description", response.data.description); */

        /* Se refactoriza justo debajo
        const { data } = await getTask(params.id);
        setValue("title", data.title);
        setValue("description", data.description); */

        const {
          data: { title, description },
        } = await getTask(params.id);
        setValue("title", title);
        setValue("description", description);
      }
    }
    loadTask();
  }, []);
  return (
    <div className="max-w-xl mx-auto">
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Title"
          {...register("title", { required: true })}
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
        />
        {errors.title && <span>Title is required</span>}
        <textarea
          rows="3"
          placeholder="Description"
          {...register("description", { required: true })}
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
        ></textarea>
        {errors.description && <span>Description is required</span>}
        <button className="bg-indigo-500 p-3 rounded-lg block w-full">
          Save
        </button>
      </form>
      {params.id && (
        <div className="flex justify-center">
          <button
            className="bg-red-500 p-3 rounded-lg w-48 mt-3"
            onClick={async () => {
              const accepted = window.confirm(
                "Are you sure you want to delete this task?"
              );
              if (accepted) {
                await deleteTask(params.id);
                toast.success("Task deleted successfully", {
                  position: "bottom-right",
                  style: {
                    background: "#101010",
                    color: "white",
                  },
                });
                navigate("/tasks");
              }
            }}
          >
            Delete
          </button>
        </div>
      )}
      {/* Se muestra el botón solo cuando en la URL se pasa un id */}
    </div>
  );
}
