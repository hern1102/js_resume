
const el_add_post = document.getElementById("add_post_bttn");
const post_d = document.getElementById("post_dialog");
const el_cancel_post = document.getElementById("cancel_bttn");
const el_save_bttn = document.getElementById("save_bttn");
const el_title = document.getElementById("title");
const el_date = document.getElementById("date");
const el_blog_post = document.getElementById("blog_post");
const el_list = document.getElementById("list");
let current_li;
let editing_post = false;
let counter = 0;


let posts = JSON.parse(localStorage.getItem('post_entries')) || [];

posts.forEach(post => {
    display(post.title, post.date, post.post);
});

el_add_post.addEventListener("click", function () {
    post_d.showModal();
});

el_cancel_post.addEventListener("click", function () {
    post_d.close();
    el_title.value = '';
    el_date.value = '';
    el_blog_post.value = '';
});


function save_bttn () {
    post_d.close();
    let entry = {
        title: el_title.value,
        date: el_date.value,
        post: el_blog_post.value,
        id: `${counter}`
    };

    posts = JSON.parse(localStorage.getItem('post_entries')) || [];

    //display on the screen
    let display_string = `${entry.date} - ${entry.title}: ${entry.post}`;
    
    if(!editing_post){  //meaning it's a new post, then create all of the elements
        posts.push(entry);
        localStorage.setItem('post_entries', JSON.stringify(posts));
        const newListItem = document.createElement("li");
        const textbox = document.createElement('p');
        textbox.innerHTML = display_string;
        textbox.setAttribute('id', `textbox_${counter}`);
        newListItem.id = `${counter}`;

        let newDeleteButton = document.createElement("button");
        newDeleteButton.textContent = "Delete";
        newDeleteButton.addEventListener("click", delete_post);
        newListItem.post = entry.post;
        newListItem.date = entry.date;
        newListItem.title = entry.title;
        let newEditButton = document.createElement("button");
        newEditButton.textContent = "Edit";
        newEditButton.addEventListener("click", edit_post);
        newListItem.appendChild(textbox);
        newListItem.appendChild(newDeleteButton);
        newListItem.appendChild(newEditButton);
        el_list.appendChild(newListItem);
        counter = counter + 1;
    }else{   //editing the content of existing post.
        let index = current_li.id;
        posts.forEach(element => {
            if(element.id === current_li.id){
                element.post = entry.post;
                element.date = entry.date;
                element.title = entry.title;
            }
        });
        localStorage.setItem('post_entries', JSON.stringify(posts));
        document.getElementById(`textbox_${index}`).textContent = display_string;
        current_li.post = entry.post;
        current_li.date = entry.date;
        current_li.title = entry.title;
    }

    editing_post = false;
    el_title.value = '';
    el_date.value = '';
    el_blog_post.value = '';
}

el_save_bttn.addEventListener("click", save_bttn);

function delete_post(event){
    const current_li = event.target.parentNode;
    posts = JSON.parse(localStorage.getItem('post_entries')) || [];
    posts = posts.filter(post => post.id !== current_li.id);
    localStorage.setItem('post_entries', JSON.stringify(posts));
    current_li.remove();
    //also remove from local storage
}

function edit_post(event){
    current_li = event.target.parentNode;
    editing_post = true;
    el_title.value = current_li.title;
    el_date.value = current_li.date;
    el_blog_post.value = current_li.post;
    post_d.showModal();
}

function display (title, date, post){
    const newListItem = document.createElement("li");
    const textbox = document.createElement('p');
    let display_string = `${date} - ${title}: ${post}`;
    textbox.innerHTML = display_string;
    textbox.setAttribute('id', `textbox_${counter}`);
    newListItem.id = `${counter}`;

    let newDeleteButton = document.createElement("button");
    newDeleteButton.textContent = "Delete";
    newDeleteButton.addEventListener("click", delete_post);
    newListItem.post = post;
    newListItem.date = date;
    newListItem.title = title;
    let newEditButton = document.createElement("button");
    newEditButton.textContent = "Edit";
    newEditButton.addEventListener("click", edit_post);
    newListItem.appendChild(textbox);
    newListItem.appendChild(newDeleteButton);
    newListItem.appendChild(newEditButton);
    el_list.appendChild(newListItem);
    counter = counter + 1;
}


