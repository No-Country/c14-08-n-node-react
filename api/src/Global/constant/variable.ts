export const descriptionClient = (
  nombreLaweyers: string,
  nombreClients: string,
  fecha: Date,
  hora: string,
) => {
  return `
  Asunto: Confirmación de Reunión - Acceso a la Videoconferencia

  Estimado/a ${nombreClients},

  Nos complace confirmar la programación de su reunión con nuestro distinguido abogado ${nombreLaweyers}. La cita ha sido agendada con éxito para ${fecha} a las ${hora} para discutir [Breve descripción del tema].

  Para unirse a la videoconferencia con ${nombreLaweyers}, utilice el botón de acceso a la reunión al final de este mensaje. Le recomendamos acceder a la reunión unos minutos antes de la hora programada para asegurarse de una conexión estable y puntualidad.

  La confirmación de esta reunión significa que su caso está siendo atendido con la mayor prioridad y profesionalismo por parte de ${nombreLaweyers}. Estamos comprometidos a proporcionarle un servicio legal de alta calidad y a garantizar su satisfacción en cada paso del proceso.

  Por favor, si tiene alguna pregunta adicional o si necesita realizar ajustes en la programación, no dude en comunicarse con nosotros.

  Gracias por confiar en nuestros servicios legales. Estamos ansiosos por asistirle en su asunto legal.

  Atentamente,

  LegalHub
  `;
};

export const descriptionlaweys = (
  nombreLaweyers: string,
  nombreClients: string,
  fecha: Date,
  hora: string,
) => {
  return `
  Asunto:Confirmación de Reunión - Acceso a la Videoconferencia

  Estimado/a ${nombreLaweyers},

  Nos complace confirmar la programación de su reunión con el cliente ${nombreClients}. La cita ha sido agendada con éxito para ${fecha} a las ${hora}.

  Para unirse a la videoconferencia con el cliente ${nombreClients}, utilice el botón de acceso a la reunión al final de este mensaje. Le recomendamos acceder a la reunión unos minutos antes de la hora programada para asegurarse de una conexión estable y puntualidad.

  La confirmación de esta reunión significa que se ha reservado su tiempo para atender al cliente con la mayor prioridad y profesionalismo. Estamos comprometidos a brindar un servicio legal de alta calidad y a garantizar la satisfacción del cliente en cada paso del proceso.

  Por favor, si tiene alguna pregunta adicional o necesita realizar ajustes en la programación, no dude en comunicarse con nosotros.

  Gracias por su compromiso y dedicación. Estamos ansiosos por brindarle apoyo en este asunto legal.


  LegalHub
  `;
};
