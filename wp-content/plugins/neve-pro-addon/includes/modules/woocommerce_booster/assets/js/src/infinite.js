/* global neveWooBooster, neveInfiniteScroll */
import inView from 'in-view'
import axios from 'axios'

import { initializeModal } from './modal.js'
import { initializeWishList } from './wish-list.js'

/**
 * Trigger request once the sentinel is in view.
 */
function initializeInfiniteScroll() {
  if (typeof neveInfiniteScroll === 'undefined') {
    return false
  }

  let page = getNextPage()
  let lock = false
  let trigger = document.querySelector('.load-more-products')

  if (trigger === null) {
    return false
  }

  if (typeof neveInfiniteScroll !== 'object') {
    return false
  }

  inView('.load-more-products').on('enter', () => {
    if (lock) {
      return false
    }
    if (typeof parent.wp.customize !== 'undefined') {
      parent.wp.customize.requestChangesetUpdate()
    }
    document.querySelector(
      '.load-more-products .nv-loader').style.display = 'block'
    lock = true

    getProducts(page).then(() => {
      page++
      lock = false
    })
  })

  window.addEventListener('scroll', debounce(() => {
    const products = document.querySelectorAll('.products .product')
    if (products === null) return false

    let max = 1
    for (let product of products) {
      let productWrapper = product.querySelector('.nv-card-content-wrapper');
      if( productWrapper !== null ) {
        let page = product.querySelector('.nv-card-content-wrapper').getAttribute('data-page')
        if (isScrolledIntoView(product) && page > max) {
          max = page
        }
      }
    }
    let url = getUrlForPage(max)
    let urlArgs = JSON.parse(neveInfiniteScroll.settings.url_args)
    if (neveInfiniteScroll.settings.plain_permalinks) {
      urlArgs['paged'] = max
    }
    delete (urlArgs['neve-infinite-scroll'])
    url = addArgsToURL(url, urlArgs)
    window.history.replaceState(null, null, url)
  }, 250))

}

const getProducts = (page) => {
  return new Promise((resolve, reject) => {
    let baseURL = getUrlForPage(page)
    let urlArgs = JSON.parse(neveInfiniteScroll.settings.url_args)

    if (neveInfiniteScroll.settings.plain_permalinks) {
      urlArgs['paged'] = page
    }

    baseURL = addArgsToURL(baseURL, urlArgs)

    const elem = document.querySelector('.load-more-products')
    const shop = document.querySelector('.nv-shop ul.products')

    let config = {
      headers: {
        'X-WP-Nonce': neveWooBooster.nonce,
        'Content-Type': 'application/json; charset=UTF-8'
      }
    }
    axios.post(baseURL, {}, config).then(response => {
      let data = response.data
      if (response.status === 200 && data.type === 'success') {
        shop.innerHTML += data.html
        initializeModal()
        initializeWishList()
        if (data.lastbatch) {
          elem.parentNode.removeChild(elem)
        }
      }
      resolve()
    }).catch((error) => {
      reject(error)
    })
  })
}

function getNextPage() {
  const url = new URL(window.location.href)

  let currentPage = null

  //On plain permalinks we use the paged param.
  if (neveInfiniteScroll.settings.plain_permalinks) {
    currentPage = url.searchParams.get('paged') || 1
  } else {
    //Parse the URL if we're not on plain permalinks.
    const currentPageArray = window.location.pathname.split('/')
    const pagePosition = currentPageArray.indexOf('page')
    // If we actually have a page inside the URL, use that.
    if (pagePosition > -1) {
      currentPage = currentPageArray[pagePosition + 1]
    }
  }
  if (currentPage) {
    return parseInt(currentPage) + 1
  }

  return 2
}

function isScrolledIntoView(el) {
  const rect = el.getBoundingClientRect()
  const elemTop = rect.top
  const elemBottom = rect.bottom
  return (elemTop >= 0) && (elemBottom <= window.innerHeight)
}

function debounce(func, wait) {
  let timeout
  return function () {
    let context = this,
      args = arguments
    let later = function () {
      timeout = null
      func.apply(context, args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

function addArgsToURL(url, args) {
  if (Object.keys(args).length === 0) {
    return url
  }

  let finalURL = url + '?'
  finalURL += Object.keys(args).map(key => {
    return encodeURIComponent(key) + '=' + encodeURIComponent(args[key])
  }).join('&')

  return finalURL
}

function getUrlForPage(page) {
  if (neveInfiniteScroll.settings.plain_permalinks) {
    return `${neveInfiniteScroll.settings.base_url}/`
  }
  return `${neveInfiniteScroll.settings.base_url}page/${page}/`
}

export {
  initializeInfiniteScroll
}
