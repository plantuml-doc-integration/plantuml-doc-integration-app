import axios from 'axios';
export default async function redirectToAuthUrl() {
	let success = true;
	try {
		const response = await axios.get(`/auth/new`);
		if (response.status === 200) {
			window.location.href = response.data.authUrl;
		} else {
			success = false;
		}
	} catch (err) {
		console.log(err);
		success = false;
	}
	return success;
}
