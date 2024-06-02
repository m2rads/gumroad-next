import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div id="main-content">
		<h3>404</h3>
		<div className="mini-rule"></div>
		<p>You've reached a page that doesn't exist. <Link href="/home">Go home?</Link></p>
	</div>
  )
}