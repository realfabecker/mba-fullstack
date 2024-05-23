export function title (title) {
    const elem = document.createElement("h1")
    elem.textContent = title
    document.body.appendChild(elem)
}