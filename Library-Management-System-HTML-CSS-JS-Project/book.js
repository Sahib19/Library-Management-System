




import { 
  books, 
  categories, 
  authors,
  createInput, 
  createSelect,
} from './source.js';





let lastisbn=700;

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

    
    
    
    
    
    
    
    function openUpdateForm(bookToUpdate) {
      const input_form = document.querySelector("#update-book-information");
      input_form.style.display = "block";
      input_form.innerHTML = "";
      
      const heading = document.createElement('h1');
      heading.innerText = "Update Book Information";
      heading.style.textAlign = "center";
      
  
      
      let inputObject1={
        type:'input',
        className:'take-input',
        placeholder:bookToUpdate.name,
        required:true
      }
      let inputObject2={
        type:'input',
        className:'take-input',
        placeholder:bookToUpdate.price,
        required:true
      }
      const booknameInput = createInput(inputObject1);
      const bookpriceInput = createInput(inputObject2);
      bookpriceInput.type = 'number';
      
      let selectorObject={
        className:'take-input',
        options:categories,
        required:true
      }
      const bookcategoryInput = createSelect( selectorObject);
    
      
      let selectorObjectforAuthor={
        className:'take-input',
        options: authors.map(author => author.name),
        required:true
      }
      const bookAuthorInput = createSelect( selectorObjectforAuthor);
      
      const submit_form_btn = document.createElement('button');
      submit_form_btn.textContent = "Update Book";
      submit_form_btn.id = "submit_form_btn";
      
      const elements = [
        heading,
        "Name", booknameInput,
        "Price", bookpriceInput,
        "Category", bookcategoryInput,
        "Author", bookAuthorInput,
        submit_form_btn
      ];
    
      elements.forEach(el => {
        if (typeof el === 'string') {
        input_form.appendChild(document.createTextNode(el));
      } else {
            input_form.appendChild(el);
        }
      });
      
    
      // let submit_form_btn = document.querySelector("#submit_form_btn");
      input_form.addEventListener('submit', function(event) {
    event.preventDefault();
    bookToUpdate.name = booknameInput.value;
    bookToUpdate.category = bookcategoryInput.value;
    bookToUpdate.price = bookpriceInput.value;
    bookToUpdate.author = bookAuthorInput.value;
    

    alert("book ubdated sucessfully");
    input_form.style.display="none";
    const bookTable = document.querySelector("#book-table");
    bookTable.style.display='table';
    let add_book_btn = document.querySelector("#add-book");
    add_book_btn.style.display='block';

    updateDisplay();

  });

    }
    
    


    
    
    function openAddBookForm() {
      const input_addBook_form = document.querySelector("#add-book-form");
      input_addBook_form.style.display = "block";
      input_addBook_form.innerHTML = "";
      
      const heading = document.createElement('h1');
      heading.innerText = "Add New Book";
      heading.style.textAlign = "center";
    
      
      let inputObject1={
        type:'input',
        className:'take-input',
        placeholder:'Enter Name',
        required:true
      }

      const booknameInput = createInput(inputObject1);
       
      let inputObject2={
        type:'input',
        className:'take-input',
        placeholder:'Enter Price',
        required:true
      }

      const bookpriceInput = createInput(inputObject2);
      bookpriceInput.type = 'number';
    
      let selectorObject={
        className:'take-input',
        options:categories,
        required:true
      }

      const bookcategoryInput = createSelect(selectorObject);

      let selectorObjectforAuthor={
        className:'take-input',
        options: authors.map(author => author.name),
        required:true
      }


      const bookAuthorInput = createSelect(selectorObjectforAuthor);
    
      const submit_book_btn = document.createElement('button');
      submit_book_btn.textContent = "Submit Book";
      submit_book_btn.id = "submit_book_btn";
    
      const elements = [
        heading,
        "Name", booknameInput,
        "Price", bookpriceInput,
        "Category", bookcategoryInput,
        "Author", bookAuthorInput,
        submit_book_btn
      ];
    
      elements.forEach(el => {
        if (typeof el === 'string') {
          input_addBook_form.appendChild(document.createTextNode(el));
        } else {
          input_addBook_form.appendChild(el);
        }
    });
    
     
  // let submit_form_btn = document.querySelector("#submit_form_btn");
  input_addBook_form.addEventListener('submit', function(event) {
    event.preventDefault();
    
   lastisbn+=4;
    
    let newBook = {
      name: booknameInput.value,
      category: bookcategoryInput.value,
      price: bookpriceInput.value,
      author: bookAuthorInput.value,
      isbn: lastisbn.toString(),
      issueStatus: false
    };
    
    books.push(newBook);
    alert("book added sucessfully");
    input_addBook_form.style.display="none";
    const bookTable = document.querySelector("#book-table");
    bookTable.style.display='table';
    let add_book_btn = document.querySelector("#add-book");
    add_book_btn.style.display='block';
    
    updateDisplay();
    
  });
  // Return the original bookToUpdate object

    }
    


    
 function displayBookDetail(isbn){
  const bookdetailDiv = document.querySelector("#book-detail");
  bookdetailDiv.style.display="block";
  let index = books.findIndex(b => b.isbn === isbn);
  if (index !== -1) {
  
    
    let book=books[index];
    bookdetailDiv .innerHTML = ''; // Clear previous content
    
    
   let bookname=document.createElement('h1');
   bookname.style.textAlign='center';
    bookname.innerText=book.name;

    let bookdetail=document.createElement('div');
    bookdetail.innerText="LastTime Borrow : " + book.description.lasttimeborrow;
    bookdetail.style.textAlign='center';
    let detail=document.createElement('div');

    detail.textContent=book.description.detail;
    detail.style.textAlign='center';
   

    let endl=document.createElement('br');

    
    
  
    bookdetailDiv.appendChild(bookname);
    bookdetailDiv.appendChild(endl);
    bookdetailDiv.appendChild(bookdetail);
    bookdetailDiv.appendChild(detail)
    
  }
            
  
   
}









