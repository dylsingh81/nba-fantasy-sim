import React from 'react';
import './PlayerPill.css';

function PlayerPill(props) {

    var playerImagePath;
    
    if(props.player["Image Available"] === "no") {
        playerImagePath = require("../../../db/player_images/mystery.png");
    }
    else{
        // Replace space in name with dash
        var playerName = props.player.name.replace(/\s/g, "-");
        playerImagePath = require("../../../db/player_images/" + playerName + ".png");
    }

    var salary;
    
    if(props.player.price === undefined){ 
        salary = "";
    }
    else{
        salary = "$" + props.player.price;
    }

    if (props.player.type === "starter") {
        return (
            <div className={"player-starter-pill rounded-pill row align-items-center " + props.player.isSelectedClass} onClick={event => props.handleShow(event, props.position, props.id)}>
                <div className='col-md-1'>
                    <h3>{props.position}</h3>
                </div>
                <div className='col-md-3 line-sep'>
                    <img src={playerImagePath} className="player-image" alt="NBA PLAYER" />
                </div>
                <div className='col-md-5'>
                    <h3>{props.player.name}</h3>
                </div>

                <div className='col-md-1'>
                    <h3>{props.player.overallAttribute}</h3>
                </div>

                <div className='col-md-2 line-sep'>
                    <h3>{salary}</h3>
                </div>
            </div>
        );
    }

    //if reserve
    if (props.player.type === "reserve"){
        return (
            <div className={"player-reserve-pill rounded-pill row align-items-center " + props.player.isSelectedReserveClass} onClick={event => props.handleShow(event, "", props.id)}>
                <div className='col-md-4'>
                    <img src={playerImagePath} className="player-image" alt="NBA PLAYER" />
                </div>
                <div className='col-md-4'>
                    <h6>{props.player.name}</h6>
                </div>
                <div className='col-md-2'>
                    <h3>{props.player.overallAttribute}</h3>
                </div>
                <div className='col-md-2 line-sep'>
                    <h3>{salary}</h3>
                </div>
            </div>
        );
    }
    
}
export default PlayerPill;