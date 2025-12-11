

let admin_log_out_btn=document.querySelector("#admin-log-out-btn");

admin_log_out_btn.addEventListener("click",()=>
    {
     
        window.location.href = "index.html"; 
        
    })

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
    





    import { books, categories, authors} from './source.js';




return_Book_Display();
  
  function return_Book_Display()
  {
    const bookTable = document.querySelector("#book-table");
  
  bookTable.innerHTML = ''; // Clear previous content
  
  bookTable.innerHTML=` <tr>
  <th>ISBN</th>
  <th>Book Name</th>
  <th>Category</th>
            <th>Price</th>
            <th>Author</th>
            <th>ReturnDate</th>
            </tr>`;

  books.forEach(book => {

    if(book.issBook.issueStatus===true)                      // it also those books which are iussed  we just want to display
      {
      const bookRow = document.createElement('tr');
        
      let data1 = document.createElement('td');
      let data2 = document.createElement('td');
      let data3 = document.createElement('td');
      let data4 = document.createElement('td');
      let data5 = document.createElement('td');
      let data6 = document.createElement('td');
      
      
      data1.innerText = book.name;
      data2.innerText = book.category;
      data3.innerText = book.price;
      data4.innerText = book.author;
      data5.innerText = book.isbn;
      data6.innerText = book.issBook.issueDate;        // it also those books which are iussed   // it also those books which are iussed    // it also those books which are iussed 

      bookRow.appendChild(data5);
      bookRow.appendChild(data1);
      bookRow.appendChild(data2);
      bookRow.appendChild(data3);
      bookRow.appendChild(data4);
      bookRow.appendChild(data6);
      bookTable.appendChild(bookRow);

      }


    });
  }
  
  
// Initial display update
