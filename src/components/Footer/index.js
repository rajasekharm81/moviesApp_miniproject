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
      <AiOutlineGoogle className="icon" />
      <AiOutlineTwitter className="icon" />
      <AiOutlineInstagram className="icon" />
      <AiFillYoutube className="icon" />
    </div>
  </div>
)
export default Footer
