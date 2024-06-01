import React from 'react';

export default function Footer() {

  return (
    <>
      <div id="push"></div>
      <div id="footer">
        <div id="inner-footer">
          <p id="copyright">&copy; 2011 <strong>Gumroad</strong></p>
          <p>© {new Date().getFullYear()} Gumroad, Inc. All Rights Reserved.</p>
          <p id="footer-navigation">
            <a href="/about">About</a> &bull; <a href="/faq">FAQ</a> &bull; 
            <a href="http://twitter.com/gumroad/">Twitter</a> &bull; 
            <a href="http://facebook.com/gumroad/">Facebook</a>
            {/* &bull; <a href="#">Help</a> */}
          </p>
        </div>
      </div>
    </>
  );
};

