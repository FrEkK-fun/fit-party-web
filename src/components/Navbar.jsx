import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
	const { logout } = useLogout();
	const { user } = useAuthContext();

	const handleClick = () => {
		logout();
	};

	return (
		<header>
			<div className="mainNavWrapper">
				<Link to="/">
					<h1>FrEkK Fit Party!</h1>
				</Link>
				<nav>
					{user && (
						<ul className="mainNavUl">
							<div className="mainNav">
								<li>
									<Link to="/">Home</Link>
								</li>
								<li>
									<Link to="/players">Players</Link>
								</li>
								<li>
									<Link to="/blog">Blog</Link>
								</li>
								<li>
									<Link to="/rules">Rules</Link>
								</li>
							</div>
							<div className="divider"></div>
							<div className="flex flex--center">
								{user.players && (
									<li>
										<Link to={`/players/${user.players[0]}`}>{user.email}</Link>
									</li>
								)}
								<li>
									<button onClick={handleClick}>Log out</button>
								</li>
							</div>
						</ul>
					)}
					{!user && (
						<ul className="flex">
							<li>
								<Link to="/signup">Signup</Link>
							</li>
							<li>
								<Link to="/login">Login</Link>
							</li>
						</ul>
					)}
				</nav>
			</div>
		</header>
	);
};

export default Navbar;
