import React, { useEffect } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import ErrorPage from './components/ErrorPage/ErrorPage';
import FormSeats from './components/FormSeats/FormSeats';
import SeatList from './components/Seats/SeatList/SeatList';
import Summary from './components/Summary/Summary';
import { getSeats } from './actions/seats';
import history from './history/history';
import './App.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
		dispatch(getSeats);
	}, [dispatch]);

  return (
    <Router history={history}>
      <div className="App">
        <main className="App-main">
          <Switch>
            <Route path="/" exact component={FormSeats} />
            <Route path="/seats" exact render={() => <SeatList />}/>
            <Route path="/summary" exact render={() => <Summary />}/>
            <Route component={ErrorPage} />
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
