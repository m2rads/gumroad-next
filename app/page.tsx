import UserSignUpForm from "@/components/forms/user-signup-form";
import readUserSession from "@/supabase/user-session";
import { redirect } from "next/navigation";

export default async function Home() {
  const {data} = await readUserSession();
  if (data.session) return redirect("/home")

  return (
    <div>
      <div id="intro">
        <div id="video"></div>
        <ul>
          <li id="we-handle-payments">
            <h5>We handle all the payment stuff.</h5>
            <p>You should be focused on creating awesome content. We&apos;ll deal with the rest.</p>
          </li>
          <li id="worldwide">
            <h5>Do what you already do.</h5>
            <p>Use the channels you already have with your fans and followers. You <em>are</em> the distribution. No store needed.</p>
          </li>
        </ul>

        <div id="intro-text">
          <h2>Share and sell your digital content <br />with just a link.</h2>
          <p id="description">
            Selling stuff has always been a pain. No longer! Get back to creating. <br />We make selling stuff as easy as sharing a link.
          </p>
        </div>
        <UserSignUpForm />
      </div>
      <div id="press">
        <div className="testimonial">
          <blockquote>&#8220;Incredibly easy&hellip; in fact, just writing this, I&#8217;m coming up with ideas and kicking myself for having not sold things in the past. Fortunately, moving forward, I won&#8217;t have to kick myself anymore.&#8221;</blockquote>
          <span className="writer">Brad McCarty  - <a href="http://thenextweb.com/apps/2011/04/09/gumroad-sell-digital-goods-with-a-link-no-storefront-needed/">The Next Web</a></span>
        </div>
		  </div>
    </div>
  );
}
