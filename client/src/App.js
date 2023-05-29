import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home";
import { Auth } from "./pages/Auth";
import { CreateRecipe } from "./pages/Create-Recipe";
import { SavedRecipes } from './pages/Saved-Recipes';
import { Navbar } from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/create-recipe" element={<CreateRecipe />} />
          <Route path="/saved-recipes" element={<SavedRecipes />} />
          <Route path="/*" element={<div>Page Not Found</div>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
