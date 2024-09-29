import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

/// Pages and components
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import Players from "./pages/Players";
import Player from "./pages/Player";
import Rules from "./pages/Rules";
import Blog from "./pages/Blog";

function App() {
	const { user } = useAuthContext();

	return (
		<div className="App">
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path="/" element={!user ? <Login /> : <Home />} />
					<Route path="/home" element={!user ? <Login /> : <Home />} />
					<Route path="/signup" element={!user ? <Signup /> : <Home />} />
					<Route path="/login" element={!user ? <Login /> : <Home />} />
					<Route path="/players" element={!user ? <Login /> : <Players />} />
					<Route path="/rules" element={!user ? <Login /> : <Rules />} />
					<Route path="/blog" element={!user ? <Login /> : <Blog />} />
					<Route
						path="/players/:playerId"
						element={!user ? <Login /> : <Player />}
					/>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
