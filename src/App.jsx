import React from 'react';
import Vista from './components/Vista';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { Container } from 'reactstrap';

const url =  `http://127.0.0.1:8000/actor/listar`;

const App = () => {
    return(
        <div className='bg-dark text-light mb-3'>
            <header className='text-center'>
                <h1>Listar actores en React</h1>
            </header>
            <Container>
                <Vista url={url}/>
            </Container>
        </div>
    )
}


export default App;