function deleteBook(isbn) {
  let index = books.findIndex(book => book.isbn === isbn);
  if (index !== -1) {
    books.splice(index, 1);
    updateDisplay();

    alert("Book deleted successfully.");
  }
}
function updateBook(isbn) {
  let index = books.findIndex(book => book.isbn === isbn);
  if (index !== -1) {

    let bookToUpdate = books[index];
    
    openUpdateForm(bookToUpdate);
    
  }
}



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
            <th>Action</th>
            </tr>`;
            
            books.forEach(book => {
              const bookRow = document.createElement('tr');
              // bookRow.classList.add('book');
              
              let data1 = document.createElement('td');
      let data2 = document.createElement('td');
      let data3 = document.createElement('td');
      let data4 = document.createElement('td');
      let data5 = document.createElement('td');
      let actionCell = document.createElement('td');
      
      data1.innerText = book.name;
      data2.innerText = book.category;
      data3.innerText = book.price;
      data4.innerText = book.author;
      data5.innerText = book.isbn;
      
      let deleteBtn = document.createElement('button');
      let updateBtn = document.createElement('button');
      deleteBtn.innerText = "Delete";
      updateBtn.innerText="Update";
      
      deleteBtn.addEventListener('click',(e)=>{ 
                           // why it is not working when directly write deleteBook function
        deleteBook(book.isbn)
        e.stopPropagation();
      });                  
        
        updateBtn.addEventListener("click",(e)=>
          {
            bookTable.style.display = 'none';
            let add_book_btn = document.querySelector("#add-book");
                  add_book_btn.style.display='none';
           
           
            
            updateBook(book.isbn);
            e.stopPropagation();
        })
        
        actionCell.appendChild(deleteBtn);
      actionCell.appendChild(updateBtn);
      
     bookRow.addEventListener("click",()=>
    {
      bookTable.style.display = 'none';
      let add_book_btn = document.querySelector("#add-book");
            add_book_btn.style.display='none';
     
      displayBookDetail(book.isbn);
     
    })

      bookRow.appendChild(data5);
      bookRow.appendChild(data1);
      bookRow.appendChild(data2);
      bookRow.appendChild(data3);
      bookRow.appendChild(data4);
      bookRow.appendChild(actionCell);
      bookTable.appendChild(bookRow);
    });
  }
  


  
  
  
  let add_book_btn = document.querySelector("#add-book");
  
  add_book_btn.addEventListener('click',()=>
    {
    const bookTable = document.querySelector("#book-table");
    bookTable.style.display="none";
    add_book_btn.style.display='none';
    const bookdetailDiv = document.querySelector("#book-detail");
    bookdetailDiv.style.display="none";
 
    openAddBookForm();
  })

  