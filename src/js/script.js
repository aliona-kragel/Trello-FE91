import { loadPage, getUSers } from "./modules/render.js";

window.addEventListener("load", () => {
  getUSers();
});