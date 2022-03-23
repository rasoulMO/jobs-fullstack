import {useQuery} from "react-query";

const Projects = () => {
	const {data, isLoading, error} = useQuery("projects", () =>
		fetch("http://localhost:8080/projects/").then((res) => res.json())
	);

	if (isLoading) {
		return <div>Loading...</div>;
	}
	if (error) {
		return <div>Error!</div>;
	}

	console.table(data);
	return (
		<div>
			<h1>Projects</h1>

			<pre>{JSON.stringify(data, null, 2)}</pre>
		</div>
	);
};

export default Projects;
