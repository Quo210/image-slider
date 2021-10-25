import './style.css'

const slides = (() => {
    const prefixForImg = '../images/'
    const imgArray = [];
    const suffixForImg = '.jpeg';

    function makeCatArray(){
        for (let i = 1; i <= 8; i++){
            const str = `cat${i.toString()}`
            imgArray.push(`${prefixForImg}${str}${suffixForImg}`);
        }
    }

    function getImgArr(){
        return imgArray;
    }

    function getNextSrc(current = '../images/cat1.jpeg'){
        const arr = getImgArr();
        let pos = arr.indexOf(current);

        if (pos + 1 > arr.length - 1){
            alert('Last image');
            return false
        }

        return arr[pos + 1];
    }

    function getPrevSrc(current = '../images/cat8.jpeg'){
        const arr = getImgArr();
        let pos = arr.indexOf(current);

        if (pos - 1 < 0){
            alert('First Image');
            return false
        }

        return arr[pos-1];
    }
    

    makeCatArray();

    return {
        getArr: getImgArr,
        prevCat: getPrevSrc,
        nextCat: getNextSrc,
    }
})()

const dom = (()=>{

    let currentImage;

    function buildHolder(src = '../images/cat1.jpeg'){
        const imgHolder = document.createElement('div');
        imgHolder.classList.add('img-holder');
        const img = document.createElement('img');
        img.classList.add('cat-img');
        img.setAttribute('src',`${src}`);
        imgHolder.appendChild(img);
        currentImage = src;
        return imgHolder
    }

    function getFrame(){
        return document.querySelector('section#frame')
    }

    function placeImageOnDoc(elem){
        const frame = getFrame();
        frame.appendChild(elem);
    }

    function buildAndPlace(src){
        const htmlElem = buildHolder(src);
        placeImageOnDoc(htmlElem);
    }

    function currentCat(){
        return currentImage;
    }

    function emptyFrame(){
        let fra = getFrame();
        fra.replaceChildren();
    }

    return {
        showImg: buildAndPlace,
        currentCat: currentCat,
        empty: emptyFrame,
    }
})();

const counter = (()=>{
    function fillCounter(arr){
        const cou = getCounter(); // counter
        for (let i = 0; i < arr.length; i++){
            const thing = document.createElement('div');
            thing.textContent = '+';
            thing.classList.add('counter-thing');
            thing.setAttribute('data-key',`${i+1}`)
            cou.appendChild(thing);
        }
    }

    function getCounter(){
        return document.querySelector('section.counter')
    }

    return {
        fill: fillCounter,
    }

})();



const arr = slides.getArr()
const my = dom.showImg(arr[2])

function nextCat(){
    let cur = dom.currentCat(); // Current
    let nex = slides.nextCat(cur); // Next
    if (nex == false){
        return
    }
    dom.empty();
    dom.showImg(nex)
}

function prevCat(){
    let cur = dom.currentCat(); // Current
    let pre = slides.prevCat(cur); // Previous
    if (pre == false){
        return
    }
    dom.empty();
    dom.showImg(pre)
}

const nexB = document.querySelector('div.next-btn');
nexB.addEventListener('click',nextCat);

const preB = document.querySelector('div.prev-btn');
preB.addEventListener('click',prevCat);

counter.fill(arr);