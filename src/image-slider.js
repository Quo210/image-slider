import './style.css'

const slides = (() => {
  const prefixForImg = '../images/'
  const imgArray = []
  const suffixForImg = '.jpeg'

  function makeCatArray () {
    for (let i = 1; i <= 8; i++) {
      const str = `cat${i.toString()}`
      imgArray.push(`${prefixForImg}${str}${suffixForImg}`)
    }
  }

  function getImgArr () {
    return imgArray
  }

  function getNextSrc (current = '../images/cat1.jpeg') {
    const arr = getImgArr()
    const pos = arr.indexOf(current)

    if (pos + 1 > arr.length - 1) {
      alert('Last image')
      return false
    }

    return arr[pos + 1]
  }

  function getPrevSrc (current = '../images/cat8.jpeg') {
    const arr = getImgArr()
    const pos = arr.indexOf(current)

    if (pos - 1 < 0) {
      alert('First Image')
      return false
    }

    return arr[pos - 1]
  }

  function intervalEnabler (func) {
    let interval

    function resetTimer () {
      clearInterval(interval)
      interval = setInterval(func, 10000)
    }

    window.onload = resetTimer
    document.onmousedown = resetTimer
    document.onkeydown = resetTimer
  }

  makeCatArray()

  return {
    getArr: getImgArr,
    prevCat: getPrevSrc,
    nextCat: getNextSrc,
    interval: intervalEnabler
  }
})()

const dom = (() => {
  let currentImage

  function buildHolder (src = '../images/cat1.jpeg') {
    const imgHolder = document.createElement('div')
    imgHolder.classList.add('img-holder')
    const img = document.createElement('img')
    img.classList.add('cat-img')
    img.setAttribute('src', `${src}`)
    imgHolder.appendChild(img)
    currentImage = src
    return imgHolder
  }

  function getFrame () {
    return document.querySelector('section#frame')
  }

  function placeImageOnDoc (elem) {
    const frame = getFrame()
    frame.appendChild(elem)
  }

  function buildAndPlace (src) {
    const htmlElem = buildHolder(src)
    placeImageOnDoc(htmlElem)
  }

  function currentCat () {
    return currentImage
  }

  function emptyFrame () {
    const fra = getFrame()
    fra.replaceChildren()
  }

  return {
    showImg: buildAndPlace,
    currentCat: currentCat,
    empty: emptyFrame
  }
})()

const counter = (() => {
  function fillCounter (arr) {
    const cou = getCounter() // counter
    for (let i = 0; i < arr.length; i++) {
      const thing = document.createElement('div')
      thing.classList.add('counter-thing')
      thing.setAttribute('data-key', `${i + 1}`)
      cou.appendChild(thing)
    }
  }

  function getCounter () {
    return document.querySelector('section.counter')
  }

  function removeClasses () {
    const dots = getCounter().children
    for (const dot of dots) {
      dot.classList.remove('active-dot')
    }
  }

  function getDotByKey (key) {
    return document.querySelector(`div[data-key="${key}"]`)
  }

  return {
    fill: fillCounter,
    get: getCounter,
    cleanCSS: removeClasses,
    getDot: getDotByKey
  }
})()

const arr = slides.getArr()

function changeDot (str) {
  const regexp = /cat(.*).jpeg/
  const key = regexp.exec(str, 'g')
  const dot = counter.getDot(key[1])
  counter.cleanCSS()
  dot.classList.add('active-dot')
}

function nextCat () {
  const cur = dom.currentCat() // Current
  const nex = slides.nextCat(cur) // Next
  if (nex === false) {
    return
  }
  changeDot(nex)
  dom.empty()
  dom.showImg(nex)
}

function prevCat () {
  const cur = dom.currentCat() // Current
  const pre = slides.prevCat(cur) // Previous
  if (pre === false) {
    return
  }
  changeDot(pre)
  dom.empty()
  dom.showImg(pre)
}

const nexB = document.querySelector('div.next-btn')
nexB.addEventListener('click', nextCat)

const preB = document.querySelector('div.prev-btn')
preB.addEventListener('click', prevCat)

counter.fill(arr) // Fills the counter with dots
slides.interval(nextCat); // Initiates the interval transition for the images

function linkToCats () {
  const dotArr = counter.get().children
  let numb = 0

  for (const dot of dotArr) {
    numb++
    const thing = `../images/cat${numb.toString()}.jpeg`
    dot.addEventListener('click', function () {
      console.log(thing)
      dom.empty()
      dom.showImg(thing)
      counter.cleanCSS()
      this.classList.add('active-dot')
    })
  }

  const third = document.querySelector('div[data-key="3"]')
  third.classList.add('active-dot')
  dom.showImg(arr[2])
}

linkToCats()
