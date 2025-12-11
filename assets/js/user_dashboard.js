
let user_log_out_btn=document.querySelector("#user-log-out-btn");

user_log_out_btn.addEventListener("click",()=>
    {
     
        window.location.href = "index.html"; 
        
    })


    let book_list_btn=document.querySelector("#books-list-user");

    book_list_btn.addEventListener("click",()=>
    {
        window.location.href = "displayBookUser.html"; 
    })


    

    
    let issueBook_list_btn=document.querySelector("#book-issued-user");

    issueBook_list_btn.addEventListener("click",()=>
    {
        window.location.href = "userIssueBook.html"; 
    })


    
 let goto_dashboard_btn=document.querySelector("#goto-dashboard");

 goto_dashboard_btn.addEventListener("click",()=>
     {
         window.location.href = "user_dashboard.html"; 
     })
 
     let goto_book_btn =document.querySelector("#goto-book")
     goto_book_btn.addEventListener("click", () => {
         
         window.location.href = "displayBookUser.html";
     });


     let goto_issued_btn =document.querySelector("#goto-issue-book")
     goto_issued_btn.addEventListener("click", () => {
         
         window.location.href = "userIssueBook.html";
     });

