const getToastData = (id) => {

  return {
    500: {
      id: id,
      role: "error",
      header: "Chyba",
      text: "Chyba při ukládání. Kontaktujte nejvyššího vládce jedniček a nul."
    },
    200: {
      id: id,
      role: "success",
      header: "OK",
      text: "Kroky byly uloženy."
    },
    0: {
      id: id,
      role: "info",
      header: "INFO",
      text: "INFO"
    }
  }
}

export default getToastData