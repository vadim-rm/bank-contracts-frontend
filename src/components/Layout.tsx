import {FC, ReactNode} from "react";
import Header from "./Header.tsx";

interface Props {
    children?: ReactNode
}

const Layout: FC<Props> = ({children}) => {
    return (
        <body>
        <Header/>
        <main>
            {children}
        </main>
        </body>
    )
}

export default Layout