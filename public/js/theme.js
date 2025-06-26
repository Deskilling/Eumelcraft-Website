function forceDarkMode() {
  const element = document.documentElement
  element.classList.add("dark")
  localStorage.theme = "dark"
}

document.addEventListener("astro:after-swap", forceDarkMode)
forceDarkMode()
