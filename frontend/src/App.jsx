import { MainRouter } from "./routers/MainRouter";
import io from "socket.io-client";
export const socket = io(import.meta.env.VITE_BASE_URL);

function App() {
  return <MainRouter/>
}

export default App
