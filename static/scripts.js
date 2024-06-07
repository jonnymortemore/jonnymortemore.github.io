document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('nav').querySelectorAll('button').forEach((el) => {
        el.addEventListener('click', (e) => hide_elements(e.target.id));
    })
    document.querySelector('#home_button').addEventListener ('click', (e) => hide_elements(e.target.id))

    document.querySelector('#right').onclick = () => {moveCarousel("left")};
    document.querySelector('#left').onclick = () => {moveCarousel("right")};



})

function moveCarousel(direction) {
    const inner = document.querySelector('.carousel-inner');
    const iframe = document.querySelector('.music-iframe')
    let size = document.querySelector('.carousel-outer').offsetWidth;
    let amount = 0;
    // add or minus size based on direction
    direction == "left" ? amount = -size : amount = size;
    let left = parseInt(inner.style.left) + amount;
    // if nan - set to amount
    if (isNaN(left)) {
        left = amount;
    }
    // check left hasn't gone too far
    if (left > 0) {left = 0;}
    let pages = -(Math.round((inner.childElementCount * iframe.offsetWidth) / size) - 1)*size;
    if (left < pages) {
        left = pages;
    }
    // move div left
    inner.style.left = `${left}px`;

}

let updateIframe = false;


function hide_elements(id) {
    document.querySelectorAll('.section').forEach((el) => {
        if (id.includes(el.id)) {
            el.hidden = false;
            //reload music iframes that aren't showing the first time music tab chosen
            if (el.id == "music" && !updateIframe) {
                //calculate the size of the carousel based on music div size
                const music = document.querySelector('#music').offsetWidth;
                const outer = document.querySelector('.carousel-outer');
                const iframe = document.querySelector('.music-iframe').offsetWidth;
                console.log(`${iframe * Math.round(music / iframe)}px`);
                outer.style.width = `${iframe * Math.floor(outer.offsetWidth / iframe)}px`;

                // reset iframes to make sure images correct
                document.querySelectorAll(".music-iframe").forEach((el) => {
                    el.src = el.src;
                    updateIframe = true;
                    console.log("yes");
                })
            }
        }
        else {
            el.hidden = true;
        }
    }

    )
}