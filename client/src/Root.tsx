import React from "react";
import {Routes, Route, Link} from "react-router-dom";

// pages
const Home = React.lazy(() => import("./pages/Home"));
const Projects = React.lazy(() => import("./pages/Projects"));
const Jobs = React.lazy(() => import("./pages/Jobs"));

function Root() {
	return (
		<div className='App'>
			<nav>
				<Link to='/'>Home</Link>
				<br />
				<Link to='/projects'>Projects</Link>
				<br />
				<Link to='/jobs'>Jobs</Link>
			</nav>
			<Routes>
				<Route
					index
					element={
						<React.Suspense fallback={<div>Loading...</div>}>
							<Home />
						</React.Suspense>
					}
				/>
				<Route
					path='/jobs'
					element={
						<React.Suspense fallback={<div>Loading...</div>}>
							<Jobs />
						</React.Suspense>
					}
				/>
				<Route
					path='/projects'
					element={
						<React.Suspense fallback={<div>Loading...</div>}>
							<Projects />
						</React.Suspense>
					}
				/>
			</Routes>
		</div>
	);
}

export default Root;
