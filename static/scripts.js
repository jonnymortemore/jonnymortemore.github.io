let currentPage = 0 // current page for carousel
let totalPages = 0 //total pages for carousel
let carouselSize = 0 // size of carousel


document.addEventListener('DOMContentLoaded', function() {
    document.querySelector("#header_nav").querySelectorAll('button').forEach((el) => {
        el.addEventListener('click', (e) => hide_elements(e.target.id));
    })
    document.querySelector("#hamburger").querySelectorAll('button').forEach((el) => {
        el.addEventListener('click', (e) => hide_elements(e.target.id));
    })
    document.querySelector('#home_button').addEventListener ('click', (e) => hide_elements(e.target.id))

    document.querySelector('#right').onclick = () => {moveCarousel("left")};
    document.querySelector('#left').onclick = () => {moveCarousel("right")};
    //event listener for transition end for carousel to hide iframes
    document.querySelector('.carousel-inner').addEventListener('transitionend', (e) => {
        e.target.querySelectorAll('iframe').forEach((el) => {
            //set all iframes to hidden then set the ones on current page for visible. 
            el.style.visibility = "hidden";
            let position = Array.from(el.parentNode.children).indexOf(el)
            //figure out if on page based on page size
            // element per page
            let elementPerPage = carouselSize / el.offsetWidth
            // the minimum and maximum child position index values
            let min = elementPerPage * (currentPage)
            let max = (elementPerPage * currentPage) + elementPerPage
            //compare current child positon to min and max
            if (position >= min && position < max) {
                el.style.visibility = "visible";
            }
        })
    })
    window.addEventListener('popstate', (event) => {
        if (event.state && event.state.divId) {
            // Show the div corresponding to the state
            hide_elements(event.state.divId);
        }
    });
    //for if url is changed after page loaded
    window.addEventListener('hashchange', () => {
        updateHashURL();
    });

    // Function to handle initial load based on URL hash
    function updateHashURL() {
        const hash = window.location.hash.substring(1);
        console.log(hash)
        if (hash) {
            hide_elements(hash);
        }
    }

    //on contact button click create email
    document.querySelectorAll('.contact_link, #footer_contact').forEach((el) => {
        el.addEventListener('click', () => {
            let u = "superpuzzlesudoku";
            let d = "gmail.com";
            let e = u + "@" + d;
            let m2l = "mai"
            m2l += 'lto:' + e;
            window.location.href = m2l;
        });
    });

    document.querySelector("#hamburger_button").addEventListener("click", () => {
        let hamburger = document.querySelector("#hamburger");
        let icon = document.querySelector('#hamburger-icon');
        if (hamburger.style.display === "none") {
            hamburger.style.display = "flex";
            icon.className = "fa-solid fa-x";
        }
        else {
            hamburger.style.display = "none";
            icon.className = "fa-solid fa-bars";
        }
       
    });

    window.addEventListener('resize', () => {
        if(window.innerWidth > 800) {
            let hamburger = document.querySelector("#hamburger");
            let icon = document.querySelector('#hamburger-icon');
            hamburger.style.display = "none";
            icon.className = "fa-solid fa-bars";
        }
    });

})

function moveCarousel(direction) {
    const inner = document.querySelector('.carousel-inner');
    const iframe = document.querySelector('.music-iframe')
    //size of page window
    carouselSize = document.querySelector('.carousel-outer').offsetWidth;
    let amount = 0;
    // add or minus size based on direction
    direction == "left" ? amount = -carouselSize : amount = carouselSize;
    let left = parseInt(inner.style.left) + amount;
    // if nan - set to amount
    if (isNaN(left)) {
        left = amount;
    }
    // total pages - starting at 0
    totalPages = Math.ceil((inner.childElementCount * iframe.offsetWidth) / carouselSize)-1
    // get the full left movement
    let leftLimit = -(totalPages) * carouselSize;
    if (left > 0) {
        left = leftLimit;
    }
    if (left < leftLimit) {
        left = 0;
    }
    // move div left
    inner.style.left = `${left}px`;
    //get current page
    currentPage = Math.abs(left/carouselSize);
    // set all carousel elements to visible for transition.
    inner.querySelectorAll('iframe').forEach((el) => {
        el.style.visibility = "visible";
    })
    

}

let updateIframe = false;


function hide_elements(id) {
    document.querySelectorAll('.section').forEach((el) => {
        if (id.includes(el.id)) {
            el.hidden = false;
            //reload music iframes that aren't showing the first time music tab chosen
            if (el.id == "music" && !updateIframe) {
                //calculate the size of the carousel based on music div size
                const outer = document.querySelector('.carousel-outer');
                const iframe = document.querySelector('.music-iframe').offsetWidth;
                outer.style.width = `${iframe * Math.floor(outer.offsetWidth / iframe)}px`;

                // reset iframes to make sure images correct
                document.querySelectorAll(".music-iframe").forEach((el) => {
                    el.src = el.src;
                    updateIframe = true;
                })
            }
            // Push state to history
            history.pushState({divId: el.id}, '', `#${el.id}`);
            window.scrollTo(0, 0);
        }
        else {
            el.hidden = true;
        }
    }

    )
}