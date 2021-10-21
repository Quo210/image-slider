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

    makeCatArray();

    function getImgArr(){
        return imgArray;
    }

    


    return {
        show: makeCatArray,
        getArr: getImgArr,
    }
})()

const dom = (()=>{
    function buildHolder(src = '../images/cat1.jpeg'){
        const imgHolder = document.createElement('div');
        imgHolder.classList.add('img-holder');
        const img = document.createElement('img');
        img.classList.add('cat-img');
        img.setAttribute('src',`${src}`);
        imgHolder.appendChild(img);
        return imgHolder
    }

    function getFrame(){
        return document.querySelector('section#frame')
    }

    function placeHolder(elem){
        const frame = getFrame();
        frame.appendChild(elem);
    }


    return {
        build: buildHolder,
        placeImg: placeHolder,
    }
})();

const arr = slides.getArr()
const my = dom.build(arr[6])
dom.placeImg(my);