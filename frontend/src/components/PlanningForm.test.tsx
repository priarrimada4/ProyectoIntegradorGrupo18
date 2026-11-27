// @vitest-environment jsdom

import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";
import PlanningForm from "./PlanningForm";

afterEach(cleanup);

describe("Formulario de planificación", () => {
  it("muestra errores cuando los campos obligatorios están vacíos", async () => {
    const onSave = vi.fn();
    const user = userEvent.setup();

    render(<PlanningForm onSave={onSave} />);

    await user.click(
      screen.getByRole("button", { name: "Crear planificación" })
    );

    expect(
      screen.getByText("El título es obligatorio")
    ).toBeInTheDocument();

    expect(onSave).not.toHaveBeenCalled();
  });

  it("permite crear una planificación con datos válidos", async () => {
    const onSave = vi.fn();
    const user = userEvent.setup();

    render(<PlanningForm onSave={onSave} />);

    await user.type(
      screen.getByLabelText("Título"),
      "Vacaciones"
    );

    await user.type(
      screen.getByLabelText("Descripción"),
      "Organizar viaje"
    );

    await user.selectOptions(
      screen.getByLabelText("Categoría"),
      "travel"
    );

    await user.type(
      screen.getByLabelText("Ubicación"),
      "Brasil"
    );

    await user.type(
      screen.getByLabelText("Fecha objetivo"),
      "2027-01-15"
    );

    await user.click(
      screen.getByRole("button", { name: "Crear planificación" })
    );

    expect(onSave).toHaveBeenCalledTimes(1);

    expect(onSave).toHaveBeenCalledWith({
      title: "Vacaciones",
      description: "Organizar viaje",
      category: "travel",
      location: "Brasil",
      targetDate: "2027-01-15"
    });
  });

  it("muestra los datos existentes al editar una planificación", () => {
    render(
      <PlanningForm
        onSave={vi.fn()}
        initialPlanning={{
          title: "Vacaciones",
          description: "Organizar viaje",
          category: "travel",
          location: "Brasil",
          targetDate: "2027-01-15"
        }}
      />
    );

    expect(screen.getByLabelText("Título"))
      .toHaveValue("Vacaciones");

    expect(screen.getByLabelText("Categoría"))
      .toHaveValue("travel");

    expect(
      screen.getByRole("button", { name: "Guardar cambios" })
    ).toBeInTheDocument();
  });
});