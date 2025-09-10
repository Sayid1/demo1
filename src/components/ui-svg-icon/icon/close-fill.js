export default  (color = []) => {
	let c1 = color[0] || '#333333'
	let c2 = color[1] || 'white'

    return  `
	  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
		  <circle cx="16" cy="16" r="16" fill="${c1}"/>
		  <rect x="8.22183" y="9.63599" width="2" height="20" rx="1" transform="rotate(-45 8.22183 9.63599)" fill="${c2}"/>
		  <rect width="2" height="20" rx="1" transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 23.7782 9.63599)" fill="${c2}"/>
	  </svg>
	`
};
