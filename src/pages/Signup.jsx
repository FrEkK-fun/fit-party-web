import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { Link } from "react-router-dom";

const Signup = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { error, isLoading, signup } = useSignup();

	const handleSubmit = async (e) => {
		e.preventDefault();

		await signup(email, password);
	};

	return (
		<main>
			<form className="signup" onSubmit={handleSubmit}>
				<h2>Sign up</h2>
				<label>Email:</label>
				<input
					type="email"
					onChange={(e) => setEmail(e.target.value)}
					value={email}
				/>
				<label>Password:</label>
				<input
					type="password"
					onChange={(e) => setPassword(e.target.value)}
					value={password}
				/>
				<button disabled={isLoading}>Sign up</button>
				{error && <div className="error">{error}</div>}
				<p>
					Have a user?{" "}
					<span>
						<Link to="/login">Log in</Link>
					</span>
				</p>
			</form>
		</main>
	);
};

export default Signup;
