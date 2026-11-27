import { useState } from "react";
import PlanningForm from "./components/PlanningForm";
import type { Planning } from "./types/planning";
import "./App.css";

function App() {
  const [plannings, setPlannings] = useState<Planning[]>([]);

  function handleSave(planning: Planning) {
    setPlannings((previous) => [...previous, planning]);
  }

  return (
    <main>
      <header>
        <h1>Tyta</h1>
        <p>Tranqui, yo te aviso.</p>
      </header>

      <PlanningForm onSave={handleSave} />

      <section>
        <h2>Mis planificaciones</h2>

        {plannings.length === 0 ? (
          <p>Todavía no tenés planificaciones.</p>
        ) : (
          plannings.map((planning, index) => (
            <article key={index}>
              <h3>{planning.title}</h3>
              <p>{planning.description}</p>
              <p>Categoría: {planning.category}</p>
              <p>Ubicación: {planning.location}</p>
              <p>Fecha: {planning.targetDate}</p>
              <p>
                Presupuesto: {planning.estimatedBudget !== undefined
                  ? `$${planning.estimatedBudget.toLocaleString("es-AR")}`
                  : "Sin definir"}
              </p>
            </article>
          ))
        )}
      </section>
    </main>
  );
}

export default App;