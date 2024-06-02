import React from 'react';

const ElsewherePage = () => {
  return (
    <div id="main-content">
      <h3>Gumroad for WordPress.</h3>
      <div className="mini-rule"></div>
      <h4>You can use Gumroad with your WordPress blog.</h4>
      <p>
        Download <a href="/downloads/gumroad.zip">Gumroad for WordPress</a>, unzip it, and drag it into your wp-content/plugins/ folder. Then, update your Gumroad (under Settings) account details in your WP Admin dashboard.
      </p>
      <p>That's it! Just use the gumroad shortcode in your blog posts and it'll automatically convert into a Gumroad link. For example, this:</p>
      <div>
        <pre>[gumroad name="name" url="http://google.com" price="5.00" description="description"]anchor text[/gumroad]</pre>
      </div>
      <p>turns into this:</p>
      <div>
        <pre>&lt;a href="http://gumroad.com/l/tsdylq"&gt;anchor text&lt;/a&gt;</pre>
      </div>
      <p>That's it!</p>
    </div>
  );
};

export default ElsewherePage;
