
"use client"


import InventoryLink from "./components/InventoryLink";


export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col">


      <main className="flex-1 flex items-center justify-center px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center py-20">
          <div>
            <h2 className="text-4xl font-extrabold mb-6 leading-tight">
              Take Control of Your Inventory
            </h2>
            <p className="text-lg mb-6">
              InventoryPro helps you streamline, track, and manage your stock
              in real time with accuracy and simplicity. Make smarter
              decisions, reduce waste, and maximize profit.
            </p>
            <InventoryLink linkTxt={'Get started'} linkUrl={'/pages/login'} />

          </div>

          <div>
            <img
              src="https://b1622763.smushcdn.com/1622763/wp-content/uploads/2022/04/Make-Inventory-Control-Your-competitive-advantage_blog-image-1024x379.jpg?lossy=1&strip=1&webp=1"
              alt="Warehouse inventory management"
              width={600}
              height={400}
              className="rounded-xl shadow-lg"
            />
          </div>
        </div>
      </main>

      <footer className="bg-gray-100 py-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} InventoryPro. All rights reserved.
      </footer>
    </div>
  );
}

// import InventoryLink from "./components/InventoryLink";
// export default function Home() {

//   return (

//     <div>
//       <h1>Landing page</h1>
//       <InventoryLink linkTxt={'Get started'} linkUrl={'/pages/login'} />
//     </div>
//   );

// }
