import { Suspense, lazy } from 'react';
import { Route } from 'react-router-dom';
import Navbar from './components/navbar/navbar';
import { BrowserRouter as Router, Switch,Link } from 'react-router-dom';
import './App.css'


const AddEmployee = lazy(() => import('./components/add_employee/add_employee'));
const EditEmployee = lazy(() => import('./components/edit_employee/edit_employee'));
const ViewEmployee = lazy(() => import('./components/view_employee/view_employee'));

function App() {
  return (
    <Router>
      <Navbar />
      <Suspense fallback={<p>Loading...</p>}>
        <Switch>
          <Route path="/add_employee" component={AddEmployee} />
          <Route path="/edit_employee/:id" component={EditEmployee} />
          <Route path="/" component={ViewEmployee} />
        </Switch>
      </Suspense>
      <button type="button" class="btn btn-dark d-flex align-items-end m-2">
        <Link className="text-white " to={`/`}>
          Back
        </Link>
      </button>
    </Router>
  );
}

export default App;