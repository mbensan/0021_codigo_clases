<div>
  <form id="insertar">
    <fieldset>
      <legend>Agregar nuevo ejercicio</legend>
      Nombre: <input name="nombre" /> <br />
      Series: <input maxlength="3" name="series" /> <br />
      Repeticiones: <input maxlength="3" name="repeticiones" /> <br />
      Descanso: <input maxlength="3" name="descanso" /> <br />
      <button>Agregar</button>
    </fieldset>
  </form>

  <form id="editar">
    <fieldset>
      <legend>Editar ejercicio</legend>
      Nombre:
      <select>
        <option selected disabled>Seleccione un ejercicio</option>
      </select>
      <br />
      Series: <input maxlength="3" name="series" /> <br />
      Repeticiones: <input maxlength="3" name="repeticiones" /> <br />
      Descanso: <input maxlength="3" name="descanso" /> <br />
      <button>Editar</button>
    </fieldset>
  </form>

  <form id="eliminar">
    <fieldset>
      <legend>Eliminar ejercicio</legend>
      Nombre:
      <select>
        <option selected disabled>Seleccione un ejercicio</option>
      </select>
      <br />
      <button>Eliminar</button>
    </fieldset>
  </form>
</div>

<table border="solid">
  <thead>
    <th>Nombre</th>
    <th>Series</th>
    <th>Repeticiones</th>
    <th>Descanso</th>
  </thead>

  <tbody></tbody>
</table>
<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.21.0/axios.min.js"></script>
<script>
  document.getElementById("insertar").addEventListener("submit", function (e) {
    e.preventDefault();
    const payload = prepararData(e);
    axios.post("http://localhost:3000/ejercicios", payload).then((res) => {
      res.data.code ? alert("Error codigo: " + res.data.code) : getData(e);
    });
  });

  document.getElementById("editar").addEventListener("submit", function (e) {
    e.preventDefault();
    const payload = prepararData(e);
    axios.put("http://localhost:3000/ejercicios", payload).then((res) => {
      res.data.code ? alert("Error codigo: " + res.data.code) : getData(e);
    });
  });

  document.getElementById("eliminar").addEventListener("submit", function (e) {
    e.preventDefault();
    const nombre = e.target[1].value;
    axios
      .delete("http://localhost:3000/ejercicios?nombre=" + nombre)
      .then((res) => {
        res.data.code ? alert("Error codigo: " + res.data.code) : getData(e);
      });
  });

  function prepararData(e) {
    const nombre = e.target[1].value;
    const series = e.target[2].value;
    const repeticiones = e.target[3].value;
    const descanso = e.target[4].value;
    return { nombre, series, repeticiones, descanso };
  }

  function cleanInputs(e) {
    if (e.target[3]) {
      e.target[1].value = "";
      e.target[2].value = "";
      e.target[3].value = "";
      e.target[4].value = "";
    }
  }
  async function getData(e) {
    if (e) cleanInputs(e);
    const data = await axios.get("http://localhost:3000/ejercicios");
    let tbody = document.getElementsByTagName("tbody")[0];
    const ejercicios = data.data.rows;

    // Carga de la tabla
    tbody.innerHTML = "";
    ejercicios.forEach((e) => {
      tbody.innerHTML += `
            <tr>
                <td>${e.nombre}</td>
                <td>${e.series}</td>
                <td>${e.repeticiones}</td>
                <td>${e.descanso} segundos</td>
            </tr>
        `;
    });

    // Carga de los selectores

    let selectores = document.getElementsByTagName("select");

    selectores[0].innerHTML =
      "<option selected disabled>Seleccione un ejercicio</option>";
    selectores[1].innerHTML =
      "<option selected disabled>Seleccione un ejercicio</option>";

    ejercicios.forEach((e, i) => {
      selectores[0].innerHTML += `
          <option value="${e.nombre}">${e.nombre}</option>
        `;
    });
    ejercicios.forEach((e, i) => {
      selectores[1].innerHTML += `
          <option value="${e.nombre}">${e.nombre}</option>
        `;
    });
  }

  getData();
</script>

<style>
  div {
    display: flex;
  }

  table {
    display: inline-block;
  }

  table td,
  th {
    padding: 10px;
    text-align: center;
  }
</style>
