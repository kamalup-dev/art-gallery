import React from "react";
import "../../sass/profile.scss";
import "../../styles/splash.css";
import PROFILE_DATA from '../../data/profileData'

const {heading, bio} = PROFILE_DATA;

function Profile() {
  return (
    <div className="profile-card">
      <div className="intro-text">
        <h1>{heading}</h1>
        <p>{bio}</p>
      </div>
      <div className="profile-container">
        <div className="splash-image"></div>
        {/* <div className="hexagon-profile">
        <div class="fakehexagon">
          <div class="face"></div>
          <div class="face"></div>
          <div class="face"></div>
        </div>
        <div class="fakehexagon">
          <div class="face"></div>
          <div class="face"></div>
          <div class="face"></div>
        </div>
        <div class="fakehexagon">
          <div class="face"></div>
          <div class="face"></div>
          <div class="face"></div>
        </div>
        <div class="fakehexagon">
          <div class="face"></div>
          <div class="face"></div>
          <div class="face"></div>
        </div>
        <div class="fakehexagon">
          <div class="face"></div>
          <div class="face"></div>
          <div class="face"></div>
        </div>
        <div class="fakehexagon">
          <div class="face"></div>
          <div class="face"></div>
          <div class="face"></div>
        </div>
        <div class="fakehexagon">
          <div class="face"></div>
          <div class="face"></div>
          <div class="face"></div>
        </div>
      </div> */}
      </div>
    </div>
  );
}

export default Profile;
