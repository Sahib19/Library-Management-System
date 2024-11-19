


let user_log_out_btn=document.querySelector("#user-log-out-btn");

user_log_out_btn.addEventListener("click",()=>
    {
     
        window.location.href = "index.html"; 
        
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



   
     import { books, categories, authors } from './source.js';






updateDisplay();
function updateDisplay() {
  const bookTable = document.querySelector("#book-table");
  
  bookTable.innerHTML = ''; // Clear previous content
  
  bookTable.innerHTML=` <tr>
  <th>ISBN</th>
  <th>Book Name</th>
  <th>Category</th>
            <th>Price</th>
            <th>Author</th>
            </tr>`;
            
            books.forEach(book => {
              const bookRow = document.createElement('tr');
              // bookRow.classList.add('book');
              
              let data1 = document.createElement('td');
      let data2 = document.createElement('td');
      let data3 = document.createElement('td');
      let data4 = document.createElement('td');
      let data5 = document.createElement('td');
      
      data1.innerText = book.name;
      data2.innerText = book.category;
      data3.innerText = book.price;
      data4.innerText = book.author;
      data5.innerText = book.isbn;
      
     
      
     
      
      bookRow.appendChild(data5);
      bookRow.appendChild(data1);
      bookRow.appendChild(data2);
      bookRow.appendChild(data3);
      bookRow.appendChild(data4);

      bookTable.appendChild(bookRow);
    });
  }
  

