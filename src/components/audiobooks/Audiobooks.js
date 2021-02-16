import React, {useState, useEffect} from 'react'
import Axios from 'axios';
import { Link } from 'react-router-dom';

export const Audiobooks = () =>{
	const url = 'https://api.contentful.com';
	const spaces = 'spaces/1t4hjzo7y0kb';
	const environments = 'environments/master';
	const entries = 'entries?select=fields,sys.id,sys.version&locale=es-MX';
	const content_type = 'content_type=audiocontent-v16';
	const token = 'Bearer CFPAT-LBtveUvtDi7YjAhsyNzZURthngcrVnIr53eOZjYnxuc';
    const [state, setState] = useState();
	useEffect(()=>{
    	Axios.get(`${url}/${spaces}/${environments}/${entries}&${content_type}`, { headers: {Authorization: token}}).then((response)=>{
    		setListado(response.data.items);
    		//console.log(response.data.items);
    	});
    }, state);


    const [listado, setListado] = useState([]);

    const divStyle = {
        color: '#183065'
    };

	return (
		<>
		<h1 style={ divStyle}>Audiobooks List</h1>
        <hr />
		<div className="card-columns animate__animated animate__fade">
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
        </>
	)
}