import './App.css';
import CardList from './components/CardList';
import { productsStateLoading } from './states/ProductState';
import { useSelector } from 'react-redux';

function App() {
  const productsLoading = useSelector(productsStateLoading)
  console.log('stato passato da componente figlio:', productsLoading);

  return (
    <div className="App">
      <CardList />
    </div>
  );
}

export default App;
