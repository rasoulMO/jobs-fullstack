import {Link} from "react-router-dom";

const Home = () => {
	return (
		<>
			<main>
				<nav>
					<ul>
						<li>
							<Link to='/'>Home</Link>
						</li>
						<li>
							<Link to='/projects'>Projects</Link>
						</li>
						<li>
							<Link to='/jobs'>Jobs</Link>
						</li>
					</ul>
				</nav>
				<h1>Hello there 👋</h1>
				<h2>Welcome to the homepage!</h2>
				<p>You can do this, I believe in you.</p>
			</main>
		</>
	);
};
export default Home;
