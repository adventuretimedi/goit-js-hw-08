import throttle from "lodash.throttle";
const KEY = 'feedback-form-state';
const form = document.querySelector('.feedback-form');
const formData = {};

//записати у сховище обєкт з полями імейл та меседж (збереження setItem + stringify,бо обєкт)
const saveForm = (e) => {
    formData[e.target.name] = e.target.value;
    localStorage.setItem(KEY, JSON.stringify(formData));
}

form.addEventListener('input', throttle(saveForm, 500));


//зробити parce щоб читати і зберігати при перезавантаженні стори
function restoreForm() {
    const item = localStorage.getItem(KEY);
    if (item !== null) {
        // const formData = {email: "...", message: "..."}
        const userData = JSON.parse(item);
        form.email.value = userData.email === undefined ? "" : userData.email;
        form.message.value = userData.message === undefined ? "" : userData.message;
        console.log(item);
    }
}
restoreForm();

// видаляємо з локал сторедж після сабміту

form.addEventListener("submit", function handleSubmit(e) {
    
    e.preventDefault();
    console.log({ email: form.elements.email.value, message: form.elements.message.value });
    form.reset();
    localStorage.removeItem(KEY);
})


