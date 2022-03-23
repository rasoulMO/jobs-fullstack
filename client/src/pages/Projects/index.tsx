import {useState} from "react";
import {useQuery} from "react-query";

const Projects = () => {
	const {data, isLoading, error} = useQuery("projects", () =>
		fetch("http://localhost:8080/projects/").then((res) => res.json())
	);
	const [title, setTitle] = useState("");
	const [foundUsers, setFoundUsers] = useState(data.projects);

	const filter = (e: {target: {value: any}}) => {
		const keyword = e.target.value;

		if (keyword !== "") {
			const results = data.projects.filter((project: {title: string}) => {
				return project.title
					.toLowerCase()
					.startsWith(keyword.toLowerCase());
				// Use the toLowerCase() method to make it case-insensitive
			});
			setFoundUsers(results);
		} else {
			setFoundUsers(data.projects);
			// If the text field is empty, show all projects
		}

		setTitle(keyword);
	};

	if (isLoading) {
		return <div>Loading...</div>;
	}
	if (error) {
		return <div>Error!</div>;
	}

	console.table(foundUsers);
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

			<pre>{JSON.stringify(foundUsers, null, 2)}</pre>
		</div>
	);
};

export default Projects;
