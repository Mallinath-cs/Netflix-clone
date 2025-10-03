import React from 'react'
import './Footer.css'
import youtube_icon from '../../assets/youtube_icon.png'
import twitter_icon from '../../assets/twitter_icon.png'
import instagram_icon from '../../assets/instagram_icon.png'
import facebook_icon from '../../assets/facebook_icon.png'
const Footer = () => {
  return (
    <div className= 'footer'>
      <div className="footer-icons">
        <a href="https://www.facebook.com/netflix/" target="_blank">
        <img src={facebook_icon} alt=""></img>
        </a>
        <a href="https://www.instagram.com/netflix/" target="_blank">
        <img src={instagram_icon} alt="" />
        </a>
        <a href="https://x.com/netflix?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor" target="_blank">
        <img src={twitter_icon} alt="" />
        </a>
        <a href="https://www.youtube.com/channel/UCWOA1ZGywLbqmigxE4Qlvuw" target="_blank">
        <img src={youtube_icon} alt="" />
        </a>
      </div>
      <ul>
        <li>Audio Description</li>
        <li>Help Centre</li>
        <li>Gift Cards</li>
        <li>Media Centre</li>
        <li>Investor Relations</li>
        <li>Jobs</li>
        <li>Terms of use</li>
        <li>Privacy</li>
        <li>Legal Notices</li>
        <li>Cookie Preferences</li>
        <li>Corporate Information</li>
        <li>Contact Us</li>
      </ul>
      <p className="copyright-text">&copy; 1997-2025 Netflix, Inc.</p>
    </div>
  )
}

export default Footer
