import {useEffect, useState} from "react";
import {useQuery} from "react-query";

const Projects = () => {
	const {data, isLoading, error} = useQuery("projects", () =>
		fetch("http://localhost:8080/projects/").then((res) => res.json())
	);

	const projects = data?.projects;
	const [title, setTitle] = useState("");
	const [foundProject, setFoundProject] = useState(projects);

	const filter = (e: {target: {value: any}}) => {
		const keyword = e.target.value;

		if (keyword !== "") {
			const results = projects.filter((project: {title: string}) => {
				return project.title
					.toLowerCase()
					.startsWith(keyword.toLowerCase());
				// Use the toLowerCase() method to make it case-insensitive
			});
			setFoundProject(results);
		} else {
			setFoundProject(projects);
			// If the text field is empty, show all projects
		}

		setTitle(keyword);
	};

	useEffect(() => {
		// If the text field is empty, show all projects
		if (title === "") {
			setFoundProject(projects);
		}
	}, [projects, title]);

	if (isLoading) {
		return <div>Loading...</div>;
	}
	if (error) {
		return <div>Error!</div>;
	}

	console.table(foundProject);
	return (
		<div>
			<h1>Projects</h1>
			<input
				type='search'
				value={title}
				onChange={filter}
				className='input'
				placeholder='Filter'
			/>

			<pre>{JSON.stringify(foundProject, null, 2)}</pre>
		</div>
	);
};

export default Projects;
