const startSignupNextBtn = document.querySelector('#start-signup-next');
const choosePricingNextBtn = document.querySelector('#choose-pricing-next');
const createAccountBtn = document.querySelector('#create-account-btn');
const carouselPrevBtn = document.querySelector('.carousel-control-prev');
const carouselNextBtn = document.querySelector('.carousel-control-next');
const createAccountForm = document.querySelector('#create-account-form');
const carouselBackLinks = document.querySelectorAll('.back-link');
const passwordInput = document.querySelector('input[name="password"]');

const carouselNext = event => {
    event.preventDefault();
    carouselNextBtn.click();
}

async function catchErrors() {
    let formData = new FormData(createAccountForm);
    const emailInput = document.querySelector('input[name="email"]');
    const passwordConfirm = document.querySelector('input[name="password_confirm"]');
    const emailError = document.querySelector('#email-error');
    const passwordError = document.querySelector('#password-error');
    let isError = false;
    let url = `/api/users`;
    let createAccount = `/create-account?`
    const showEmailError = () => {
        emailError.textContent = "Hmm, it looks like this account already exists. Are you sure you didn't mean to login?"
    }
    if (passwordInput.value !== passwordConfirm.value) {
        passwordError.textContent = "Your passwords don't match. Try again!";
        isError = true;
    }
    const res = await fetch(url).then(res => res.json()).then(res => {
        res.forEach(function(user){ 
            if (user.email === emailInput.value){
                showEmailError();
                isError = true;
            }
        })    
    })
    if (!isError) {
        fetch(createAccount,{
            method: 'POST',
            body: formData,
            
        })
        .then(function(){
            carouselNextBtn.click();
        })
    }
}

function createAccount(event) {
    event.preventDefault();
    catchErrors();
 }

 const carouselBack = event => {
     event.preventDefault();
     carouselPrevBtn.click();
 }

const passwordStrength = event => {
    console.log('hi')
}

passwordInput.addEventListener('keyup', passwordStrength);
createAccountBtn.addEventListener('click', createAccount);
startSignupNextBtn.addEventListener('click', carouselNext);
choosePricingNextBtn.addEventListener('click', carouselNext);
carouselBackLinks.forEach(el => el.addEventListener('click', carouselBack));