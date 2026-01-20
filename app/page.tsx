import { cvData } from "./data/resume";
import Image from "next/image";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";


function Portfolio() {
  return (

    <div className=" rounded-lg p-10 mt-8 flex flex-col w-full">
      <div className="flex justify-center">
        <span className="text-center font-sans text-[3rem] font-light">Portfolio</span>
      </div>
      <div className="flex flex-wrap gap-6 justify-center mt-6">
        {cvData.projects.map((project, i) => (
          <div
            key={project.name}
            className={`w-120 h-120 rounded-lg flex flex-col justify-between text-white text-2xl font-bold ${i % 2 === 0 ? 'bg-white' : 'bg-black'}`}
          >
            <span className={`${i % 2 === 0 ? 'text-black' : 'text-white'} px-4 py-2 mb-2`}>{project.name}</span>
            <span className={`${i % 2 === 0 ? 'text-black' : 'text-white'} whitespace-pre-line text-base font-normal px-4`}>{project.description}</span>
            <span className={`${i % 2 === 0 ? 'text-black' : 'text-white'} self-end px-4 pb-2 text-base font-normal`}>{project.tech}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main>
      <div className="min-h-screen pb-20 flex flex-col items-center justify-center">
        <Image
          src="/profile.jpg"
          alt="no img"
          width={119}
          height={179}
          className="rounded-full"
        />
        <span className="text-center font-sans text-[4rem] font-light mt-[30px] mb-[10px]">Igor Winandy</span>
        <span className="text-center">Software Dev, Student, and Runner. <br />
          Looking for my first professional experience.</span>
        <div className="socials flex gap-4 mt-6">
          <a href="mailto:your@email.com" target="_blank" rel="noopener" className="has-tooltip">
            <FaEnvelope className="text-[2rem]" />
          </a>
          <a href="https://github.com/igor-tab" target="_blank" rel="noopener" className="has-tooltip">
            <FaGithub className="text-[2rem]" />
          </a>
          <a href="www.linkedin.com/in/igor-winandy-6108ab193" target="_blank" rel="noopener" className="has-tooltip">
            <FaLinkedin className="text-[2rem]" />
          </a>

          {/* Add more icons here */}
        </div>
      </div>
      <div className="bg-slate-100 rounded-lg p-10 mt-8 flex flex-col w-full">
        <p className="h-13 text-black text-4xl ">Greetings</p>
        <span className="whitespace-pre-line  text-black text-2xl">{cvData.personalInfo.intro}</span>
      </div>
      
      <Portfolio/>
    </main>
  );
};