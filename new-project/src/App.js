import LittleMap from './Plugins/Content/LittleMap'
import Dashboard from './Plugins/Content/DashBoard'
import Contact from './Plugins/Content/Contact'
import Controllers from './Controllers'
import LoginPage from './Plugins/Content/LoginPage'
import ThreeDMap from './Plugins/3D_Map/ThreeDMap'
import { Route, Switch } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <div className="App">
        <Controllers />
        <Switch>
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
          <Route exact path="/3dmap">
            <ThreeDMap />
          </Route>
          <Route exact path="/map">
            <LittleMap />
          </Route>
          <Route exact path="/contact">
            <Contact />
          </Route>
          <Route exact path="/login">
            <LoginPage />
          </Route>
        </Switch>
    </div>
  )
}

export default App
