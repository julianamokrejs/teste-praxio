const inputNome = document.getElementById("name");
const inputCpf = document.getElementById("cpf");
const inputTel = document.getElementById("tel");
const inputEmail = document.getElementById("email");
const inputPassword = document.getElementById("senha");
const inputCep = document.getElementById("cep");
const inputRua = document.getElementById("logradouro");
const inputNum = document.getElementById("numero");
const inputBairro = document.getElementById("bairro");

const erroCep = document.getElementById("cep-error")
const erroCpf = document.getElementById("cpf-error")
const erroSenha = document.getElementById("senha-error")

const botao = document.querySelector(".botao-cadastro");

const regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;


botao.addEventListener("click", function(e){
    e.preventDefault();

    if(!inputNome.value.trim()){
        inputNome.focus();
        return false;
    } else if(!inputCpf.value.trim()){
        inputCpf.focus();
        return false;
    } else if(!inputTel.value.trim()){
        inputTel.focus();
        return false;
    }else if(!inputEmail.value.trim()){
        inputEmail.focus();
        return false;
    } else if(!inputPassword.value.trim()){
        inputPassword.focus();
        return false;
    } else if(!inputCep.value.trim()){
        inputCep.focus();
        return false;
    } else if(!inputRua.value.trim()){
        inputRua.focus();
        return false
    } else if(!inputNum.value.trim()){
        inputNum.focus();
        return false;
    } else if(!inputBairro.value.trim()){
        inputBairro.focus();
        return false;
    } else if (inputPassword.value.length <=7){
        inputPassword.focus();
        // inputPassword.classList.add("error");
        // erroSenha.style.display = "block";
        return false;
    } 
    return window.location = "./index.html"
})

inputEmail.addEventListener('change', function(event){
  const erroEmail = document.querySelector('.email-erro')
  erroEmail.style.display= 'none'
  if(!inputEmail.value.match(regex)){
    erroEmail.style.display = 'block'
  } else {
    erroEmail.style.display='none'
  }
})
inputEmail.addEventListener('keydown', function(event){
    const erroEmail = document.querySelector('.email-erro')
    erroEmail.style.display= 'none'
  })

inputTel.addEventListener("focus" , function(event) {
    inputTel.value = "()-_"
    setTimeout(function() {
        inputTel.setSelectionRange(0, 0)
    }, 1)
})

inputTel.addEventListener("keydown", function(event) {
    event.preventDefault()
    if("0123456789".indexOf(event.key) !== -1
        && this.value.indexOf("_") !== -1) {
            this.value = this.value.replace(/_/, event.key)
            const next_index = this.value.indexOf("_")
            this.setSelectionRange(next_index, next_index)
    } else if (event.key === "Backspace") {
        this.value = this.value.replace(/(\d$)|(\d(?=\D+$))/, "_")
        const next_index = this.value.indexOf("_")
        this.setSelectionRange(next_index, next_index)
    }
})

inputCpf.addEventListener("focus" , function(event) {
    inputCpf.value = "..-_"
    setTimeout(function() {
        inputCpf.setSelectionRange(0, 0)
    }, 1)
})

inputCpf.addEventListener("keydown", function(event) {
    event.preventDefault()
    if("0123456789".indexOf(event.key) !== -1
        && this.value.indexOf("_") !== -1) {
            this.value = this.value.replace(/_/, event.key)
            const next_index = this.value.indexOf("_")
            this.setSelectionRange(next_index, next_index)
    } else if (event.key === "Backspace") {
        this.value = this.value.replace(/(\d$)|(\d(?=\D+$))/, "_")
        const next_index = this.value.indexOf("_")
        this.setSelectionRange(next_index, next_index)
    }
})

inputCep.addEventListener("focus" , function(event) {
    inputCep.value = "_-_"
    setTimeout(function() {
        inputCep.setSelectionRange(0, 0)
    }, 1);

})

inputCep.addEventListener("keydown", function(event) {
    event.preventDefault()
    if("0123456789".indexOf(event.key) !== -1
        && this.value.indexOf("_") !== -1) {
            this.value = this.value.replace(/_/, event.key)
            const next_index = this.value.indexOf("_")
            this.setSelectionRange(next_index, next_index)
    } else if (event.key === "Backspace") {
        this.value = this.value.replace(/(\d$)|(\d(?=\D+$))/, "_")
        const next_index = this.value.indexOf("_")
        this.setSelectionRange(next_index, next_index)
    }
})

inputCep.addEventListener("focus", function () {
    inputCep.classList.remove("cep-error")
    erroCep.style.display = "none"
    
})

inputCep.addEventListener("blur", function () {
    const cep = this.value.replace(/\D/g, "")

    inputRua.value = "..."
    inputBairro.value = "..."


    get_data(`https://viacep.com.br/ws/${cep}/json/`)
        .then(function(data) {
            data = JSON.parse(data)
            if (data.erro) {
                inputCep.classList.add("cep-error")
                erroCep.style.display = "block"

                inputRua.value = ""
                inputBairro.value = ""

            } else {
                inputRua.value = data.logradouro
                inputBairro.value = data.bairro
            }
        })
        .catch(function(error) {
            inputCep.classList.add("cep-error")
            erroCep.style.display = "block"

            inputRua.value = ""
            inputBairro.value = ""
        })
})