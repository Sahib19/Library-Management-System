
let admin_log_out_btn=document.querySelector("#admin-log-out-btn");

admin_log_out_btn.addEventListener("click",()=>
    {
     
        window.location.href = "index.html"; 
        
    })

    let book_list_btn=document.querySelector("#books-list");

    book_list_btn.addEventListener("click",()=>
    {
        window.location.href = "book.html"; 
    })

    let registeredUser_btn =document.querySelector("#registered-users")
    registeredUser_btn.addEventListener("click", () => {
        
        window.location.href = "registerUser.html";
    });


    let author_list_btn =document.querySelector("#authors-listed")
    author_list_btn.addEventListener("click", () => {
        
        window.location.href = "Author.html";
    });

    let category_list_btn =document.querySelector("#categories-listed")
    category_list_btn.addEventListener("click", () => {
        
        window.location.href = "Category.html";
    });

    let returnBook_btn =document.querySelector("#book-return")
    returnBook_btn.addEventListener("click", () => {
        
        window.location.href = "returnBook.html";
    });


    
    

    let book_issued_btn =document.querySelector("#book-issued")
    book_issued_btn.addEventListener("click", () => {
        
        window.location.href = "book_issued.html";
    });

    let goto_dashboard_btn=document.querySelector("#goto-dashboard");

    goto_dashboard_btn.addEventListener("click",()=>
        {
            window.location.href = "admin_dashboard.html"; 
        })

    let goto_registered_users_btn =document.querySelector("#goto-registered-Users")
    goto_registered_users_btn.addEventListener("click", () => {
        
        window.location.href = "registerUser.html";
    });

    let goto_book_btn =document.querySelector("#goto-book")
    goto_book_btn.addEventListener("click", () => {
        
        window.location.href = "book.html";
    });

    let goto_issued_btn =document.querySelector("#goto-issue-book")
    goto_issued_btn.addEventListener("click", () => {
        
        window.location.href = "book_issued.html";
    });

    

    let goto_category_btn =document.querySelector("#goto-category")
    goto_category_btn.addEventListener("click", () => {
        
        window.location.href = "Category.html";
    });
   
    

    let goto_author_btn =document.querySelector("#goto-author")
    goto_author_btn .addEventListener("click", () => {
        
        window.location.href = "Author.html";
    });


