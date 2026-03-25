const projectOverlay = document.getElementById("projectOverlay")
const projectOverlayContent = document.getElementById("projectOverlayContent")
const backButton = document.getElementById("backButton")

async function openProject(slug){

	const res = await fetch(`projects/${slug}.html`)
	const html = await res.text()

	projectOverlayContent.innerHTML = html

	projectOverlay.classList.add("active")
	backButton.style.display = "block"
	document.body.style.overflow = "hidden"

	projectOverlay.scrollTo({
		top: 0,
		behavior: "instant"
	})

	history.pushState({project: slug}, "", "#" + slug)
}

function closeProject(){
	projectOverlay.classList.remove("active")
	backButton.style.display = "none"
	document.body.style.overflow = "auto"

	history.pushState("", document.title, window.location.pathname)
}

backButton.addEventListener("click", closeProject)

window.addEventListener("popstate", () => {
	closeProject()
})

/* Deep link support */
window.addEventListener("load", () => {
	const slug = window.location.hash.replace("#","")
	if(slug){
		openProject(slug)
	}
})