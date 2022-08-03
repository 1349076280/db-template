const removeElement = (el: Element) => {
    if (typeof el.remove !== 'undefined') {
        el.remove()
    } else if(el.parentNode) {
        el.parentNode.removeChild(el)
    } else {
        console.error('can\'t be removed!plz checked the element')
    }
}

export { removeElement }
