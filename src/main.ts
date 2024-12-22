import { Magenta } from "./magenta";

const app_container = document.getElementById('app')
app_container && (new Magenta().appendTo(app_container))