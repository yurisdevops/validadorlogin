const btnRegistrar = document.querySelector("#btn-registrar");
const armazenamento = [];

btnRegistrar.addEventListener("click", function (e) {
  e.preventDefault();
  const form = document.querySelector("#form");

  function User(nome, email, senha, cpf) {
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    this.cpf = cpf;
  }

  User.prototype.registrar = function () {
    const userNome = document.querySelector("#name-signup").value;
    const userEmail = document.querySelector("#email-signup").value;
    const userSenha = document.querySelector("#password-signup").value;
    const userSenhaConfirm = document.querySelector("#password-signup-confirm").value;
    const userTermos = document.querySelector("#terms");
    const userCPF = document.querySelector("#cpf-signup").value;

    const cpf = new ValidadeCPF(userCPF);


    checkEmail = armazenamento.filter((obj) => {
      return obj.email === userEmail;
    }).length;

    if (checkEmail) {
      alert(`Email já cadastrado`);
      return;
    }
    if (userSenha !== userSenhaConfirm) {
      return this.criaMsg(`Senhas Diferentes`);
    }
    if (userEmail === "" || userSenha === "" || userTermos.checked === false) {
      return;
    }
    if (cpf.enviar()) return true;

    armazenamento.push(new User(userNome, userEmail, userSenha, userCPF));
    const registroJSON = JSON.stringify(armazenamento);
    localStorage.setItem("registro", registroJSON);
  };

  User.prototype.criaP = function () {
    const p = document.createElement("p");
    return p;
  };

  User.prototype.criaMsg = function (msg) {
    const mensagem = document.querySelector("#msg");
    mensagem.innerHTML = "";
    const p = this.criaP();
    mensagem.appendChild(p);
    p.innerHTML = msg;
  };

  function ValidadeCPF(cpfEnviado) {
    Object.defineProperty(this, "cpfLimpo", {
      enumerable: true,
      get: function () {
        return cpfEnviado.replace(/\D/g, "");
      },
    });
  }

  ValidadeCPF.prototype.valida = function () {
    if (typeof this.cpfLimpo === "undefined") return false;
    if (this.cpfLimpo.length !== 11) return false;
    if (this.isSequencia()) return false;

    const cpfParcial = this.cpfLimpo.slice(0, -2); //está inicando do zero e terminado no menos dois
    const digito1 = this.criaDigito(cpfParcial);
    const digito2 = this.criaDigito(cpfParcial + digito1);

    const novoCPF = cpfParcial + digito1 + digito2;
    return novoCPF === this.cpfLimpo;
  };

  ValidadeCPF.prototype.criaDigito = function (cpfParcial) {
    const cpfArray = Array.from(cpfParcial);
    //   console.log(cpfArray);

    let regresivo = cpfArray.length + 1;

    const total = cpfArray.reduce((ac, val) => {
      ac += regresivo * Number(val);
      regresivo--;
      return ac;
    }, 0);

    const digito = 11 - (total % 11);
    return digito > 9 ? "0" : String(digito);
  };

  ValidadeCPF.prototype.isSequencia = function () {
    const sequencia = this.cpfLimpo[0].repeat(this.cpfLimpo.length);
    return sequencia === this.cpfLimpo;
  };

  ValidadeCPF.prototype.enviar = function () {
    if (this.valida()) {
      true;
      return;
    } else {
      return this.criaMsg(`CPF INVÁLIDO`);
    }
  };

  ValidadeCPF.prototype.criaP = function () {
    const p = document.createElement("p");
    return p;
  };

  ValidadeCPF.prototype.criaMsg = function (msg) {
    const mensagem = document.querySelector("#msg-cpf");
    mensagem.innerHTML = "";
    const p = this.criaP();
    mensagem.appendChild(p);
    p.innerHTML = msg;
  };

  
  const banco = new User();
  banco.registrar();
  form.reset();
});
