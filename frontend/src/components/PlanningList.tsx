import type { Planning, PlanningCategory } from "../types/planning";

interface PlanningListProps {
  plannings: Planning[];
  onEdit: (index: number) => void;
}

const categoryLabels: Record<PlanningCategory, string> = {
  home: "Hogar",
  travel: "Viajes",
  study: "Estudios",
  personal: "Personal",
  family: "Familia",
  other: "Otros"
};

function PlanningList({ plannings, onEdit }: PlanningListProps) {
  return (
    <section>
      <h2>Mis planificaciones ({plannings.length})</h2>

      {plannings.length === 0 ? (
        <p>Todavía no tenés planificaciones.</p>
      ) : (
        plannings.map((planning, index) => (
          <article key={index}>
            <span className="category-label">
              {categoryLabels[planning.category]}
            </span>

            <h3>{planning.title}</h3>
            <p>{planning.description}</p>
            <p>Ubicación: {planning.location}</p>
            <p>
              Fecha: {planning.targetDate.split("-").reverse().join("/")}
            </p>
            <p>
              Presupuesto: {planning.estimatedBudget !== undefined
                ? `$${planning.estimatedBudget.toLocaleString("es-AR")}`
                : "Sin definir"}
            </p>

            <button
              type="button"
              onClick={() => onEdit(index)}
            >
              Editar
            </button>
          </article>
        ))
      )}
    </section>
  );
}

export default PlanningList;