import { useState } from "react";
import type { Planning } from "../types/planning";

interface PlanningCalendarProps {
  plannings: Planning[];
}

function PlanningCalendar({ plannings }: PlanningCalendarProps) {
  const [currentDate, setCurrentDate] = useState(() => new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  function changeMonth(amount: number) {
    setCurrentDate(new Date(year, month + amount, 1));
  }

  return (
    <section className="calendar">
      <h2>Próximos planes</h2>

      <div className="calendar-header">
        <button onClick={() => changeMonth(-1)}>
          Anterior
        </button>

        <strong>
          {currentDate.toLocaleDateString("es-AR", {
            month: "long"
          }).toUpperCase()} {year}
        </strong>

        <button onClick={() => changeMonth(1)}>
          Siguiente
        </button>
      </div>

      <div className="calendar-grid">
        {["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"].map(
          (day) => (
            <strong key={day}>{day}</strong>
          )
        )}

        {Array.from({ length: firstDay }, (_, index) => (
          <div key={`empty-${index}`} />
        ))}

        {Array.from({ length: daysInMonth }, (_, index) => {
          const day = index + 1;

          const date = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

          const dailyPlannings = plannings.filter(
            (planning) => planning.targetDate === date
          );

          return (
            <div key={date} className="calendar-day">
              <strong>{day}</strong>

              {dailyPlannings.map((planning, index) => (
                <span className="calendar-event" key={index}>
                  {planning.title}
                </span>
              ))}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default PlanningCalendar;