import React from 'react'
import '../../styles/styles.css';

export const HomeScreen = () =>{
	return (
		<div className="Home">

    <div className="jumbotron big-banner jumbotron-fluid">
      <div className="container">
            <div className="row align-items-center">
              <div className="col">
                <div className="col-sm-6 section-title">
                </div>
                <div>
                </div>
              </div>
            </div>
      </div>
    </div>

     <div className="container">
        <div className="section-title">
          <h2>Why Us</h2>
          <p>What we offer</p>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="icon-box">
              <i>
                <font-icon icon="comments"/>
              </i>
              <h4><a href="#">Search Audiobooks and display the results.</a></h4>
              <p>Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident</p>
            </div>
          </div>
          <div className="col-md-6 mt-4 mt-md-0">
            <div className="icon-box">
              <i>
                <font-icon icon="columns"/>
              </i>
              <h4><a href="#">Add a new Audiobook to the list.</a></h4>
              <p>Minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat tarad limino ata</p>
            </div>
          </div>
          <div className="col-md-6 mt-4 mt-md-0">
            <div className="icon-box">
              <i>
                <font-icon icon="star-half-alt"/>
              </i>
              <h4><a href="#">Update an Audiobook from the list.</a></h4>
              <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur</p>
            </div>
          </div>
          <div className="col-md-6 mt-4 mt-md-0">
            <div className="icon-box">
              <i>
                <font-icon icon="toolbox"/>
              </i>
              <h4><a href="#">View the list of all current Audiobooks.</a></h4>
              <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
            </div>
          </div>
          <div className="col-md-6 mt-4 mt-md-0">
            <div className="icon-box">
              <i>
                <font-icon icon="user-cog"/>
              </i>
              <h4><a href="#">Remove an Audiobook from the list.</a></h4>
              <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque</p>
            </div>
          </div>
          <div className="col-md-6 mt-4 mt-md-0">
            <div className="icon-box">
              <i>
                <font-icon icon="columns"/>
              </i>
              <h4><a href="#">View an Audiobook.</a></h4>
              <p>Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi</p>
            </div>
          </div>
        </div>

     </div>
    
  </div>
	)
}