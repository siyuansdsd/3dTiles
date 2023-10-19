import LittleMap from './Plugins/Content/LittleMap'
import Dashboard from './Plugins/Content/DashBoard'
import Contact from './Plugins/Content/Contact'
import Controllers from './Controllers'
import LoginPage from './Plugins/Content/LoginPage'
import SignUp from './Plugins/Content/SignUp'
import ThreeDMap from './Plugins/3D_Map/ThreeDMap'
import { AuthContext } from './Context'
import { useContext } from 'react'
import { Route, Switch } from 'react-router-dom'
import './App.css'

function App() {
  const AuthC = useContext(AuthContext)
  const {Auth, setAuth} = AuthC
  return (
    <>
    { Auth && (
    <div className="App">
        <Controllers />
        <Switch>
          <Route exact path="/">
            <Dashboard />
          </Route>
          <Route exact path="/threemap">
            <ThreeDMap />
          </Route>
          <Route exact path="/map">
            <LittleMap />
          </Route>
          <Route exact path="/contact">
            <Contact />
          </Route>
        </Switch>
    </div>
  )}
  {
    !Auth && (
      <div className="App">
        <Controllers />
        <Switch>
          <Route exact path="/">
            <LoginPage />
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
          </Switch>
      </div>
    )
  }
  </>
  )
}

export default App
