import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{overflowX:'hidden'}}>
        {children}
      </body>
    </html>
  );
}
