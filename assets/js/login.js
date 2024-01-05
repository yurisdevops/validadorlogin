const btnLogin = document.querySelector("#btn-login");
const armazenamentoLogin = [];
btnLogin.addEventListener("click", function (e) {
  e.preventDefault();

  const loginLocal = localStorage.getItem("registro");
  const loginJson = JSON.parse(loginLocal);

  function UserLogin(email, cpf, senha) {
    this.email = email;
    this.cpf = cpf;
    this.senha = senha;
  }

  UserLogin.prototype.validarLogin = function () {
    const userName = document.querySelector("#email").value;
    const userSenha = document.querySelector("#password").value;
    let isValidaLogin = false;

    for (let i in loginJson) {
      if (
        (userName === loginJson[i].email || loginJson[i].cpf) &&
        userSenha === loginJson[i].senha
      ) {
        isValidaLogin = true;
        break;
      } else {
        isValidaLogin = false;
      }
    }
    armazenamentoLogin.push(new UserLogin(userName, userSenha));
    const armazenamentoLoginJSON = JSON.stringify(armazenamentoLogin);
    localStorage.setItem("login", armazenamentoLoginJSON);
    if (isValidaLogin === true) {
      alert`LOGIN EFETUADO`;
      window.location.href = "./home.html";
    } else {
      alert`DADOS INCORRETOS`;
      const form = document.querySelector("#form-login");
      form.reset();
    }
  };

  const loginValidado = new UserLogin();
  loginValidado.validarLogin();
});
