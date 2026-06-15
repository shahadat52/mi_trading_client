
const HomePageMenuToggleButton = ({ menuOpen, setMenuOpen }: any) => {
    return (
        <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2 shadow-sm transition-all duration-300 hover:bg-slate-50 hover:shadow-md"
        >
            <div className="relative h-5 w-5">
                <span
                    className={`absolute left-0 top-0 h-0.5 w-5 bg-slate-800 rounded transition-all duration-300 ${menuOpen ? "top-2 rotate-45" : ""
                        }`}
                />
                <span
                    className={`absolute left-0 top-2 h-0.5 w-5 bg-slate-800 rounded transition-all duration-300 ${menuOpen ? "opacity-0" : ""
                        }`}
                />
                <span
                    className={`absolute left-0 top-4 h-0.5 w-5 bg-slate-800 rounded transition-all duration-300 ${menuOpen ? "top-2 -rotate-45" : ""
                        }`}
                />
            </div>

            <span className="text-sm font-medium text-slate-700">
                {menuOpen ? "Close Menu" : "Open Menu"}
            </span>
        </button>
    );
};

export default HomePageMenuToggleButton;