function del_list_element() {
    var focused = document.activeElement
    if (!focused || focused == document.body)
        focused = null
    else if (document.querySelector)
        focused = document.querySelector(":focus");
    console.log(focused)
}

new Vue({
    el: '#list',
    methods: {
        clicked: function (event) {
            var item = document.getElementsByTagName("li")
            for (var i = 0; i < item.length; i++) 
            {
                if (item[i].classList.contains("clicked"))
                    item[i].classList.toggle("clicked")
                if (item[i] == event.target) 
                    document.getElementById("num").value = i
                    
            }
            event.target.classList.toggle("clicked")
        }
    }
})
