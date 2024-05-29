document.addEventListener('DOMContentLoaded', function() {

    document.querySelector('#jvd_games').style.display = "none"
    document.querySelector('#web_design').style.display = "none"
    document.querySelector('#music').style.display = "none"

    document.querySelector('nav').querySelectorAll('button').forEach((el) => {
        el.addEventListener('click', (e) => hide_elements(e.target.id));
    })

})


function hide_elements(id) {
    document.querySelectorAll('.section').forEach((el) => {
        if (id.includes(el.id)) {
            el.style.display = ""
        }
        else {
            el.style.display = "none"
        }
    }

    )
}