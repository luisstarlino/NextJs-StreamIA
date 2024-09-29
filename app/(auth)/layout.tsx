/**
* @LuisStarlino
* Created AT: 29/09/2024 | 19:00
*/

//------------------------------------------------
// IMPORTS
//------------------------------------------------

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <main>
            {children}
        </main>
    );
}
