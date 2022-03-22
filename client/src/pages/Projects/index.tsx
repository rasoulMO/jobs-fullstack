import {useQuery} from "react-query";

function Projects() {
	const {data, isLoading, error} = useQuery("projects", () =>
		fetch("http://localhost:3000/projects/").then((res) => res.json())
	);

	if (isLoading) {
		return <div>Loading...</div>;
	}
	if (error) {
		return <div>Error!</div>;
	}

	console.log(data);

	return (
		<div>
			<h1>Projects</h1>
		</div>
	);
}

export default Projects;
