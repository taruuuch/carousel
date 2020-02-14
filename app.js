const carousel = document.querySelector('.carousel')
const carouselContainer = document.querySelector('.carousel-container')
const carouselItems = cloneNodes('.carousel-container')

const prevBtn = document.querySelector('.carousel-prev')
const nextBtn = document.querySelector('.carousel-next')

let counterSlide = 1
const size = carouselItems[0].clientWidth

carouselContainer.style.transform = `translateX(${(-size * counterSlide)}px)`

carouselItems.forEach(item => {
  item.style.width = `${carousel.clientWidth}px`
})

// Button listeners
nextBtn.addEventListener('click', () => {
  if (counterSlide >= carouselItems.length - 1)
    return

  carouselContainer.style.transition = `transform .4s ease-in-out`
  counterSlide++
  carouselContainer.style.transform = `translateX(${(-size * counterSlide)}px)`
})

prevBtn.addEventListener('click', () => {
  if (counterSlide <= 0)
    return

  carouselContainer.style.transition = `transform .4s ease-in-out`
  counterSlide--
  carouselContainer.style.transform = `translateX(${(-size * counterSlide)}px)`
})

carouselContainer.addEventListener('transitionend', () => {
  if (carouselItems[counterSlide].id === 'lastClone') {
    carouselContainer.style.transition = 'none'
    counterSlide = carouselItems.length - 2
    carouselContainer.style.transform = `translateX(${(-size * counterSlide)}px)`
  }
  if (carouselItems[counterSlide].id === 'firstClone') {
    carouselContainer.style.transition = 'none'
    counterSlide = carouselItems.length - counterSlide
    carouselContainer.style.transform = `translateX(${(-size * counterSlide)}px)`
  }
})

function transformCarousel(size, counterSlide) {
  return `translateX(${(-size * counterSlide)}px)`
}

function cloneNodes(selector) {
  const carouselContainer = document.querySelector(selector)
  const carouselItemsTemp = document.querySelectorAll('.carousel-container__slide')
  const firstClone = carouselItemsTemp[0].cloneNode(true)
  const lastClone = carouselItemsTemp[carouselItemsTemp.length - 1].cloneNode(true)

  firstClone.id = 'firstClone'
  lastClone.id = 'lastClone'

  carouselContainer.prepend(lastClone)
  carouselContainer.append(firstClone)

  return document.querySelectorAll(`${selector}__slide`)
}