document.addEventListener('DOMContentLoaded', function() {


    document.querySelector('nav').querySelectorAll('button').forEach((el) => {
        el.addEventListener('click', (e) => hide_elements(e.target.id));
    })

})


function hide_elements(id) {
    document.querySelectorAll('.section').forEach((el) => {
        if (id.includes(el.id)) {
            el.hidden = false;
        }
        else {
            el.hidden = true;
        }
    }

    )
}