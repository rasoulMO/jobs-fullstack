import {useQuery} from "react-query";

const Jobs = () => {
	const {data, isLoading, error} = useQuery("projects", () =>
		fetch("http://localhost:8080/jobs/").then((res) => res.json())
	);

	if (isLoading) {
		return <div>Loading...</div>;
	}
	if (error) {
		return <div>Error!</div>;
	}

	console.table(data.jobs);
	return (
		<div>
			<h1>Jobs</h1>

			<pre>{JSON.stringify(data.jobs, null, 2)}</pre>
		</div>
	);
};

export default Jobs;
