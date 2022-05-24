import React,{ useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { Table } from "reactstrap";
import '../components/vista.css';
import Buscador from "./Buscador";

const Vista = ({url}) => {

    const [data, setData] = useState('');
    const [actors, setActors] = useState([]);
    const [pageNumber, setPageNumber] = useState([]);
    const [actorById, setActorById] = useState([]);
    const [renderActor, setRenderActor] = useState(false);

    useEffect(() => {
        getActors();
    }, [])

    const valor = (data) => {
        setData(data);
    }

    const actorsPerPage = 10;
    const pagesVisited = pageNumber * actorsPerPage;

    const showAllActors = actors
    .slice(pagesVisited, pagesVisited + actorsPerPage)
    .map((a) => {
        return(
            <tr key={a.actor_id}>
                <td>{a.actor_id}</td>
                <td>{a.first_name}</td>
                <td>{a.last_name}</td>
          </tr>
        )
    });

    const pageCount = Math.ceil(actors.length / actorsPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    const getActors = () => {
        fetch(url).then((res) => res.json()).then(res =>setActors(res))
    };

    const getActorById = () => {
        const urlId = `${url}/${data}`
        fetch(urlId).then((res) => res.json()).then((json) => setActorById([json]))
    }


    const showActor = actorById.map((a) => {
        return(
            <tr key={a.actor_id}>
                <td>{a.actor_id}</td>
                <td>{a.first_name}</td>
                <td>{a.last_name}</td>
            </tr>
        )
    })

    const showPagination = () => {
        return(
            <div className="py-5">
            <ReactPaginate
            previousLabel={"Anterior"}
            nextLabel={"Siguiente"}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={"paginationBttns"}
            previousClassName={"previousBttn"}
            nextClassName={"nextBttn"}
            disabledClassName={"paginationDisabled"}
            activeClassName={"paginationActive"}
            />
        </div>
        )
    }


    const buscar = () => {
        if(!data){
            getActors()
            setRenderActor(false)
        }else{
            getActorById()
            setRenderActor(true)
        }
    };

    return(
        <>
        <div>
            <Buscador valor={valor} buscar={buscar}/>
        </div>
            <Table striped className='text-center table-dark table-bordered border-info py-5 mt-3'>
                <thead className='table-info'>
                    <tr>
                        <td>ID</td>
                        <td>First Name</td>
                        <td>Last Name</td>
                    </tr>
                </thead>
                <tbody>
                    {!renderActor?showAllActors:showActor}
                </tbody>
            </Table>
            {!renderActor?showPagination(): <div className="bg-dark col-md-12">&nbsp;</div>}
        </>
    )
}


export default Vista;