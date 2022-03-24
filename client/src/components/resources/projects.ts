import axios from 'axios';


export const getProjects = async () => {
	const response = await axios.get(process.env.REACT_APP_API_URL + '/projects');
	return response.data;
};