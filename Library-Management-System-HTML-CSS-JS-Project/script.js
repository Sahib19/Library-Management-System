
let admin_login_btn=document.querySelector("#admin-login-btn");
let user_login_btn=document.querySelector("#user-login-btn");
let user_register_btn=document.querySelector("#user-register-btn");

let admin=document.querySelector(".admin-login");
let user_login=document.querySelector(".user-login");
let user_register=document.querySelector(".user-register");




admin_login_btn.addEventListener("click",()=>
{
 
        admin.style.display = "block";
        user_login.style.display="none";
        user_register.style.display="none";
    
})

user_login_btn.addEventListener("click",()=>
    {
  
            admin.style.display = "none";
            user_login.style.display="block";
            user_register.style.display="none";
        
    })

    user_register_btn.addEventListener("click",()=>
        {
          
                admin.style.display = "none";
                user_login.style.display="none";
                user_register.style.display="block";
            
        })




// ------------------------------------------------------------------------------------------


let admin_login_form=document.querySelector("#admin-form");
let user_login_form=document.querySelector("#user-form");
let user_register_form=document.querySelector("#user-register-form");


admin_login_form.addEventListener("submit",(e)=>{
        
        e.preventDefault();
        
        let email_id=admin_login_form.querySelector(".email-id");
        let password=admin_login_form.querySelector(".password");
   
    
    if (email_id.value === "bhattiwaqar5656@gmail.com" && password.value === "5656") {
        
        window.location.href = "admin_dashboard.html"; 
    } else {
        alert("Invalid email or password");
    }

                
})


user_login_form.addEventListener("submit",(e)=>{
        
        e.preventDefault();
        
        let email_id=user_login_form.querySelector(".email-id");
        let password=user_login_form.querySelector(".password");
      
    
    if (email_id.value === "bhattiwaqar5656@gmail.com" && password.value === "5757") {
        
        window.location.href = "user_dashboard.html"; 
    } else {
        alert("Invalid email or password");
    }

                
})


user_register_form.addEventListener("submit",(e)=>{
        
        e.preventDefault();
        window.location.href = "user_dashboard.html"; 
        
        
//         let email_id=user_register_formform.querySelector(".email-id");
//         let password=user_register_form.querySelector(".password");
      
    
//     if (email_id.value === "bhattiwaqar5656@gmail.com" && password.value === "5757") {
        
//     } else {
//         alert("Invalid email or password");
//     }

                
})