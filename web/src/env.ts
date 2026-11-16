import { defineEnvVars } from "@sveltejs/kit/env";

export const variables = defineEnvVars({
  DOB: {
    public: true,
    static: true,
    description: "Date of birth (DD-MM-YYYY), used for the age on the home page.",
    schema: (value) => value ?? "",
  },
});
