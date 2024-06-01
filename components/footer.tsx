import React from 'react';

export default function Footer() {

  return (
    <>
      <div id="push"></div>
      <div id="footer">
        <div id="inner-footer">
          {/* Replace this with the actual content of includes/copyright-p.html */}
          <p>© {new Date().getFullYear()} Gumroad, Inc. All Rights Reserved.</p>
          <p id="footer-navigation">
            <a href="/about">About</a> &bull; <a href="/faq">FAQ</a> &bull; 
            <a href="http://twitter.com/gumroad/">Twitter</a> &bull; 
            <a href="http://facebook.com/gumroad/">Facebook</a>
            {/* Uncomment if you want to add the Help link */}
            {/* &bull; <a href="#">Help</a> */}
          </p>
        </div>
      </div>
    </>
  );
};

