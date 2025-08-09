# PruebaTécnica CarlosCabral

Proyecto de prueba técnica que incluye backend en Ruby con Sinatra y frontend en JavaScript.

## 📁 Estructura del Proyecto

```
PruebaTecnica_CarlosCabral/
├── cart-back-end/     # Backend - API REST en Ruby/Sinatra
└── cart-front-end/    # Frontend - Aplicación web
```

## 🚀 Instalación y Configuración

### Backend (Ruby/Sinatra)

1. Navegar a la carpeta del backend:
   ```bash
   cd cart-back-end
   ```

2. Instalar las dependencias (si es necesario):
   ```bash
   bundle install
   ```

3. Ejecutar el servidor:
   ```bash
   ruby app.rb -p 4567
   ```

El backend estará disponible en: `http://localhost:4567`

### Frontend

1. Navegar a la carpeta del frontend:
   ```bash
   cd cart-front-end
   ```

2. Instalar las dependencias:
   ```bash
   npm install
   ```

3. Crear .env con el siguiente url
    ```
    NEXT_PUBLIC_API_URL="http://localhost:4567"
    ```

4. Ejecutar el servidor de desarrollo:
   ```bash
   npm run dev
   ```

El frontend estará disponible en: `http://localhost:3000`

## 🔧 Tecnologías Utilizadas

- **Backend**: Ruby, Sinatra
- **Frontend**: Next.Js, TypeScript Tailwind CSS, Shadcn
- **Package Manager**: npm

## 📝 Resolución del Proyecto

### Desafíos Enfrentados
- Lo pude realizar lo mas pronto posible ya que me encuentro trabajando provisoriamente en otro puesto no relacionado a la progracion el cual me acorta mucho mis horarios libres.

- Es mi primer experiencia con Ruby lo cual fue muy interesante y devertida.

- Lo envie al back como al front en el mismo repo cosa que no suelo hacer ya que me resulta mas conveniente por separado pero asi fueron las indicaciones.

### Decisiones de Diseño
- El diseño lo decidi hacer de esa manera ya que me parecio la mas conveniente por el corto plazo que cuento en mis dias fuera de lo laboral.

### Funcionalidades Implementadas
- Poder mostrar los productos disponibles.

- Poder agregar al carrito productos seleccionados.

- Visualizar correctamente los productos agregados al carrito.

---

*Desarrollado por Carlos Cabral*