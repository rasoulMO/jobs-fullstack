import {useQuery} from "react-query";
import {Routes, Route, Link} from "react-router-dom";
import "./App.css";

function Root(): React.ReactElement {
	const {isLoading, error, data}: any = useQuery("repoData", () =>
		fetch("http://localhost:3000/projects/").then((res) => res.json())
	);

	// if (isLoading) return "Loading...";

	// if (error) return "An error has occurred: " + error.message;

	// console.log(data);

	return (
		<div className='App'>
			<h1>Hello there 👋</h1>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='about' element={<About />} />
			</Routes>
		</div>
	);
}

function Home() {
	return (
		<>
			<main>
				<h2>Welcome to the homepage!</h2>
				<p>You can do this, I believe in you.</p>
			</main>
			<nav>
				<Link to='/about'>About</Link>
			</nav>
		</>
	);
}

function About() {
	return (
		<>
			<main>
				<h2>Who are we?</h2>
				<p>That feels like an existential question, don't you think?</p>
			</main>
			<nav>
				<Link to='/'>Home</Link>
			</nav>
		</>
	);
}

export default Root;
