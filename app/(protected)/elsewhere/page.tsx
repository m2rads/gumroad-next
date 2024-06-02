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
      <p>That&#39;s it! Just use the gumroad shortcode in your blog posts and it&#39;ll automatically convert into a Gumroad link. For example, this:</p>
      <div>
        <pre>[gumroad name=&quot;name&quot; url=&quot;http://google.com&quot; price=&quot;5.00&quot; description=&quot;description&quot;]anchor text[/gumroad]</pre>
      </div>
      <p>turns into this:</p>
      <div>
        <pre>&lt;a href=&quot;http://gumroad.com/l/tsdylq&quot;&gt;anchor text&lt;/a&gt;</pre>
      </div>
      <p>That&#39;s it!</p>
    </div>
  );
};

export default ElsewherePage;
