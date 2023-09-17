import LittleMap from './Plugins/Content/LittleMap'
import Dashboard from './Plugins/Content/DashBoard'
import Controllers from './Controllers'
import { Route, Switch } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <div className="App">
        <Controllers />
        <Switch>
          <Route exact path="/map">
            <LittleMap />
          </Route>
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
        </Switch>
    </div>
  )
}

export default App
