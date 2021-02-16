import React, {useState, useEffect} from 'react'
import queryString from 'query-string';
import Axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';

export const SearchScreen = ({history}) =>{

	const location = useLocation();
	const { q = ''} = queryString.parse(location.search);

	const url = 'https://api.contentful.com';
	const spaces = 'spaces/1t4hjzo7y0kb';
	const environments = 'environments/master';
	const entries = 'entries?query=&select=fields,sys.id&locale=es-MX';
	const token = 'Bearer CFPAT-LBtveUvtDi7YjAhsyNzZURthngcrVnIr53eOZjYnxuc';
	const [state, setState] = useState();
	useEffect(()=>{
    	searchAudiobook();
    }, state);

    const [listado, setListado] = useState([]);



    const [formValues, handleInputChange, reset] = useForm({
    	searchText: q
    });

    const { searchText } = formValues;

    const searchAudiobook = () =>{
    	Axios.get(`${url}/${spaces}/${environments}/entries?query=${searchText}&select=fields,sys.id&locale=es-MX`, { headers: {Authorization: token}}).then((response)=>{
    		setListado(response.data.items);
    		//console.log(response.data.items);
    	});
    }

    const handleSearch = (e) => {
    	e.preventDefault();
    	history.push(`?q=${searchText}`);
    	//console.log(searchText);
    	searchAudiobook();
    }

    const divStyle = {
        color: '#183065'
    };

	return (
		<div>
			<h1 style={ divStyle}>Search Audiobooks</h1>
			<hr/>
			<div className="row">
				<div className="col-5">	
					<h4>Find your Audiobook</h4>
					<form onSubmit={ handleSearch }>
						<input 
							type="text" 
							placeholder="Search by Title" 
							className="form-control" 
							name="searchText" 
							value={searchText} 
							onChange={ handleInputChange }
							autoComplete="off"
						/>
						<button type="submit" className="btn m-1 btn-block btn-outline-primary">
							Search...
						</button>
					</form>
				</div>
				<div className="col-7">
					<h4>Results</h4>
					<hr/>
					{
						listado.filter(audiobook => ( Object.keys(audiobook.fields).length != 0 )).map( audiobook =>  (
							<div key={audiobook.sys.id} className="card ms-3" style={{maxWidth: 540}}>
        				<div className="row no-gutters">
        					<div className="col-md-4">
        						<img src={audiobook.fields.cover['es-MX']} className="card-img" alt={audiobook.fields.title['es-MX']} />
        					</div>
        					<div className="col-md-8">
        						<div className="card-body">
        							<h6 className="card-title"><b>{audiobook.fields.title['es-MX']}</b></h6>
        							<p className="card-text">
        								Authors: {audiobook.fields.authors['es-MX']}
        							</p>
        							<p className="card-text">
        								<small className="text-muted">{audiobook.fields.street_date['es-MX']}</small>
        							</p>
        							<Link to={`./audiobook/${audiobook.sys.id}`}>
        								See More...
        							</Link>
        						</div>
        					</div>
        				</div>
        			</div>	
						))

					}
				</div>
			</div>
		</div>
	)
}