# TheGymMondelo

TheGymMondelo -> Tu Web de asesoría profesional ideal para conseguir ese gran cambio físico.

---

## Descripción General

La web del gimnasio será una plataforma integral que permitirá a los usuarios gestionar diversas actividades relacionadas con su salud y estado físico. La plataforma será desarrollada utilizando Laravel como framework backend y React como framework frontend, todo conectado a través de Inertia, y contará con una serie de funcionalidades destinadas a mejorar la experiencia del usuario y facilitar la gestión de las actividades del gimnasio.  

---

## Características Principales

Lista de las funcionalidades principales del proyecto:

- Adquisición de distintas dietas dependiendo de tu objetivo.
- Diferentes clases con nuestros entrenadores más profesionales.
- Programas de ejercicios diferenciales cada uno con un campo específico.
- Varias suscripciones con diferentes ventajas dependiendo de cual adquieras.
- Servicio de recompensas para usuarios activos en nuestra tienda.
- Apartado para conocer nuestros entrenadores.
- Tienda online con variedad de productos fitness.
- Blogs de noticias utilizado por los entrenadores para motivar, ayudar y aconsejar clientes.
- Foro interactivo donde los clientes conversarán entre ellos con un sistema de comentarios y respuestas.
- Interfaz de diario donde se podrá registrar los ejercicios realizados en el dia y llevar su desarrollo temporal.
- Apartado de contacto donde podrás contactar con el soporte o hablar con nuestro chatbot interactivo.
- Típico perfil del usuario donde tendremos toda la información del usuario, tanto datos, puntos, servicios adquiridos y facturas.

---

## Tecnologías Utilizadas

Para el desarrollo de la web se han utilizado diferentes tecnologías como :  

- **Frontend:** React.js, Tailwind CSS.
- **Backend:** Laravel 10.0.
- **Base de datos:** PostgreSQL 12.
- **Comunicación:** Inertia.js.
- **Lenguajes:** HTML5, CSS, JS, PHP.
- **Plugins:** SweetAlert, DayJS, Chartjs ...

---

## Instalación de Tecnologías Necesarias

### Instalar PHP

```bash
sudo apt install -y software-properties-common apt-transport-https ca-certificates lsb-release
sudo add-apt-repository ppa:ondrej/php
sudo apt update
sudo apt install -y php
sudo apt install -y php-{bcmath,bz2,intl,gd,mbstring,mysql,zip,xml,curl}
php -v
```

### Instalar Composer

```bash
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php -r "echo hash_file('sha384', 'composer-setup.php') . PHP_EOL;"
sudo php composer-setup.php --install-dir=/usr/local/bin --filename=composer
composer -V
```

### Instalar NPM

```bash
sudo apt install curl -y
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install nodejs -y
curl --version
node -v
npm -v
```

### Instalar Git

```bash
sudo apt update
sudo apt install git -y
git config --global user.name "Tu Nombre"
git config --global user.email "tuemail@ejemplo.com"
git config --list
git clone URL_DEL_REPOSITORIO
```

### Instalar PostgreSQL

```bash
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
sudo apt update
sudo apt install -y postgresql
psql --version
sudo -u postgres psql

CREATE USER josee022 WITH PASSWORD 'josee022';
CREATE DATABASE josee022;
ALTER DATABASE josee022 OWNER TO josee022;
GRANT ALL PRIVILEGES ON DATABASE josee022 TO josee022;
```

---

## Guía de Instalación del Proyecto

1. **Clonar el repositorio:**

   ```bash
   git clone https://github.com/josee022/TheGymMondelo
   ```

2. **Navegar al directorio del proyecto:**

   ```bash
   cd TheGymMondelo
   ```

3. **Renombrar el archivo de configuración:**

   Copia el archivo `CopiaPega` y renómbralo a `.env`.

4. **Configurar la base de datos:**

   - Crea una base de datos llamada `josee022`.
   - Configura el usuario y la contraseña como `josee022` en el archivo `.env`.

5. **Instalar dependencias del backend:**

   ```bash
   composer install
   composer dump-autoload
   sudo apt install php-pgsql -y
   php -m | grep pdo_pgsql
   sudo reboot
   ```

