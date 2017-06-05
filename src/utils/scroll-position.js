
export function getScrollTop() {
    return window.pageYOffset || document.documentElement.scrollTop
        || document.body.scrollTop
}

export function setScrollTop(value) {
    window.scrollTo(0, value)
}