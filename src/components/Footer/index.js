import './index.css'

import {
  AiOutlineGoogle,
  AiOutlineTwitter,
  AiOutlineInstagram,
  AiFillYoutube,
} from 'react-icons/ai'

const Footer = () => (
  <div className="FooterContainer">
    <div className="icons">
      <AiOutlineGoogle />
      <AiOutlineTwitter />
      <AiOutlineInstagram />
      <AiFillYoutube />
    </div>
    <h3>Contact Us</h3>
  </div>
)
export default Footer
