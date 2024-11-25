import {CSSProperties, FC, ReactNode} from "react";
import Header from "./Header.tsx";

interface Props {
    children?: ReactNode
    className?: string
    style?: CSSProperties
}

const Layout: FC<Props> = ({children, className, style}) => {
    return (
        <body className={className} style={style}>
        <Header/>
        <main className={className}>
            {children}
        </main>
        </body>
    )
}

export default Layout