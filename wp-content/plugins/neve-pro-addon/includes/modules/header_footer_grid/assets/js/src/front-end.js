function initHeader() {
  let desktopStickyRows = document.querySelectorAll('.header--row.hide-on-mobile.is_sticky')
  let mobileStickyRows = document.querySelectorAll('.header--row.hide-on-desktop.is_sticky')

  if (desktopStickyRows.length > 0 || mobileStickyRows.length > 0) {
    addPlaceholderAndStickHeader(mobileStickyRows.length > 0, desktopStickyRows.length > 0)
    let rowContainer = document.querySelector('.hfg_header'),
      headerTag = document.querySelector('header.header')
    startObserving(rowContainer, headerTag)
  }
}

function startObserving(rowsWrap, wrapTag) {
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting === true) {
      rowsWrap.classList.remove('is-stuck')
      return false
    }
    rowsWrap.classList.add('is-stuck')
  }, { rootMargin: '20px 0px 25px 0px' })
  observer.observe(wrapTag)
}

function initFooter() {
  let stickyRows = document.querySelectorAll('.footer--row.is_sticky')
  if (stickyRows.length > 0) {
    addPlaceholderAndStickFooter()
    let rowContainer = document.querySelector('.hfg_footer'),
      footerTag = document.querySelector('footer')
    startObserving(rowContainer, footerTag)
  }
}

function addPlaceholderAndStickFooter() {
  let placeholder = document.querySelector(
    '.sticky-footer-placeholder'),
    hfgFooter = document.querySelector('.hfg_footer')
  if (placeholder === null) {
    placeholder = document.createElement('div')
    placeholder.classList.add('sticky-footer-placeholder')
    hfgFooter.parentNode.insertBefore(placeholder, hfgFooter.nextSibling)
  }
  hfgFooter.classList.add('has-sticky-rows')
  placeholder.style.height = hfgFooter.offsetHeight + 'px'
}

function addPlaceholderAndStickHeader(mobile = false, desktop = false) {
  let headerPlaceholder = document.querySelector('.sticky-header-placeholder'),
    hfgHeader = document.querySelector('.hfg_header'),
    transparent = document.querySelector('.neve-transparent-header')
  if (headerPlaceholder === null && transparent === null) {
    headerPlaceholder = document.createElement('div')
    headerPlaceholder.classList.add('sticky-header-placeholder')
    hfgHeader.parentNode.insertBefore(headerPlaceholder, hfgHeader.nextSibling)
  }

  if (!mobile && headerPlaceholder) {
    headerPlaceholder.classList.add('hide-on-mobile', 'hide-on-tablet')
  }

  if (!desktop && headerPlaceholder) {
    headerPlaceholder.classList.add('hide-on-desktop')
  }

  if (mobile) {
    hfgHeader.classList.add('has-sticky-rows--mobile')
  }

  if (desktop) {
    hfgHeader.classList.add('has-sticky-rows--desktop')
  }

  if (headerPlaceholder !== null) {
    headerPlaceholder.style.height = hfgHeader.offsetHeight + 'px'
  }
}

window.addEventListener(
  'load',
  function () {
    initHeader()
    initFooter()
  }
)
window.addEventListener(
  'selective-refresh-content-rendered',
  function (e) {
    if (e.detail === 'hfg_header_layout_partial') {
      let headerPlaceholder = document.querySelector('.sticky-header-placeholder'),
        hfgHeader = document.querySelector('.hfg_header')
      if (headerPlaceholder) {
        headerPlaceholder.remove()
      }
      hfgHeader.classList.remove('has-sticky-rows--mobile', 'has-sticky-rows--desktop')
      initHeader()
    }
    if (e.detail === 'hfg_footer_layout_partial') {
      let hfgFooter = document.querySelector('.hfg_footer'),
        footerPlaceholder = document.querySelector('.sticky-footer-placeholder')
      if (footerPlaceholder) {
        footerPlaceholder.remove()
      }
      hfgFooter.classList.remove('has-sticky-rows')
      initFooter()
    }
  }
)

/**
 * Do resize events debounced.
 */
let neveResizeTimeout
window.addEventListener('resize', function () {
  clearTimeout(neveResizeTimeout)
  neveResizeTimeout = setTimeout(function () {
    initHeader()
    initFooter()
  }, 500)
})
