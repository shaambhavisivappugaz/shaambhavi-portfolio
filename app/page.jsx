import Navbar from '@/components/Navbar';
import VideoIntro from '@/components/VideoIntro';
import Portfolio from '@/components/Portfolio';
import SiteBackground from '@/components/SiteBackground';

export const metadata = {
  title: 'Shaambhavi Sivappugaz · Software Developer',
  description: 'Full-stack developer & AI engineer. 2.5+ yrs at Zoho, Monash MIT student, building AI-powered products.',
};

export default function Home() {
  return (
    <main>
      <SiteBackground />
      <Navbar />
      <VideoIntro videoSrc="/hero.mp4" />
      <Portfolio />
    </main>
  );
}
