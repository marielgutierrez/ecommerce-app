import Footer from "./Footer";
import Header from "./Header";

export function Layout({ children }) {
    return (
        <div>
            <Header/>
            <main>
                {children}
            </main>
            <Footer/>
        </div>
    )
}