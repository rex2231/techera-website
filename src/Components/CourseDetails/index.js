import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'

const apiStatusConstrains = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
  success: 'SUCCESS',
}

class CourseDetails extends Component {
  state = {courseData: [], apiStatus: apiStatusConstrains.initial}

  componentDidMount() {
    this.getCourseData()
  }

  getCourseData = async () => {
    this.setState({apiStatus: apiStatusConstrains.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/te/courses/${id}`
    const response = await fetch(url)
    const data = await response.json()
    if (response.ok) {
      const updatedData = {
        id: data.course_details.id,
        name: data.course_details.name,
        imageUrl: data.course_details.image_url,
        description: data.course_details.description,
      }
      this.setState({
        courseData: updatedData,
        apiStatus: apiStatusConstrains.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstrains.failure})
    }
  }

  coursePage = () => {
    const {apiStatus, courseData} = this.state
    switch (apiStatus) {
      case apiStatusConstrains.success:
        return (
          <div className="course-details-page">
            <div className="course-card">
              <img src={courseData.imageUrl} alt={courseData.name} />
              <div className="course-card-details">
                <h1 className="course-card-heading">{courseData.name}</h1>
                <p className="course-card-description">
                  {courseData.description}
                </p>
              </div>
            </div>
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
              We cannot seem to find the page you are looking for
            </p>
            <button
              className="retry-button"
              onClick={this.getCourseData}
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
        {this.coursePage()}
      </div>
    )
  }
}

export default CourseDetails
