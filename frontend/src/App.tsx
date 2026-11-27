import { useEffect, useState } from "react";
import PlanningForm from "./components/PlanningForm";
import PlanningList from "./components/PlanningList";
import PlanningCalendar from "./components/PlanningCalendar";
import type { Planning, PlanningPersistido } from "./types/planning";
import {
  getPlannings,
  createPlanning,
  updatePlanning
} from "./services/planningApi";
import "./App.css";

function App() {
  const [plannings, setPlannings] = useState<PlanningPersistido[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getPlannings()
      .then(setPlannings)
      .catch(() => {
        setError("No se pudieron cargar las planificaciones.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  async function handleSave(planning: Planning) {
    if (editingIndex !== null) {
      const currentPlanning = plannings[editingIndex];

      const updated = await updatePlanning(
        currentPlanning.id,
        planning
      );

      setPlannings((previous) =>
        previous.map((item) =>
          item.id === updated.id ? updated : item
        )
      );

      setEditingIndex(null);
    } else {
      const created = await createPlanning(planning);

      setPlannings((previous) => [...previous, created]);
    }
  }

  return (
    <main>
      <header>
        <h1>Tyta</h1>
        <p>Tranqui, yo te aviso.</p>
      </header>

      <div>
        <PlanningForm
          key={editingIndex ?? "new"}
          onSave={handleSave}
          initialPlanning={
            editingIndex !== null
              ? plannings[editingIndex]
              : undefined
          }
        />

        {editingIndex !== null && (
          <button
            type="button"
            className="cancel-button"
            onClick={() => setEditingIndex(null)}
          >
            Cancelar edición
          </button>
        )}
      </div>

      <div>
        {loading ? (
          <p>Cargando planificaciones...</p>
        ) : error ? (
          <p role="alert">{error}</p>
        ) : (
          <PlanningList
            plannings={plannings}
            onEdit={setEditingIndex}
          />
        )}
      </div>

      <PlanningCalendar plannings={plannings} />
    </main>
  );
}

export default App;