6. **Instalar dependencias del frontend:**

   ```bash
   sudo apt update && sudo apt autoclean && sudo apt autoremove -y
   sudo apt --fix-broken install
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt install -y nodejs
   npm install
   ```

7. **Configurar y migrar la base de datos:**

   ```bash
   php artisan migrate
   php artisan db:seed
   php artisan storage:link
   ```

8. **Iniciar la aplicación:**

   - Inicia el backend:
     ```bash
     php artisan serve
     ```
   - Inicia el frontend:
     ```bash
     npm run dev
     ```

9. **Acceso a la aplicación:**

   Abre tu navegador y accede a la URL proporcionada por el comando `php artisan serve`, normalmente:

   ```
   http://127.0.0.1:8000
   ```

---

## Requisitos Funcionales del Proyecto

### CATÁLOGO DE REQUISITOS

(Tanto los requisitos mínimos generales como los requisitos de las partes de cliente, servidor, diseño, despliegue y propios.)

| Requisito (cód. + desc. corta)                                                      | Prioridad  | Tipo      | Complejidad | Entrega |
| ----------------------------------------------------------------------------------- | ---------- | --------- | ----------- | ------- |
| **REQUISITOS BÁSICOS**                                                              |            |           |             |         |
| Requisitos convertidos en incidencias (issues)                                      | Mínimo     | Técnico   | Fácil       | v1      |
| Código fuente                                                                       | Mínimo     | Técnico   | Fácil       | v1      |
| Estilo del código                                                                   | Mínimo     | Técnico   | Fácil       | v1      |
| Tres lanzamientos (v1, v2 ,v3)                                                      | Mínimo     | Técnico   | Fácil       | v1      |
| Descripción principal (readme.md)                                                   | Mínimo     | Técnico   | Fácil       | v1      |
| Administración y resolución de incidencias                                          | Mínimo     | Técnico   | Fácil       | v1      |
| Usar etiquetas y hitos                                                              | Mínimo     | Técnico   | Fácil       | v1      |
| Rama master reflejando la aplicación                                                | Mínimo     | Técnico   | Fácil       | v1      |
| Usar GitHub Projects para la gestión general del proyecto                           | Mínimo     | Técnico   | Fácil       | v1      |
| Finalizar cada iteración                                                            | Mínimo     | Técnico   | Fácil       | v1      |
| **REQUISITOS CLIENTE**                                                              |            |           |             |         |
| Validación de formularios                                                           | Mínimo     | Técnico   | Fácil       | v1      |
| Gestión de ventanas                                                                 | Mínimo     | Técnico   | Fácil       | v1      |
| Mecanismo de manejo de eventos                                                      | Mínimo     | Técnico   | Fácil       | v1      |
| Uso del DOM                                                                         | Mínimo     | Técnico   | Fácil       | v1      |
| Mecanismos de almacenamiento                                                        | Mínimo     | Técnico   | Fácil       | v1      |
| Ajax                                                                                | Mínimo     | Técnico   | Fácil       | v1      |
| React                                                                               | Mínimo     | Técnico   | Fácil       | v1      |
| Incluir al menos un plugin no trabajado en clase                                    | Mínimo     | Técnico   | Fácil       | v1      |
| **REQUISITOS SERVIDOR**                                                             |            |           |             |         |
| PHP 8.0 o superior                                                                  | Mínimo     | Técnico   | Fácil       | v1      |
| Laravel Framework 10.0 ó superior                                                   | Mínimo     | Técnico   | Fácil       | v1      |
| PostgreSQL versión 12 ó superior                                                    | Mínimo     | Técnico   | Fácil       | v1      |
| Despliegue en local o en algún cloud computing                                      | Mínimo     | Técnico   | Fácil       | v1      |
| Pruebas funcionales.                                                                | Mínimo     | Técnico   | Fácil       | v1      |
| Aplicación escalable                                                                | Mínimo     | Técnico   | Fácil       | v1      |
| Comunicación asíncrona                                                              | Mínimo     | Técnico   | Fácil       | v1      |
| **REQUISITOS DISEÑO**                                                               |            |           |             |         |
| Documentación del diseño en figma                                                   | Mínimo     | Técnico   | Fácil       | v1      |
| Estructurar el contenido usando HTML5                                               | Mínimo     | Técnico   | Fácil       | v1      |
| Presentación mediante CSS                                                           | Mínimo     | Técnico   | Fácil       | v1      |
| Transiciones, transformaciones, animaciones y multimedia.                           | Mínimo     | Técnico   | Fácil       | v1      |
| Validación HTML5 y CSS (al menos nivel AA)                                          | Mínimo     | Técnico   | Fácil       | v1      |
| Accesibilidad (solucionarlas)                                                       | Mínimo     | Técnico   | Fácil       | v1      |
| Diseño responsive (3 tipos de dispositivos)                                         | Mínimo     | Técnico   | Fácil       | v1      |
| Usabilidad (6 leyes)                                                                | Mínimo     | Técnico   | Fácil       | v1      |
| Comprobación navegadores                                                            | Mínimo     | Técnico   | Fácil       | v1      |
| **REQUISITOS DESPLIEGUE**                                                           |            |           |             |         |
| Despliegue en servidor virtual                                                      | Mínimo     | Técnico   | Fácil       | v1      |
| Cliente con acceso a la aplicación web                                              | Mínimo     | Técnico   | Fácil       | v1      |
| **MIS REQUISITOS**                                                                  |            |           |             |         |
| R1- Instalación de todas las dependencias necesarias                                | Importante | Técnico   | Fácil       | v1      |
| R2- Migraciones y modelos de todas las tablas                                       | Importante | Técnico   | Medio       | v1      |
| R3- User login/register                                                             | Importante | Técnico   | Fácil       | v1      |
| R4- Creación perfil y panel de control                                              | Importante | Funcional | Fácil       | v1      |
| R5- Perfil de usuario logueado                                                      | Importante | Funcional | Fácil       | v1      |
| R6- Desarrollo de entrenadores personales                                           | Importante | Funcional | Fácil       | v1      |
| R7- Reservas de clases                                                              | Importante | Funcional | Medio       | v1      |
| R8- Calculadora kcal diarias                                                        | Importante | Funcional | Medio       | v1      |
| R9- Calculadora de índice de masa corporal (IMC)                                    | Importante | Funcional | Medio       | v1      |
| R10- Creación de blogs de noticias fitness                                          | Importante | Funcional | Medio       | v1      |
| R11- Foro donde los usuarios puedan dejar sus opiniones                             | Importante | Funcional | Medio       | v1      |
| R12- Poder comentar otros comentarios                                               | Importante | Funcional | Difícil     | v1      |
| R13- Adquirir suscripción mensual/semestral/anual                                   | Importante | Funcional | Medio       | v1      |
| R14- Adquisición de dietas dependiendo del objetivo                                 | Importante | Funcional | Medio       | v1      |
| R15- Adquisición de programas dependiendo de su nivel                               | Importante | Funcional | Medio       | v1      |
| R16- Tienda de productos                                                            | Importante | Funcional | Medio       | v2      |
| R17- Añadir productos a un carrito                                                  | Importante | Funcional | Medio       | v2      |
| R18- Poder decrementar o incrementar productos                                      | Importante | Funcional | Medio       | v2      |
| R19- Realizar una factura que se vea en el perfil del usuario                       | Importante | Funcional | Medio       | v2      |
| R20- Imprimir en el perfil las adquisiciones del usuario                            | Importante | Funcional | Medio       | v2      |
| R21- Métodos CRUD necesarios para diario                                            | Importante | Funcional | Medio       | v2      |
| R22- Creación de una interfaz que actúe como diario                                 | Importante | Funcional | Medio       | v2      |
| R23- Dar puntos al usuario por compras, adquisiciones, fidelidad                    | Importante | Funcional | Medio       | v3      |
| R24- Recompensas o descuentos canjeables por puntos                                 | Opcional   | Funcional | Medio       | v3      |
| R25- Opción de ordenar programas y productos de mayor a menor precio o al contrario | Importante | Funcional | Fácil       | v3      |
| R26- Asegurar la validación de todos los datos de la web                            | Importante | Funcional | Medio       | v3      |
| R27- Notificaciones de recordatorio de programas o clases                           | Opcional   | Funcional | Difícil     | v3      |

---

## Créditos del Autor

Desarrollo completo realizado por José Mondelo Álvarez.  
