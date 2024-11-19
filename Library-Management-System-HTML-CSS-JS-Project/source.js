export const authors = [
    {
      name: "William Shakespeare",
      nationality: "English"
    },
    {
      name: "Jane Austen",
      nationality: "English"
    },
    {
      name: "Leo Tolstoy",
      nationality: "Russian"
    }
    
  ];

  export const categories = [
    
    "Frontend Development",
    "Backend Development",
    "Data Management",
    "Functional Programming",
    "Object-Oriented Programming (OOP)",
    "Security",
    
];

export const users = [
  {
      name: "John Doe",
      CNIC:"34109-958899-9",
      mobilePhone: "123-456-7890",
      email: "johndoe@example.com",
      password: "password123",
      gender: "male"
  },
  {
       name: "Jane Smith",
      CNIC:"31609-958899-9",
      mobilePhone: "098-765-4321",
      email: "janesmith@example.com",
      password: "password456",
      gender: "female"
  },
  {

      name: "Sam Johnson",
      CNIC:"31109-958899-9",
      mobilePhone: "555-555-5555",
      email: "samjohnson@example.com",
      password: "password789",
      gender: "male"
  },
  {
      name: "Emily Brown",
      CNIC:"34509-958899-9",
      mobilePhone: "444-444-4444",
      email: "emilybrown@example.com",
      password: "password101",
      gender: "female"
  }
];


export const books = [
  { 
      name: "OOP", 
      category: "programming", 
      price: 30, 
      author: "Robert C. Martin", 
      isbn: "123", 
      issBook: { 
          issueStatus: false, 
          issueDate: "" 
      },
      description: {
          lasttimeborrow: "Ali",
          detail: "This is about main concepts of programming in which we study about classes and objects."
      }
  },
  { 
      name: "Python", 
      category: "AI", 
      price: 36, 
      author: "Stuart Russell", 
      isbn: "234", 
      issBook: { 
          issueStatus: true, 
          issueDate: "2020-05-20T12:00:00"
      },
      description: {
          lasttimeborrow: "Sara",
          detail: "An introduction to Python programming with a focus on artificial intelligence applications."
      }
  },
  { 
      name: "React", 
      category: "programming", 
      price: 28, 
      author: "Kirupa Chinnathambi", 
      isbn: "890", 
      issBook: { 
          issueStatus: false, 
          issueDate: "" 
      },
      description: {
          lasttimeborrow: "John",
          detail: "A guide to building dynamic web applications using React."
      }
  },
  { 
      name: "JavaScript: The Good Parts", 
      category: "programming", 
      price: 25, 
      author: "Douglas Crockford", 
      isbn: "567", 
      issBook: { 
          issueStatus: true, 
          issueDate: "2020-05-21T10:30:00"
      },
      description: {
          lasttimeborrow: "David",
          detail: "An exploration of the best features of JavaScript."
      }
  },
  { 
      name: "Clean Code", 
      category: "programming", 
      price: 32, 
      author: "Robert C. Martin", 
      isbn: "456", 
      issBook: { 
          issueStatus: false, 
          issueDate: "" 
      },
      description: {
          lasttimeborrow: "Emma",
          detail: "A handbook of agile software craftsmanship, focusing on writing clean and maintainable code."
      }
  },
  { 
      name: "Artificial Intelligence: A Modern Approach", 
      category: "AI", 
      price: 40, 
      author: "Peter Norvig", 
      isbn: "789", 
      issBook: { 
          issueStatus: true, 
          issueDate: "2020-05-22T15:45:00"
      },
      description: {
          lasttimeborrow: "Olivia",
          detail: "A comprehensive introduction to the theory and practice of artificial intelligence."
      }
  },
  { 
      name: "Database Systems: The Complete Book", 
      category: "Database", 
      price: 38, 
      author: "Hector Garcia-Molina", 
      isbn: "321", 
      issBook: { 
          issueStatus: false, 
          issueDate: "" 
      },
      description: {
          lasttimeborrow: "Sophia",
          detail: "An all-encompassing guide to database systems and technologies."
      }
  },
  { 
      name: "The Pragmatic Programmer", 
      category: "programming", 
      price: 29, 
      author: "Andrew Hunt", 
      isbn: "654", 
      issBook: { 
          issueStatus: false, 
          issueDate: "" 
      },
      description: {
          lasttimeborrow: "Liam",
          detail: "A practical guide for software developers to improve their programming practices."
      }
  }
];




export const createInput = (object)=> {
    const input = document.createElement(object.type);
    input.className = object.className;
    input.placeholder = object.placeholder;
    input.required=object.required;
    return input;
  };


  export const createSelect= (object ) => {
    const select = document.createElement('select');
    select.className = object.className;

    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Select an option'; 
    select.appendChild(defaultOption);

    object.options.forEach(optionValue => {
      const Option = document.createElement('option');
      Option.value = optionValue;
      Option.textContent = optionValue;
      select.appendChild(Option);
    });
    select.required=object.required;

    return select;
  };



