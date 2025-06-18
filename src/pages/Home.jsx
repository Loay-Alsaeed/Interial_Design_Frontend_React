import Hero from '../components/Hero/Hero';
import DesignGallery from '../components/Design Gallery/DesignGallery';
import CTA from '../components/CTA/CTA';
// import { useAuth } from "../context/AuthContext"; // استدعاء الـ Auth

export default function Home() {
// const { user } = useAuth();
// console.log(user.name); // "Loay"
// console.log(user.email); // "loay@gmail.com"



  return (
    <>      
        <Hero />
        <DesignGallery title={'Featured Design'} />
        <CTA />
    </>
  )
}
