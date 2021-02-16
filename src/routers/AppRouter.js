import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import { Navbar } from '../components/ui/Navbar';
import { HomeScreen } from '../components/home/HomeScreen';
import { AddAudiobook } from '../components/audiobooks/AddAudiobook';
import { Audiobooks } from '../components/audiobooks/Audiobooks';
import { AudiobookScreen } from '../components/audiobooks/AudiobookScreen';
import { SearchScreen } from '../components/search/SearchScreen';

export const AppRouter = () => {
    return ( 
        <Router >
            <div >
                <Navbar / >
                <div className="container mt-20" style={{marginTop: '40' + 'px'}}>
                    <Switch >
                     <Route exact path = "/home" component = { HomeScreen }/> 
                    <Route exact path = "/add" component = { AddAudiobook }/> 
                    <Route exact path = "/audiobooks" component = { Audiobooks }/> 
                    <Route exact path = "/search" component = { SearchScreen }/> 
                    <Route exact path = "/audiobook/:id" component = { AudiobookScreen }/> 
                    <Route exact path = "/" component = { HomeScreen }/> 
                    </Switch> 
                </div>
            </div> 
        </Router>
    )
}