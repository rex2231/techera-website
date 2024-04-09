import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'

const apiStatusConstrains = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
  success: 'SUCCESS',
}

class Courses extends Component {
  state = {coursesData: [], apiStatus: apiStatusConstrains.initial}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({apiStatus: apiStatusConstrains.inProgress})
    const url = 'https://apis.ccbp.in/te/courses'
    const response = await fetch(url)
    const data = await response.json()
    if (response.ok) {
      const updatedData = data.courses.map(course => ({
        id: course.id,
        name: course.name,
        logoUrl: course.logo_url,
      }))
      this.setState({
        coursesData: updatedData,
        apiStatus: apiStatusConstrains.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstrains.failure})
    }
  }

  coursesPage = () => {
    const {apiStatus, coursesData} = this.state
    switch (apiStatus) {
      case apiStatusConstrains.success:
        return (
          <div className="course-page-container">
            <h1>Courses</h1>
            <ul className="courses-container">
              {coursesData.map(course => (
                <Link to={`/courses/${course.id}`} key={course.id}>
                  <li type="button" className="course-container">
                    <img
                      className="course-logo"
                      src={course.logoUrl}
                      alt={course.name}
                    />
                    <p className="course-name">{course.name}</p>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        )
      case apiStatusConstrains.failure:
        return (
          <div className="failure-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
              alt="failure view"
            />
            <h1 className="failure-heading">Oops! Something Went Wrong</h1>
            <p className="failure-description">
              We cannot seem to find the page you are looking for.
            </p>
            <button
              className="retry-button"
              onClick={this.getData}
              type="button"
            >
              Retry
            </button>
          </div>
        )
      case apiStatusConstrains.inProgress:
        return (
          <div className="loading-container" data-testid="loader">
            <Loader type="ThreeDots" color="#007bff" height={50} width={50} />
          </div>
        )
      default:
        return null
    }
  }

  render() {
    return (
      <div className="page-container">
        <Header />
        {this.coursesPage()}
      </div>
    )
  }
}

export default Courses
