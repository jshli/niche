// const startSignupNextBtn = document.querySelector('#start-signup-next');
// const choosePricingNextBtn = document.querySelector('#choose-pricing-next');
// const createAccountBtn = document.querySelector('#create-account-btn');
// const carouselPrevBtn = document.querySelector('.carousel-control-prev');
// const carouselNextBtn = document.querySelector('.carousel-control-next');
// const createAccountForm = document.querySelector('#create-account-form');
// const carouselBackLinks = document.querySelectorAll('.back-link');
// const passwordInput = document.querySelector('input[name="password"]');

// const carouselNext = event => {
//     event.preventDefault();
//     carouselNextBtn.click();
// }


// async function catchErrors() {
//     let formData = new FormData(createAccountForm);
//     const emailInput = document.querySelector('input[name="email"]');
//     const passwordConfirmInput = document.querySelector('input[name="password_confirm"]');
//     const emailError = document.querySelector('#email-error');
//     const passwordError = document.querySelector('#password-error');
//     const firstNameInput = document.querySelector('input[name="first_name"]');
//     const lastNameInput = document.querySelector('input[name="last_name"]');
//     const phoneInput = document.querySelector('input[name="phone_number"]');
//     const formError = document.querySelector('#form-error');
//     let hasError = false;
//     let url = `/api/users`;
//     let createAccount = `/create-account?`

//     const inputFilled = input => {
//         if (input.value.length === 0){
//             return false
//         } else {
//             return true;
//         }
//     }
//     if (!inputFilled(emailInput) || !inputFilled(passwordInput) || !inputFilled(firstNameInput) || !inputFilled(lastNameInput) || !inputFilled(phoneInput)||!inputFilled(passwordConfirmInput)){
//         hasError = true;
//         formError.textContent = "Have you filled in all form fields?"
//     }
//     if (passwordInput.value !== passwordConfirmInput.value) {
//         passwordError.textContent = "Your passwords don't match. Try again!";
//         hasError = true;
//     }
//     const res = await fetch(url).then(res => res.json()).then(res => {
//         res.forEach(function(user){ 
//             if (user.email === emailInput.value){
//                 emailError.textContent = "Hmm, it looks like this account already exists. Are you sure you didn't mean to login?";
//                 hasError = true;
//             }
//         })    
//     })
//     if (!hasError) {
//         fetch(createAccount,{
//             method: 'POST',
//             body: formData,
            
//         })
//         .then(function(){
//             carouselNextBtn.click();
//         })
//     }
// }

// function createAccount(event) {
//     event.preventDefault();
//     catchErrors();
//  }

//  const carouselBack = event => {
//      event.preventDefault();
//      carouselPrevBtn.click();
//  }

// const passwordStrength = event => {

// }

// passwordInput.addEventListener('keyup', passwordStrength);
// createAccountBtn.addEventListener('click', createAccount);
// startSignupNextBtn.addEventListener('click', carouselNext);
// choosePricingNextBtn.addEventListener('click', carouselNext);
// carouselBackLinks.forEach(el => el.addEventListener('click', carouselBack));