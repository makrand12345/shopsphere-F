# ShopSphere Frontend

A modern Angular e-commerce frontend with user authentication, product browsing, shopping cart, and admin panel.

## Features

- **User Authentication**: Login, registration, and profile management
- **Product Catalog**: Browse products with search and filtering
- **Shopping Cart**: Add/remove items, quantity management
- **Order Management**: Place orders, view order history
- **Admin Panel**: Product management, order tracking, dashboard
- **Responsive Design**: Mobile-friendly UI with modern styling

## Tech Stack

- Angular 18
- TypeScript
- RxJS
- Angular Router
- Angular HTTP Client
- Angular Forms

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Angular CLI (optional)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd shopsphere-F
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   ng serve
   # or
   npm start
   ```

4. **Open in browser**
   Navigate to `http://localhost:4200`

## Project Structure

```
src/
├── app/
│   ├── admin/                 # Admin panel components
│   │   ├── admin-dashboard/   # Admin dashboard
│   │   ├── admin-orders/      # Order management
│   │   └── admin-products/    # Product management
│   ├── cart/                  # Shopping cart
│   ├── checkout/              # Checkout process
│   ├── guards/                # Route guards
│   │   ├── auth.guard.ts      # Authentication guard
│   │   └── admin.guard.ts     # Admin role guard
│   ├── interceptors/          # HTTP interceptors
│   │   └── auth.interceptor.ts # Auto-logout on 401
│   ├── services/              # Angular services
│   │   ├── auth.service.ts    # Authentication service
│   │   ├── cart.service.ts    # Cart management
│   │   └── orders.service.ts  # Order management
│   ├── products/              # Product catalog
│   ├── orders/                # Order history
│   ├── profile/               # User profile
│   ├── login/                 # Login page
│   ├── register/              # Registration page
│   └── nav/                   # Navigation component
```

## Key Components

### Authentication
- **Login Component**: User authentication with email/password
- **Register Component**: New user registration
- **Auth Service**: JWT token management and user state
- **Auth Guard**: Protects routes requiring authentication
- **Admin Guard**: Protects admin-only routes

### Shopping Experience
- **Products Component**: Product catalog with grid layout
- **Cart Component**: Shopping cart with item management
- **Checkout Component**: Order placement process
- **Orders Component**: User's order history

### Admin Panel
- **Admin Dashboard**: Overview with recent products
- **Admin Products**: Product CRUD with inline editing
- **Admin Orders**: Order management and status updates

## Services

### AuthService
```typescript
- login(email, password): Observable<User>
- register(name, email, password): Observable<User>
- logout(): void
- fetchMe(): Observable<User>
- me$: BehaviorSubject<User | null>
```

### CartService
```typescript
- addToCart(item): void
- removeFromCart(id): void
- updateQuantity(id, quantity): void
- clearCart(): void
- cartItems$: BehaviorSubject<CartItem[]>
- cartCount$: Observable<number>
```

### OrdersService
```typescript
- placeOrder(items, shipping): Observable<Order>
- getUserOrders(): Observable<Order[]>
- getOrderById(id): Observable<Order>
```

## Routing

### Public Routes
- `/` - Home page (Hero component)
- `/products` - Product catalog
- `/login` - Login page
- `/register` - Registration page

### Protected Routes (Auth Required)
- `/profile` - User profile
- `/orders` - Order history
- `/cart` - Shopping cart
- `/checkout` - Checkout process
- `/receipt/:id` - Order receipt

### Admin Routes (Admin Role Required)
- `/admin` - Admin dashboard
- `/admin/products` - Product management
- `/admin/orders` - Order management

## Configuration

### API Configuration
The app connects to the backend API at `http://localhost:4000`. Update the base URL in services if needed.

### Environment Variables
Create `src/environments/environment.ts`:
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:4000/api'
};
```

## Styling

The app uses custom CSS with:
- Dark theme with purple/violet accents
- Responsive grid layouts
- Modern card-based design
- Smooth animations and transitions
- Mobile-first approach

## State Management

- **Authentication State**: Managed via AuthService with BehaviorSubject
- **Cart State**: Managed via CartService with BehaviorSubject
- **User Data**: Fetched on app initialization and stored in service

## HTTP Interceptors

### Auth Interceptor
- Automatically adds JWT token to API requests
- Handles 401 responses by auto-logging out users
- Only applies to backend API calls

## Error Handling

- Global error handling in HTTP interceptor
- User-friendly error messages
- Automatic logout on authentication errors
- Form validation with Angular reactive forms

## Development

### Available Scripts
```bash
npm start          # Start development server
npm run build      # Build for production
npm run test       # Run unit tests
npm run lint       # Run linting
```

### Code Style
- TypeScript strict mode enabled
- Angular style guide compliance
- Consistent naming conventions
- Component-based architecture

## Production Build

1. **Build the project**
   ```bash
   ng build --prod
   ```

2. **Deploy the dist folder**
   - Upload contents of `dist/shopsphere-F/` to your web server
   - Configure server to serve `index.html` for all routes
   - Update API URLs for production backend

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure backend CORS is configured for frontend URL
2. **Authentication Issues**: Check JWT token in localStorage
3. **API Connection**: Verify backend is running on correct port
4. **Build Errors**: Clear node_modules and reinstall dependencies

### Debug Mode
Enable debug logging by setting `localStorage.debug = 'shopsphere'` in browser console.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License