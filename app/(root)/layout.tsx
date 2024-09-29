/**
* @LuisStarlino
* Created AT: 29/09/2024 | 19:00
*/

//------------------------------------------------
// IMPORTS
//------------------------------------------------

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <div>
            <main>
                {/* Left Layout */}
                <p className="text-white-1">LeftSidebar</p>

                {/* Main */}
                {children}

                {/* Right SideBar */}
                <p className="text-white-1">Right SideBar</p>
            </main>
        </div>
    );
}
