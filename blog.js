
const el_add_post = document.getElementById("add_post_bttn");
const post_d = document.getElementById("post_dialog");
const el_cancel_post = document.getElementById("cancel_bttn");
const el_save_bttn = document.getElementById("save_bttn");
const el_title = document.getElementById("title");
const el_date = document.getElementById("date");
const el_blog_post = document.getElementById("blog_post");

let posts = JSON.parse(localStorage.getItem('post_entries')) || [];


el_add_post.addEventListener("click", function () {
    post_d.showModal();
});

el_cancel_post.addEventListener("click", function () {
    post_d.close();
    el_title.value = '';
    el_date.value = '';
    el_blog_post.value = '';
});

el_save_bttn.addEventListener("click", function () {
    post_d.close();
    let entry = {
        title: el_title.value,
        date: el_date.value,
        post: el_blog_post.value
    };
    posts.push(entry);
    localStorage.setItem('post_entries', JSON.stringify(posts));
    el_title.value = '';
    el_date.value = '';
    el_blog_post.value = '';
});
