import axios from 'axios';


export const getJobs = async () => {
	const response = await axios.get(process.env.REACT_APP_API_URL + '/jobs');
	return response.data;
};