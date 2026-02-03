import Header from "./header/page";
import Footer from "./footer/page";

export default function LayoutApp (props : {children: React.ReactNode}){
 return (
    <>
    <Header/>
    <main>{props.children}</main>
    <Footer />
    </>
 )
}