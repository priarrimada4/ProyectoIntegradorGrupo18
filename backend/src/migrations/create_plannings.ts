import type { MigrationBuilder } from "node-pg-migrate";

export const up = (pgm: MigrationBuilder): void => {
  pgm.createTable("plannings", {
    id: {
      type: "id",
    },
    title: {
      type: "varchar(150)",
      notNull: true,
    },
    description: {
      type: "text",
      notNull: true,
    },
    category: {
      type: "varchar(20)",
      notNull: true,
    },
    location: {
      type: "varchar(150)",
      notNull: true,
    },
    target_date: {
      type: "timestamp with time zone",
      notNull: true,
    },
    estimated_budget: {
      type: "numeric(12,2)",
      notNull: false,
    },
  });

  pgm.addConstraint("plannings", "valid_planning_category", {
    check:
      "category IN ('home', 'travel', 'study', 'personal', 'family', 'other')",
  });

  pgm.addConstraint("plannings", "valid_estimated_budget", {
    check: "estimated_budget IS NULL OR estimated_budget >= 0",
  });
};

export const down = (pgm: MigrationBuilder): void => {
  pgm.dropTable("plannings");
};
