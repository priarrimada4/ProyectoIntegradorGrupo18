import type {
  PlanningPersistido,
  PlanningCategory
} from "../types/planning";

interface PlanningListProps {
  plannings: PlanningPersistido[];
  onEdit: (index: number) => void;
  onDelete: (id: number) => void;
  deletingId: number | null;
  isEditing: boolean;
}

const categoryLabels: Record<PlanningCategory, string> = {
  home: "Hogar",
  travel: "Viajes",
  study: "Estudios",
  personal: "Personal",
  family: "Familia",
  other: "Otros"
};

function PlanningList({
  plannings,
  onEdit,
  onDelete,
  deletingId,
  isEditing
}: PlanningListProps) {
  return (
    <section>
      <h2>Mis planificaciones ({plannings.length})</h2>

      {plannings.length === 0 ? (
        <p>Todavía no tenés planificaciones.</p>
      ) : (
        plannings.map((planning, index) => (
          <article key={planning.id}>
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

            <div className="planning-actions">
              <button
                type="button"
                disabled={deletingId !== null}
                onClick={() => onEdit(index)}
              >
                Editar
              </button>

              <button
                type="button"
                className="delete-button"
                disabled={deletingId !== null || isEditing}
                onClick={() => onDelete(planning.id)}
              >
                {deletingId === planning.id
                  ? "Eliminando..."
                  : "Eliminar"}
              </button>
            </div>
          </article>
        ))
      )}
    </section>
  );
}

export default PlanningList;