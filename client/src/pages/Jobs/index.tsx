import {useEffect, useState} from "react";
import {useQuery} from "react-query";

const Jobs = () => {
	const {data, isLoading, error} = useQuery("projects", () =>
		fetch("http://localhost:8080/jobs/").then((res) => res.json())
	);
	const [filteredList, setFilteredList] = useState(data.jobs);
	const [selectedStatus, setSelectedStatus] = useState<any>();

	const handleStatusChange = (e: any) => {
		setSelectedStatus(Number(e.target.value));
	};

	const filterByStatus = (filteredData: any[]) => {
		// Avoid filter for empty string
		if (!selectedStatus) {
			return filteredData;
		}

		const filteredJobs = filteredData.filter(
			(job) => job.status_id === selectedStatus
		);
		return filteredJobs;
	};

	useEffect(() => {
		let filteredData = filterByStatus(data.jobs);
		setFilteredList(filteredData);
	}, [selectedStatus]);

	if (isLoading) {
		return <div>Loading...</div>;
	}
	if (error) {
		return <div>Error!</div>;
	}

	console.table(filteredList);

	return (
		<div>
			<h1>Jobs</h1>
			<div>
				<div>Filter by Status :</div>
				<select value={selectedStatus} onChange={handleStatusChange}>
					<option value=''>ALL</option>
					<option value='1'>In preparation</option>
					<option value='2'>In progress</option>
					<option value='3'>Delivered</option>
					<option value='4'>Cancelled</option>
				</select>
			</div>

			<pre>{JSON.stringify(filteredList, null, 2)}</pre>
		</div>
	);
};

export default Jobs;
