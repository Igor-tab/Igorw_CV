export default function TopBar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-slate-900 shadow">
      <nav className="flex items-center justify-between px-8 py-3">
        <div>
             <a href="./" className="text-[1.5rem] ">Igor Winandy</a>
        </div>
        <div className="flex gap-6">
          <a href="./about" className="text-[1.5rem] hover:underline">About</a>
          <a href="#projects" className="text-[1.5rem] hover:underline">Projects</a>
          <a href="/Igor_Winandy_CV_English.pdf" target="_blank" rel="noopener" className="text-[1.5rem] hover:underline">CV</a>
        </div>
      </nav>
    </header>
  );
}