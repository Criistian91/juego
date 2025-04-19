# 📦 Sistema de Gestión de Inventario

Este es el proyecto final de la materia **Proyecto Informático**, desarrollado por Daniel (Frontend) y Cristian (Backend). Consiste en un sistema web para la gestión de inventarios de productos, usuarios y proveedores.

---

## 🔧 Tecnologías utilizadas

### 🖥️ Frontend
- HTML5
- CSS3
- JavaScript (Vanilla)
- Bootstrap
- Fetch API

### 🔙 Backend
- Python 3.x
- Flask
- Flask-Cors
- PyJWT
- mysql-connector-python
- python-dotenv
- Pillow

### 📦 Base de Datos
- MySQL

### 🧪 Herramientas adicionales
- Postman (para pruebas de API)
- Graphviz + Pyreverse (diagramas UML)
- Visual Studio Code (IDE)

---

## 🚀 Cómo correr el proyecto

### 1. Clona el repositorio

```bash
git clone https://github.com/Criistian91/inventory_project_proyectoinfor.git
cd inventory-management-system
```

### 2. Configura la base de datos

Crea una base de datos en MySQL con las credenciales que configures en el archivo `.env`.

Ejemplo de `.env`:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=flask_user_name
DB_PASSWORD=flask_user_password
DB_NAME=flask_app_db
PORT=5010
HOST=localhost
```

### 3. Activa el entorno virtual

```bash
cd api
.venv\Scripts\activate   # en Windows
```

### 4. Instala dependencias

```bash
pip install -r requirements.txt
```

### 5. Corre el servidor Flask

```bash
python .\__init__.py
```

El backend se levantará en:  
📡 `http://localhost:5010`

---

## 📁 Estructura del proyecto

```
inventory-management-system/
│
├── api/                 # Backend con Flask
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── db/
│   ├── __init__.py
│   └── README.md        # Documentación detallada del backend
│
├── static/              # Archivos CSS e imágenes
├── templates/           # Archivos HTML
├── tests/               # Colecciones Postman y pruebas
├── .env                 # Variables de entorno
├── README.md            # Este archivo
└── requirements.txt     # Dependencias de Python
```

---

## 👨‍💻 Autores

- **Cristian** – Desarrollo del backend con Flask
- **Daniel** – Desarrollo del frontend con HTML, CSS y JS
