import React from 'react';
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';

const ErrorPage = () => {
	const history = useHistory();
	const handleOnClick = () => {
		history.push('/');
	};

 return (
	 	<>
			<h2>Szukana strona nie istnieje.</h2>
			<Button onClick={handleOnClick}>Powrót do strony głównej</Button>
		</>
 );
};
 
export default ErrorPage;