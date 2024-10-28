import {FC, ReactNode} from "react";
import Header from "./Header.tsx";

interface Props {
    children?: ReactNode
    className?: string
}

const Layout: FC<Props> = ({children, className}) => {
    return (
        <body className={className}>
        <Header/>
        <main className={className}>
            {children}
        </main>
        </body>
    )
}

export default Layout