import { createAction } from "@reduxjs/toolkit";
import { TRIGGER_INITIALIZE } from "./app.types";

export const initializeApplication = createAction(TRIGGER_INITIALIZE);
