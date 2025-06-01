import type {Metadata} from 'next'
import 'normalize.css'
import './global.css'
import Container from './components/container'
import Title from './components/title'

export default function RootLayout({children,}: Readonly<{children: React.ReactNode}>) {
    return (
        <html lang='en'>
            <body>
            <Title />
            <Container>
                {children}
            </Container>
            </body>
        </html>
    )
}