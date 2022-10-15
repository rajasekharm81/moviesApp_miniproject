import {Link} from 'react-router-dom'
import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const ContactDetails = () => (
  <div className="aboutMainContainer">
    <Header />
    <div className="contactDetailsContainer">
      <h1>Developed by: M. Raja Sekhar</h1>
      <p>Email: rajasekhar.mandula@gmail.com</p>
      <p>Contact No: 9502260022</p>
      <Link
        className="ContactDetailslink"
        to="https://www.dropbox.com/s/0kqs8rokx5yeblv/Raja_sekhar__resume_latest.pdf?dl=0"
        target="_black"
      >
        <p>Please Click on me for my Resume</p>
      </Link>
    </div>
    <Footer />
  </div>
)

export default ContactDetails
