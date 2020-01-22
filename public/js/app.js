import "../sass/index.scss";
import { RequestHTTP } from "./asyn/http";
import Ui from "./ui/ui";

const ui = new Ui();
const http = new RequestHTTP();

document.addEventListener("DOMContentLoaded", getBooks);

function getBooks() {
  http
    .get("http://localhost:3000/books")
    .then(data => ui.showBooks(data))
    .catch(error => console.log(error));
}
