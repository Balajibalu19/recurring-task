

import '../globals.css';
import { DatePickerProvider } from '../context/DatePickerContext'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <DatePickerProvider>{children}</DatePickerProvider>
      </body>
    </html>
  );
}