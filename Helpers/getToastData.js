const getToastData = (status) => {
  let role = null;
  let text = null;

  switch (status) {
      case 500:
          role = "error"
          text = "Nepodařilo se připojit k databázi. Zkuste to prosím za pár minut."
          break;            
      case 404:
          role = "error"
          text = "Požadovanou hru se nepodařilo načíst. Zkontrolujte, jestli máte správný odkaz"
          break;
      case 1:
          role = "success"
          text = "Kroky byly uloženy"
          break;
      default:
          role = "info"
          text = "INFO"
          break;
  }

  return {role, text}
}

export default getToastData