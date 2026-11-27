import { useState } from "react";
import PlanningForm from "./components/PlanningForm";
import PlanningList from "./components/PlanningList";
import type { Planning } from "./types/planning";
import "./App.css";

function App() {
  const [plannings, setPlannings] = useState<Planning[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  function handleSave(planning: Planning) {
    if (editingIndex !== null) {
      setPlannings((previous) =>
        previous.map((item, index) =>
          index === editingIndex ? planning : item
        )
      );

      setEditingIndex(null);
    } else {
      setPlannings((previous) => [...previous, planning]);
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

      <PlanningList
        plannings={plannings}
        onEdit={setEditingIndex}
      />
    </main>
  );
}

export default App;