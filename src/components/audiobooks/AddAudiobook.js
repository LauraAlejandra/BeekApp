import React, {useState, useEffect, useReducer} from 'react';
import Axios from 'axios';

export const AddAudiobook = ({history}) =>{
	const [title, setTitle] = useState('');
	const [original, setOriginal] = useState('?');
	const [date, setDate] = useState('0000-00-00T00:00:00.000Z');
	const [cost, setCost] = useState('');
	const [authors, setAuthors] = useState('');
	const [narrators, setNarrators] = useState('');
	const [duration, setDuration] = useState('');
	const [cover, setCover] = useState('');

	const url = 'https://api.contentful.com';
	const spaces = 'spaces/1t4hjzo7y0kb';
	const environments = 'environments/master';

	const handleChange = (event) =>{
    	setOriginal(event.target.value);
  	}

  	const addAudiobook = (e) => {
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
			'Authorization' : 'Bearer CFPAT-LBtveUvtDi7YjAhsyNzZURthngcrVnIr53eOZjYnxuc'
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
			Axios.post(`${url}/${spaces}/${environments}/entries`, 
				params,
				{headers: header_params},
			).then((response) => {
           		setTitle('');
            	setOriginal('?');
            	setDate('0000-00-00T00:00:00.000Z');
            	setCost('');
            	setAuthors('');
            	setNarrators('');
            	setDuration('');
            	setCover('');
        	}).catch(function(error) {
				console.log(error);
			});
		}
		
    }

    const divStyle = {
  		color: '#183065'
	};

	return (
		<div>
		<h1 style={ divStyle}>Add an Audiobook</h1>
		<hr />
		<div className="row mt-5">

					<div className="col-4">
						<img src={`../assets/audiobook.jpg`} className="img-thumbnail animate__animated animate__fadeInLeft" />
					</div>
					<div className="col-8">
						<div className="row animate__animated animate__fadeIn">
							<div className="col-10">
								<h3>{title}</h3>
							</div>
						</div>
						<ul className="list-group list-group-flush">
							<li className="list-group-item"><b>Is Original:</b> {original} </li>
							<li className="list-group-item"><b>Date:</b> {date} </li>
							<li className="list-group-item"><b>Cost per play: </b> ${cost} </li>
							<li className="list-group-item"><b>Duration: </b> {duration} </li>
							<li className="list-group-item"><b>Authors: </b> { authors } </li>
							<li className="list-group-item"><b>Narrators: </b> {narrators} </li>
						</ul>
						
					</div>
					<div className="col-12 mt-5">
						<form className="row" onSubmit={addAudiobook}>
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
							<div className="form-group col-4">
								<label></label>
								<button type="submit" className="btn btn-success btn-block mb-30"> + Add</button>
							</div>
							<div className="form-group col-12">
							</div>
							
						</form>
						
					</div>
				<br />
			<br />
		</div>
	</div>

	)
}