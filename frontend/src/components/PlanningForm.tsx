import { useState } from "react";
import type { FormEvent } from "react";
import type { Planning, PlanningCategory } from "../types/planning";
import { validatePlanning } from "../utils/validatePlanning";

interface PlanningFormProps {
  onSave: (planning: Planning) => void;
  initialPlanning?: Planning;
}

const emptyPlanning: Planning = {
  title: "",
  description: "",
  category: "other",
  location: "",
  targetDate: ""
};

function PlanningForm({
  onSave,
  initialPlanning
}: PlanningFormProps) {
  const [planning, setPlanning] = useState<Planning>(
    initialPlanning ?? emptyPlanning
  );

  const [errors, setErrors] = useState<
    Partial<Record<keyof Planning, string>>
  >({});

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationErrors = validatePlanning(planning);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    onSave(planning);

    if (!initialPlanning) {
      setPlanning(emptyPlanning);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h2>
        {initialPlanning
          ? "Editar planificación"
          : "Nueva planificación"}
      </h2>

      <label htmlFor="title">Título</label>
      <input
        id="title"
        value={planning.title}
        onChange={(e) =>
          setPlanning({ ...planning, title: e.target.value })
        }
      />
      {errors.title && <p role="alert">{errors.title}</p>}

      <label htmlFor="description">Descripción</label>
      <textarea
        id="description"
        value={planning.description}
        onChange={(e) =>
          setPlanning({ ...planning, description: e.target.value })
        }
      />
      {errors.description && <p role="alert">{errors.description}</p>}

      <label htmlFor="category">Categoría</label>
      <select
        id="category"
        value={planning.category}
        onChange={(e) =>
          setPlanning({
            ...planning,
            category: e.target.value as PlanningCategory
          })
        }
      >
        <option value="home">Hogar</option>
        <option value="travel">Viajes</option>
        <option value="study">Estudios</option>
        <option value="personal">Personal</option>
        <option value="family">Familia</option>
        <option value="other">Otros</option>
      </select>
      {errors.category && <p role="alert">{errors.category}</p>}

      <label htmlFor="location">Ubicación</label>
      <input
        id="location"
        value={planning.location}
        onChange={(e) =>
          setPlanning({ ...planning, location: e.target.value })
        }
      />
      {errors.location && <p role="alert">{errors.location}</p>}

      <label htmlFor="targetDate">Fecha objetivo</label>
      <input
        id="targetDate"
        type="date"
        value={planning.targetDate}
        onChange={(e) =>
          setPlanning({ ...planning, targetDate: e.target.value })
        }
      />
      {errors.targetDate && <p role="alert">{errors.targetDate}</p>}

      <label htmlFor="estimatedBudget">
        Presupuesto estimado (opcional)
      </label>
      <input
        id="estimatedBudget"
        type="number"
        min="0"
        step="any"
        value={planning.estimatedBudget ?? ""}
        onChange={(e) => {
          const { estimatedBudget: _estimatedBudget, ...rest } = planning;

          setPlanning(
            e.target.value === ""
              ? rest
              : {
                  ...rest,
                  estimatedBudget: e.target.valueAsNumber
                }
          );
        }}
      />
      {errors.estimatedBudget && (
        <p role="alert">{errors.estimatedBudget}</p>
      )}

      <button type="submit">
        {initialPlanning ? "Guardar cambios" : "Crear planificación"}
      </button>
    </form>
  );
}

export default PlanningForm;