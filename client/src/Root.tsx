import React from "react";
import {Routes, Route} from "react-router-dom";
import "./Root.css";

// pages
const Home = React.lazy(() => import("./pages/Home"));

const Projects = React.lazy(() => import("./pages/Projects"));
const Jobs = React.lazy(() => import("./pages/Jobs"));

function Root() {
	return (
		<div className='App'>
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
