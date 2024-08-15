Dogpedia Frontend
Este es el frontend de la aplicación Dogpedia, desarrollado en TypeScript y React. El proyecto está diseñado para gestionar razas de perros, ofreciendo una interfaz amigable y responsiva para la administración de los datos. El frontend consume un backend desarrollado en Node.js que maneja las operaciones CRUD y la sincronización de datos.

Estructura del Proyecto
src/App.tsx: Archivo principal de la aplicación que configura las rutas y renderiza los componentes principales.
types/media.d.ts: Archivo de definición de tipos para importar archivos multimedia como videos.
components/: Carpeta que contiene los componentes de la aplicación, incluyendo:
DogBreedList: Lista de todas las razas de perros.
DogBreedForm: Formulario para agregar o editar razas de perros.
DogBreedDetails: Detalles específicos de una raza de perro.
DogBreedEdit: Componente para editar una raza de perro existente.
api/dogBreedApi.ts: Módulo que maneja las solicitudes a la API del backend para operaciones CRUD.
Configuración del Proyecto
Pre-requisitos
Antes de comenzar, asegúrate de tener instalados los siguientes programas en tu sistema:

Node.js: Descargar e instalar Node.js.
Instalación
Clona el Repositorio:

bash
Copiar código
git clone https://github.com/danielamaya1908/dogpedia-frontend.git
cd dogpedia-frontend
Instala las Dependencias:

Asegúrate de estar en el directorio del proyecto y luego ejecuta:

bash
Copiar código
npm install
Ejecución del Proyecto
Para iniciar la aplicación en modo de desarrollo, ejecuta:

bash
Copiar código
npm start
Esto iniciará el servidor de desarrollo y abrirá la aplicación en tu navegador por defecto en la dirección http://localhost:3000.

Estructura del Código
App.tsx
Este archivo configura el enrutamiento de la aplicación utilizando react-router-dom. Define las siguientes rutas:

/: Muestra la lista de razas de perros (DogBreedList).
/dogbreeds: Muestra el formulario para agregar una nueva raza de perro (DogBreedForm).
/dogbreeds/edit/:id: Muestra el formulario para editar una raza de perro existente (DogBreedEdit).
/dogbreeds/:id: Muestra los detalles de una raza de perro (DogBreedDetails).
api/dogBreedApi.ts
Este archivo contiene las funciones para interactuar con la API del backend:

getAllDogBreeds: Obtiene todas las razas de perros.
getDogBreedById: Obtiene una raza de perro por su ID.
createDogBreed: Crea una nueva raza de perro.
updateDogBreed: Actualiza una raza de perro existente.
deleteDogBreed: Elimina una raza de perro.
tsconfig.json
La configuración de TypeScript para este proyecto. Incluye configuraciones para utilizar módulos ESNext, JSX para React, y otras opciones que aseguran un desarrollo robusto en TypeScript.

Estilos y Recursos
Tailwind CSS: Se utiliza para la estilización de los componentes.
Assets: Carpeta que contiene imágenes y videos utilizados en la aplicación.
Despliegue
Para desplegar esta aplicación, asegúrate de configurar las variables de entorno adecuadas y de tener acceso al backend implementado. Puedes utilizar servicios como Vercel, Netlify o cualquier otro proveedor de hosting que soporte aplicaciones React.

Contribuciones
Las contribuciones son bienvenidas. Por favor, abre un issue o envía un pull request para mejoras o correcciones.

Licencia
Este proyecto está bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.

Contacto
Para cualquier consulta o sugerencia, por favor contacta a danijcdm.com@gmail.com.