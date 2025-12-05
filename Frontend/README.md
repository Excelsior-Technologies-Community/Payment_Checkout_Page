# Payment Integration

A full-stack web application for secure payment processing using Stripe. This application provides a clean, responsive interface for users to enter payment amounts and process transactions securely.

## Features

- **Secure Payment Processing**: Integrated with Stripe for PCI-compliant payment handling
- **Responsive Design**: Modern React frontend with Tailwind CSS styling
- **Real-time Feedback**: Immediate payment status updates and error handling
- **Currency Support**: Configured for Indian Rupees (INR)
- **Cross-platform**: Works seamlessly across desktop and mobile devices

## Tech Stack

### Frontend
- **React 18** - Modern JavaScript library for building user interfaces
- **Vite** - Fast build tool and development server
- **Stripe Elements** - Secure payment form components
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API requests

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **Stripe Node SDK** - Server-side Stripe integration
- **CORS** - Cross-origin resource sharing support

## Prerequisites

Before running this application, ensure you have the following installed:

- **Node.js** (version 14 or higher)
- **npm** or **yarn** package manager
- **Stripe Account** with API keys (test or live)

## Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd PaymentIntegration
   ```

2. **Install backend dependencies:**
   ```bash
   cd Backend
   npm install
   ```

3. **Install frontend dependencies:**
   ```bash
   cd ../Frontend
   npm install
   ```

4. **Configure Stripe Keys:**
   - Obtain your Stripe API keys from the [Stripe Dashboard](https://dashboard.stripe.com/)
   - Replace the placeholder keys in the following files:
     - `Backend/index.js` - Update the Stripe secret key
     - `Frontend/src/App.jsx` - Update the Stripe publishable key

   **Security Warning:** Never commit real API keys to version control. Use environment variables in production.

## Usage

1. **Start the backend server:**
   ```bash
   cd Backend
   node index.js
   ```
   The server will start on `http://localhost:3000`

2. **Start the frontend development server:**
   ```bash
   cd Frontend
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

3. **Process a payment:**
   - Open the application in your browser
   - Enter the payment amount in rupees
   - Fill in your card details using the secure Stripe form
   - Click "Pay" to process the transaction

## API Documentation

### POST /create-payment-intent

Creates a new Stripe Payment Intent for processing payments.

**Endpoint:** `http://localhost:3000/create-payment-intent`

**Request Body:**
```json
{
  "amount": 1000
}
```

**Parameters:**
- `amount` (number): Payment amount in rupees (will be converted to paisa internally)

**Response:**
```json
{
  "clientSecret": "pi_xxxxxxxxxxxxxxxxxxxxxxxx"
}
```

**Error Response:**
```json
{
  "error": "Error message description"
}
```

## Project Structure

```
PaymentIntegration/
├── Backend/
│   ├── index.js          # Express server and Stripe integration
│   ├── package.json      # Backend dependencies
│   └── package-lock.json
├── Frontend/
│   ├── public/           # Static assets
│   ├── src/
│   │   ├── App.jsx       # Main React component
│   │   ├── main.jsx      # Application entry point
│   │   └── assets/       # React assets
│   ├── Pages/
│   │   └── CheckoutForm.jsx  # Payment form component
│   ├── package.json      # Frontend dependencies
│   ├── vite.config.js    # Vite configuration
│   └── README.md         # This file
```

## Development

### Available Scripts

**Frontend:**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

**Backend:**
- `node index.js` - Start the server

### Code Quality

This project uses ESLint for code linting. Run `npm run lint` in the Frontend directory to check for code quality issues.

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Security Considerations

- **API Keys**: Always use environment variables for sensitive data
- **HTTPS**: Use HTTPS in production environments
- **Input Validation**: All user inputs are validated on both client and server
- **PCI Compliance**: Stripe handles all payment data securely

## License

This project is licensed under the ISC License. See the LICENSE file for details.

## Support

For support or questions:
- Create an issue in this repository
- Check Stripe's [documentation](https://stripe.com/docs)
- Review the [React documentation](https://react.dev/)

## Acknowledgments

- [Stripe](https://stripe.com/) for payment processing
- [React](https://reactjs.org/) for the frontend framework
- [Tailwind CSS](https://tailwindcss.com/) for styling
