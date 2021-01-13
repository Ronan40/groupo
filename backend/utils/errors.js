module.exports.signUpErrors = (err) => {
    let error = { pseudo: "", email: "", password: "" };
  
    if (err.message.includes("pseudo"))
      error.pseudo = "Pseudo incorrect ou déjà pris";
  
    if (err.message.includes("email")) errors.email = "Email incorrect";
  
    if (err.message.includes("password"))
      error.password = "Le mot de passe doit faire 6 caractères minimum";
  
    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("pseudo"))
      error.pseudo = "Ce pseudo est déjà pris";
  
    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("email"))
      error.email = "Cet email est déjà enregistré";
  
    return error;
  };
  
  module.exports.signInErrors = (err) => {
    let error = { email: '', password: ''}
  
    if (err.message.includes("email")) 
      error.email = "Email inconnu";
    
    if (err.message.includes('password'))
      error.password = "Le mot de passe ne correspond pas"
  
    return error;
  }
  
  /*module.exports.uploadErrors = (err) => {
    let error = { format: '', maxSize: ""};
  
    if (err.message.includes('invalid file'))
      error.format = "Format incompatabile";
  
    if (err.message.includes('max size'))
      error.maxSize = "Le fichier dépasse 500ko";
  
    return error
  }*/