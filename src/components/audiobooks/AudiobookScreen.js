import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import { useParams, Redirect, Link } from 'react-router-dom';

export const AudiobookScreen = ({history}) =>{
	const { id } = useParams();
	//console.log(id);
	const url = 'https://api.contentful.com';
	const spaces = 'spaces/1t4hjzo7y0kb';
	const environments = 'environments/master';
	const entries = `entries?sys.id=${id}&select=fields,sys.id,sys.version&locale=es-MX`;
	const token = 'Bearer CFPAT-LBtveUvtDi7YjAhsyNzZURthngcrVnIr53eOZjYnxuc';

	const [title, setTitle] = useState('');
	const [original, setOriginal] = useState('?');
	const [date, setDate] = useState('0000-00-00T00:00:00.000Z');
	const [cost, setCost] = useState('');
	const [authors, setAuthors] = useState('');
	const [narrators, setNarrators] = useState('');
	const [duration, setDuration] = useState('');
	const [cover, setCover] = useState('');
	const [version, setVersion] = useState('');

	useEffect(()=>{
    	Axios.get(`${url}/${spaces}/${environments}/${entries}`, { headers: {Authorization: token}}).then((response)=>{
    		//console.log(response.data.items[0].sys.version);
    		if(response.data.items[0] === undefined){
    			handleReturn();
    		} else{
    			setVersion(response.data.items[0].sys.version);
    			if(response.data.items[0].fields.title !== undefined){
    				setTitle(response.data.items[0].fields.title['es-MX']);
    			} 
    			if(response.data.items[0].fields.is_original !== undefined){
    				if(response.data.items[0].fields.is_original['es-MX']){
    					setOriginal('Yes');
    				} else{
    					setOriginal('No');
    				}
    			}
    			if(response.data.items[0].fields.street_date !== undefined){
    				setDate(response.data.items[0].fields.street_date['es-MX']);
    			}
    			if(response.data.items[0].fields.cost_per_play !== undefined){
    				setCost(response.data.items[0].fields.cost_per_play['es-MX']);
    			} 
    			if(response.data.items[0].fields.authors !== undefined){
    				setAuthors(response.data.items[0].fields.authors['es-MX'].toString());
    			}
    			if(response.data.items[0].fields.narrators !== undefined){
    				setNarrators(response.data.items[0].fields.narrators['es-MX'].toString());
    			}
    			if(response.data.items[0].fields.duration !== undefined){
    				setDuration(response.data.items[0].fields.duration['es-MX']);
    			}
    			if(response.data.items[0].fields.cover !== undefined){
    				setCover(response.data.items[0].fields.cover['es-MX']);
    			}
    		}
    		
    	});
    }, []);

    const handleReturn = () =>{
    	if(history.length <= 2){
    		history.push('/');
    	} else{
    		history.goBack();
    	}
    }

    const handleChange = (event) =>{
    	setOriginal(event.target.value);
  	}

  	const updateAudiobook = (e) => {
  		//console.log('update');
  		e.preventDefault();
        var fields = {};
        var is_original = true;
        if(original === 'Yes'){
        	is_original = true;
        } else{
        	is_original = false;
        }
        var authorsArray = authors.split(',');
        var narratorsArray = narrators.split(',');
        var coverUrl = '';
        if(cover === ''){
        	coverUrl = 'https://images.findawayworld.com/v1/image/cover/CD361246';
        } else{
        	coverUrl = cover;
        }
		fields['title'] = {
			'es-MX' : title
		};
		fields['is_original'] = {
			'es-MX' : is_original
		};
		if(date === '' || date === '00-00-0000' || date === '0000-00-00T00:00:00.000Z'){
			fields['street_date'] = {
				'es-MX' : '0000-00-00T00:00:00.000Z'
			};
		} else{
			fields['street_date'] = {
			'es-MX' : new Date(date).toISOString()
			};
		}
		fields['cost_per_play'] = {
			'es-MX' : parseFloat(cost)
		};
		fields['authors'] = {
			'es-MX' : authorsArray
		};
		fields['narrators'] = {
			'es-MX' : narratorsArray
		};
		fields['duration'] = {
			'es-MX' : parseInt(duration)
		};		
		fields['cover'] = {
			'es-MX' : coverUrl
		};
		//console.log(fields);
		var header_params = {};
		header_params = {
			'X-Contentful-Content-Type' : 'audiocontent-v16',
			'Authorization' : 'Bearer CFPAT-LBtveUvtDi7YjAhsyNzZURthngcrVnIr53eOZjYnxuc',
			'X-Contentful-Version': version
		};
		const params = JSON.stringify({
			fields
		});
		//console.log(params);
		if(title === ''){
			alert('Title');
		} else if(original === '?'){
			alert('Is Original');
		} else if(date === '' || date === '00-00-0000' || date === '0000-00-00T00:00:00.000Z'){
			alert('Date');
		} else if(parseFloat(cost) === 0 || cost === ''){
			alert('Cost');
		} else if(authors === ''){
			alert('Authors');
		} else if(narrators === ''){
			alert('Narrators');
		} else if(parseInt(duration) === 0 || duration === ''){
			alert('Duration');
		} else{
			Axios.put(`${url}/${spaces}/${environments}/entries/${id}`, 
				params,
				{headers: header_params},
			).then((response) => {
           	 	console.log(response);
           	 	window.location.reload();
        	}).catch(function(error) {
				console.log(error);
			});
    	}
  	}

  	const deleteAudiobook = (e) => {
  		//console.log('delete');
  		e.preventDefault();
  		var header_params = {};
		header_params = {
			'Authorization' : 'Bearer CFPAT-LBtveUvtDi7YjAhsyNzZURthngcrVnIr53eOZjYnxuc'
		};
		Axios.delete(`${url}/${spaces}/${environments}/entries/${id}`,
			{headers: header_params},
		).then((response) => {
            console.log(response);
        }).catch(function(error) {
			console.log(error);
		});
		handleReturn();
  	}

  	const divStyle = {
  		color: '#183065'
	};
    
	return (
		<div>
					<div className="row mt-5" >
						<div className="col-4">
							<img src={cover} className="img-thumbnail animate__animated animate__fadeInLeft" alt={title}/>
						</div>
						<div className="col-8">
							<h3 style={ divStyle} >{title}</h3>
							<ul className="list-group list-group-flush">
								<li className="list-group-item"><b>Authors: </b>{ authors }</li>
								<li className="list-group-item"><b>Narrators: </b>{ narrators }</li>
								<li className="list-group-item"><b>Date: </b>{ date }</li>
							</ul>
							<br/>
							<h5>Datails</h5>

							<ul className="list-group list-group-flush">
							<li className="list-group-item"><b>Original: </b>{original}</li>
							<li className="list-group-item"><b>Cost per play: </b> $ { cost }</li>
							<li className="list-group-item"><b>Duration: </b>  { duration }</li>
							</ul>
							<br />
							<button className="btn btn-block btn-outline-info" onClick={handleReturn} >
								Return
							</button>
						</div>
						<div className="col-12 mt-5">
						<form className="row">
							<div className="form-group col-4">
								<label>Title *</label>
								<input className="form-control" type="text" name="title" value={title} onChange={(e)=>{ setTitle(e.target.value) }}/>
							</div>
							<div className="form-group col-4">
								<label>Is Original *</label>
								<select className="form-control" name="original" value={original} onChange={ handleChange }>
									<option value="?">Select one</option>
									<option value="Yes">Yes</option>
									<option value="No">No</option>
								</select>
							</div>
							<div className="form-group col-4">
								<label>Date *</label>
								<input className="form-control" type="date" name="date" value={date.substring(0, 10)} onChange={(e)=>{ setDate(e.target.value) }}/>
							</div>
							<div className="form-group col-4">
								<label>Cost per play *</label>
								<input className="form-control" type="number" name="cost" value={cost} onChange={(e)=>{ setCost(e.target.value) }}/>
							</div>
							<div className="form-group col-4">
								<label>Duration *</label>
								<input className="form-control" type="number" name="duration" value={duration} onChange={(e)=>{ setDuration(e.target.value) }}/>
							</div>
							<div className="form-group col-4">
								<label>Authors *</label>
								<input placeholder="Separate each author by comma ," className="form-control" type="text" name="authors" value={authors} onChange={(e)=>{ setAuthors(e.target.value) }}/>
							</div>
							<div className="form-group col-4">
								<label>Narrators *</label>
								<input placeholder="Separate each narrator by comma ," className="form-control" type="text" name="narrators" value={narrators} onChange={(e)=>{ setNarrators(e.target.value) }}/>
							</div>
							<div className="form-group col-4">
								<label>Image Cover Url</label>
								<input placeholder="If you dont put the url It'll set a default image" className="form-control" type="text" name="cover" value={cover} onChange={(e)=>{ setCover(e.target.value) }}/>
							</div>
							<div className="form-group col-2">
								<label></label>
								<button type="button" className="btn btn-primary btn-block mb-30" onClick={updateAudiobook}>Update</button>
							</div>
							<div className="form-group col-2">
								<label></label>
								<button type="button" className="btn btn-danger btn-block mb-30" onClick={deleteAudiobook}>Delete</button>
							</div>
							<div className="form-group col-12">
							</div>
							
						</form>
						
					</div>
					</div>
		</div>
	)
}