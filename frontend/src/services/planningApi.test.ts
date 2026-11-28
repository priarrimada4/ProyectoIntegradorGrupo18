import { describe, it, expect, vi, afterEach } from "vitest";
import {
  getPlannings,
  createPlanning,
  updatePlanning,
  deletePlanning
} from "./planningApi";
import type { Planning } from "../types/planning";

const planning: Planning = {
  title: "Vacaciones",
  description: "Organizar viaje familiar",
  category: "travel",
  location: "Brasil",
  targetDate: "2027-01-15",
  estimatedBudget: 500000
};

const savedPlanning = {
  ...planning,
  id: 1
};

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("Servicio API de planificaciones", () => {
  it("obtiene las planificaciones", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify([savedPlanning]))
    );

    vi.stubGlobal("fetch", fetchMock);

    expect(await getPlannings()).toEqual([savedPlanning]);
    expect(fetchMock).toHaveBeenCalledWith("/plannings");
  });

  it("crea una planificación correctamente", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify(savedPlanning), {
        status: 201
      })
    );

    vi.stubGlobal("fetch", fetchMock);

    expect(await createPlanning(planning)).toEqual(savedPlanning);

    expect(fetchMock).toHaveBeenCalledWith("/plannings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(planning)
    });
  });

  it("actualiza una planificación por su id", async () => {
    const updatedPlanning = {
      ...savedPlanning,
      title: "Vacaciones de verano"
    };

    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify(updatedPlanning))
    );

    vi.stubGlobal("fetch", fetchMock);

    expect(
      await updatePlanning(1, updatedPlanning)
    ).toEqual(updatedPlanning);

    expect(fetchMock).toHaveBeenCalledWith("/plannings/1", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedPlanning)
    });
  });

  it("maneja un error del servidor al crear una planificación", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(null, { status: 500 })
      )
    );

    await expect(createPlanning(planning)).rejects.toThrow(
      "No se pudo crear la planificación"
    );
  });

  it("adapta la fecha recibida del backend", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(
          JSON.stringify([
            {
              ...savedPlanning,
              targetDate: "2027-01-15T00:00:00.000Z"
            }
          ])
        )
      )
    );

    expect(await getPlannings()).toEqual([savedPlanning]);
  });

  it("elimina una planificación por su id", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(null, { status: 204 })
    );

    vi.stubGlobal("fetch", fetchMock);

    await deletePlanning(1);

    expect(fetchMock).toHaveBeenCalledWith("/plannings/1", {
      method: "DELETE"
    });
  });

  it("maneja un error al eliminar una planificación", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(null, { status: 500 })
      )
    );

    await expect(deletePlanning(1)).rejects.toThrow(
      "No se pudo eliminar la planificación"
    );
  });
});