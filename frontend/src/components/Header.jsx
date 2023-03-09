const Header = () => (
  <header className="mt-8 w-full
    flex flex-col md:flex-row justify-center items-center md:items-end">
    <h1 className="basis-3/4 text-6xl md:ml-20">
        Amaro Builder
    </h1>

    <div className="basis-1/4 flex flex-col gap-4 items-center md:items-start md:mr-20">

      <div className="flex flex-row gap-4">
        Username Logged In
        <button className="text-blue-400">
          Log Out
        </button>
      </div>
        
      <nav className="flex flex-row justify-between gap-12 text-xl">
        <a href="http://" className="text-blue-400">
          Builder
        </a>
        <a href="http://" className="text-blue-400">
          Ingredients
        </a>
        <a href="http://" className="text-blue-400">
          Recipes
        </a>
      </nav>
    </div>
  </header>
)

export default Header