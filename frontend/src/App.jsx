import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/index";
import AdminContext from "./context/adminContext";
function App() {
    return (
        <>
            <AdminContext>
                <RouterProvider router={router} />
            </AdminContext>
        </>
    );
}
export default App;
