const databaseService = () => {
  const knex = require("knex")({
    client: "pg",
    connection: {
      connectionString: process.env.DATABASE_URL,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      ssl: process.env.DB_SSL ? { rejectUnauthorized: false } : false,
    },
    acquireConnectionTimeout: 10000,
  });

  //tablas
  const tablaProductos = "productos";
  const tablaUsuarios = "usuarios";

  const mostrarProductos = () => {
    return knex(tablaProductos).select();
  };

  const crearProducto = ({ nombre, descripcion, precio, img, categoria }) => {
    return knex(tablaProductos).insert({
      nombre: nombre,
      descripcion: descripcion,
      precio: precio,
      img: img,
      categoria: categoria,
    }); //retorna una promise
  };

  const imgPorID = async (id) => {
    try {
      const data = await knex(tablaProductos)
        .select("img")
        .where("id", id)
        .first();
      return data.img;
    } catch (e) {
      throw e;
    }
  };

  const crearUsuario = ({ nombre, correo, pass }) => {
    return knex(tablaUsuarios).insert({
      nombre: nombre,
      correo: correo,
      pass: pass,
    });
  };

  const usuarioPorCorreo = async (correo) => {
    try {
      const user = await knex(tablaUsuarios)
        .select("correo", "pass")
        .where("correo", correo)
        .first();
      return user;
    } catch (e) {
      throw e;
    }
  };

  return {
    crearProducto,
    mostrarProductos,
    crearUsuario, //registro de usuarios
    usuarioPorCorreo, //sesion de usuarios
    imgPorID,
  };
};

module.exports = {
  databaseService,
};
