import {
  Redirect,
  Route,
  Switch,
} from 'react-router-dom/cjs/react-router-dom.min'
import Courses from './Components/Courses'
import CourseDetails from './Components/CourseDetails'
import NotFound from './Components/NotFound'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/" component={Courses} />
    <Route exact path="/courses/:id" component={CourseDetails} />
    <Route exact path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)
export default App
