import Link from 'next/link';
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
            <Link href="/about">About</Link> &bull; <Link href="/faq">FAQ</Link> &bull; 
            <Link href="http://twitter.com/gumroad/">Twitter</Link> &bull; 
            <Link href="http://facebook.com/gumroad/">Facebook</Link>
            {/* &bull; <a href="#">Help</a> */}
          </p>
        </div>
      </div>
    </>
  );
};

