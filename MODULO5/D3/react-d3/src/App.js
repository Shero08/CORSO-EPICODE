import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyBadge from './components/MyBadge';
import BookList from './components/BookList';


function App() {
  return (
    <div className="App">
      <MyBadge badge='New' color='secondary' />
      <div className='container-fluid'>
        <BookList />
      </div>
    </div>
  );
}

export default App;
