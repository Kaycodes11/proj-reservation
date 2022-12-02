import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import {ErrorBoundary} from "react-error-boundary";

// this is the ui
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/hotels" element={<ErrorBoundary fallback={<div>Error Occurred</div>}>
                    <List/>
                </ErrorBoundary>}/>
                <Route path="/hotels/:id" element={<Hotel/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
