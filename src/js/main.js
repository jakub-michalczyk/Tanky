let loop = null;
let soundtrack = null;
let spawnedBoosts = [];
let gameOver = false;
let timer = -1;
let map = {
    elements: [
        {
            id: 0,
            src: "building1.png",
            width: 434,
            height: 208,
            x: 20,
            y: 50
        },
        {
            id: 1,
            src: "building2.png",
            width: 550,
            height: 100,
            x: 500,
            y: 700
        },
        {
            id: 2,
            src: "building3.png",
            width: 158,
            height: 110,
            x: 70,
            y: 650
        },
        {
            id: 3,
            src: "building6.png",
            width: 277,
            height: 153,
            x: 1450,
            y: 250
        },
        {
            id: 4,
            src: "tree1.png",
            width: 400,
            height: 170,
            x: 550,
            y: 250
        },
        {
            id: 5,
            src: "tree2.png",
            width: 180,
            height: 70,
            x: 1400,
            y: 50
        },
        {
            id: 6,
            src: "tree3.png",
            width: 185,
            height: 75,
            x: 1650,
            y: 600
        },
    ]
};
let players = [
    {
        id:0,
        img: "tank1.png",
        x: 780,
        y:20,
        keys: [
            {
                key: 87,
                direction: "up",
                triggered: false
            },
            {
                key: 65,
                direction: "left",
                triggered: false
            },
            {
                key: 83,
                direction: "bottom",
                triggered: false
            },
            {
                key: 68,
                direction: "right",
                triggered: false
            },
            {
                key: 32,
                direction: "shoot",
                triggered: false
            }
        ],
        bulletShootDelay: 60,
        speed: 5,
        moving: false,
        boostActive: false,
        distance: 150,
        strength: 1,
        damage: 1,
        hp: 10,
        death: false,
        shoot: {
            shooted: false,
            shootDirection: null,
            bulletDistance: 0,
            bulletPosition: {
                x: 0,
                y: 0
            }
        },
        device: "keyboard",
        controller: null,
        gamePadBtns: [
            {
                keyID: 1,
                direction: "shoot",
                triggered: false 
            },
            {
                name: "arrows",
                direction: null,
                triggered: false
            },
            {
                name: "analogX",
                direction: null,
                triggered: false
            },
            {
                name: "analogY",
                direction: null,
                triggered: false
            },
        ]
    },
    {
        id:1,
        img: "tank22.png",
        x: 1500,
        y:window.innerHeight - 100,
        keys: [
            {
                key: 38,
                direction: "up",
                triggered: false
            },
            {
                key: 37,
                direction: "left",
                triggered: false
            },
            {
                key: 40,
                direction: "bottom",
                triggered: false
            },
            {
                key: 39,
                direction: "right",
                triggered: false
            },
            {
                key: 80,
                direction: "shoot",
                triggered: false
            }
        ],
        bulletShootDelay: 60,
        speed: 5,
        death: false,
        moving: false,
        boostActive: false,
        damage: 1,
        distance: 150,
        strength: 1,
        hp: 10,
        shoot: {
            shooted: false,
            bulletDistance: 150,
            bulletPosition: {
                x: 0,
                y: 0
            }
        },
        device: "keyboard",
        controller: null,
        gamePadBtns: [
            {
                keyID: 1,
                direction: "shoot",
                triggered: false 
            },
            {
                name: "arrows",
                direction: null,
                triggered: false
            },
            {
                name: "analogX",
                direction: null,
                triggered: false
            },
            {
                name: "analogY",
                direction: null,
                triggered: false
            },
        ]
    },
];

function gameInit(){
    drawMuteBtn();
    playSoundtrack();
    canvasScale();
    startGameLoop();
    players.forEach(player => {
        //Preperation for user choosed device
        if(player.device === "keyboard"){
            startTankKeyboardMovment(player);
        }
        else{
            window.addEventListener("gamepadconnected",  e => connectGamePad(player, e));
            window.addEventListener("gamepaddisconnected", () => unConnectGamePad(player));
        }
    });
    
}

function drawMuteBtn(){
    const btn = document.createElement("div");

    btn.dataset.mute = "on";
    btn.id = "mute";
    btn.innerHTML = `<img src="../img/sound.png" />`
    document.body.appendChild(btn);

    document.querySelector("#mute").addEventListener("click", muteSound)
}

function muteSound(e){
    if(e.currentTarget.dataset.mute === "on"){
        soundtrack.pause();
        e.currentTarget.children[0].src = "../img/mute.png";
        e.currentTarget.dataset.mute = "off";
    }
    else if(e.currentTarget.dataset.mute === "off"){
        soundtrack.play();
        e.currentTarget.children[0].src = "../img/sound.png";
        e.currentTarget.dataset.mute = "on";
    }
}

function connectGamePad(player, e){
    player.controller = navigator.getGamepads()[player.id];
}

function unConnectGamePad(player){
    player.controller = {};
}

(function init(){
    document.querySelector("#startGame").addEventListener("click", () => {
        if(window.screen.width < 900){
            //Check for mobile users
            return tooSmallScreen();
        }
        document.querySelector(".mainMenu").remove();
        gameInit();
    });
    document.querySelector("#instruction").addEventListener("click", showInstruction);
    document.querySelector("#controller").addEventListener("click", changeController);
})();

function tooSmallScreen(){
    const box = document.createElement("div");
    const overlayer = document.createElement("div");

    overlayer.id = "overlayer";
    box.id = "smallScreenInfo";
    box.innerHTML =
        `
        <div id="logo"><img src="../img/logo.png"/></div>
        <h1>Unfortunately you can't play this game on mobile devices, or your screen is too small</h1>
        <div class="genericBtn">Ok</div>
    `
    document.body.append(overlayer, box);
    document.querySelector(".genericBtn").addEventListener("click", () => {
        document.querySelector("#smallScreenInfo").remove();
        document.querySelector("#overlayer").remove();
    });
}

function changeController(){
    const controllerBox = document.createElement("div");
    const overlayer = document.createElement("div");

    controllerBox.id = "controllerBox";
    overlayer.id = "overlayer";

    controllerBox.innerHTML = 
        `<div id="playerDevicesWrapper">
                <div class="playerDevices">
                    <div class="playerDeviceInformation">
                        Player 1
                        choosed device: 
                    </div>
                    <div class="deviceImageWrapper">
                        <div>
                            <img src="../img/keyboard.png">
                        </div>
                        <div>
                            <img src="../img/gamepad.png">
                        </div>
                    </div>
                </div>
                <div class="playerDevices">
                    <div class="playerDeviceInformation">
                        Player 2
                        choosed device: 
                    </div>
                    <div class="deviceImageWrapper">
                        <div>
                            <img src="../img/keyboard.png">
                        </div>
                        <div>
                            <img src="../img/gamepad.png">
                        </div>
                    </div>
                </div>
            </div>
            <div id="importantInfo">Warning! Gamepad API is still in progress. It means playing with gamepad isn't the best possible option. It is safer to play with keyboard.</div>
            <div class="genericBtn">Ok</div>`;

         document.body.append(overlayer, controllerBox);

    document.querySelectorAll(".deviceImageWrapper div").forEach(device => {
        device.addEventListener("click", e => {
            clearOtherChoosedDevices(e.currentTarget.parentNode);

            e.currentTarget.dataset.choosed = "true";
            e.currentTarget.style.backgroundColor = "#1d1d1d";
            e.currentTarget.style.borderRadius = "50%";
        });
    });

    document.querySelector(".genericBtn").addEventListener("click", () => {
        setAnupdatePlayersControllers();
        document.querySelector("#overlayer").remove();
        document.querySelector("#controllerBox").remove();
    });
}

function setAnupdatePlayersControllers(){
    let firstPlayer = document.querySelectorAll(".playerDevices .deviceImageWrapper")[0];
    let secondPlayer = document.querySelectorAll(".playerDevices .deviceImageWrapper")[1];

    updatePlayersControllers(firstPlayer, 0)
    updatePlayersControllers(secondPlayer, 1)
}

function updatePlayersControllers(player, playerID){
    Array.from(player.children).forEach(child => {
        if(child.dataset.choosed === "true"){
            child.children[0].src.includes("keyboard") ? players[playerID].device = "keyboard" : players[playerID].device = "gamepad"
        }
    });
}

function clearOtherChoosedDevices(parent){
    Array.from(parent.children).forEach(child => {
        child.dataset.choosed = "";
        child.style.backgroundColor = "transparent";
        child.style.borderRadius = "0%";
    });
}

function showInstruction(){
    const info = document.createElement("div");
    info.id = "info";
    info.innerHTML = 
        `<div id="close">
            <img src="../img/close.png" />
        </div>
        <div id="logo">
            <img src="../img/logoreverse.png" />
        </div>
        <div id="controls">
            <div id="controlsPlayer1">
                <div class="whichPlayer">Player 1:</div>
                <div>Move up: <img src="../img/w.png"> </div>
                <div>Move left: <img src="../img/a.png"> </div>
                <div>Move down: <img src="../img/s.png"> </div>
                <div>Move right: <img src="../img/d.png"> </div>
                <div>Shoot:  <img src="../img/spacebar.png"> </div>
            </div>
            <div id="controlsPlayer2">
                <div class="whichPlayer">Player 2:</div>
                <div>Move up: <img src="../img/up.png"> </div>
                <div>Move left: <img src="../img/left.png"> </div>
                <div>Move down: <img src="../img/down.png"> </div>
                <div>Move right: <img src="../img/right.png"> </div>
                <div>Shoot:  <img src="../img/p.png"></div>
            </div>
        </div>
        <div id="boostWrap">
            <div id="iconsBox">
                <img src="../img/distance.png" />
                <img src="../img/run.png" />    
                <img src="../img/strength.png" />
                <img src="../img/life.png" />
            </div>
            <div id="iconsDesc">
                <div>Increases the distance you can fire your bullets</div>
                <div>Increases the speed at which you can move</div>
                <div>Increase the amount of damage your bullets deal</div>
                <div>Increase the amount of your lifes by one</div>
            </div>
        </div>`

    document.body.appendChild(info);
    document.querySelector("#info #close").addEventListener("click", () => {
        document.querySelector("#info").remove();
    });
}

function playSoundtrack(){
    soundtrack = new Audio();
    soundtrack.src = "../audio/soundtrack.mp3";
    soundtrack.loop = true;
    soundtrack.play();
}

function canvasScale(){
    document.querySelector("canvas").width = window.innerWidth;
    document.querySelector("canvas").height = window.innerHeight;
}

function renderMap(){
    map.elements.forEach(element => {
        const c = document.querySelector("canvas");
        const ctx = c.getContext("2d");
        const img = new Image();
    
        img.src = `../img/${element.src}`;
        ctx.drawImage(img, element.x, element.y, element.width, element.height);
    });
}

function startGameLoop(){
    if(!gameOver){
        loadBackground();
        loadTanks();
        renderMap();
        loadBoosts();
    
        players.forEach(player => {
            let triggeredKeys = [];

            if(player.device === "keyboard"){
                player.keys.forEach(playerKey => {
                    if(playerKey.triggered){
                        triggeredKeys.push(playerKey)
                    }
                });
        
                if(triggeredKeys.length > 1){
                    startMoving(triggeredKeys[1].direction, player)
                }
                else if(triggeredKeys.length === 1){
                    startMoving(triggeredKeys[0].direction, player)
                }
        
                if(player.shoot.shooted){
                    shootTank(player);
                }
        
                if(player.bulletShootDelay <= 0){
                    player.bulletShootDelay = 60;
                }
                else if(player.bulletShootDelay < 60){
                    player.bulletShootDelay = player.bulletShootDelay - 1;
                }
            }
            else{
                if(player.controller !== null){
                    startTankGamepadMovement(player);

                    player.gamePadBtns.forEach(playerKey => {
                        if(playerKey.triggered){
                            triggeredKeys.push(playerKey)
                        }
                    });
              
                   if(triggeredKeys.length >= 1){
                        startMoving(triggeredKeys[0].direction, player)
                    }

                    if(player.shoot.shooted){
                        shootTank(player);
                    }

                    if(player.bulletShootDelay <= 0){
                        player.bulletShootDelay = 60;
                    }
                    else if(player.bulletShootDelay < 60){
                        player.bulletShootDelay = player.bulletShootDelay - 1;
                    }
                }
            }
    
            if(player.boostActive){
                if(player.id === 0){
                    const val = parseInt(document.querySelector("#firstPlayer div").dataset.realvalue);
    
                    if(val > 0){
                        document.querySelector("#firstPlayer div").dataset.realvalue = val - 1;
                        if(val % 60 === 0){
                            document.querySelector("#firstPlayer div").textContent = val / 60
                        }
                    }
                    else{
                        removeBoostEffect(player);
                        player.boostActive = false;
                        document.querySelector("#firstPlayer").remove();
                    }
                }
                else if(player.id === 1){
                    const val = parseInt(document.querySelector("#secondPlayer div").dataset.realvalue);
    
                    if(val > 0){
                        document.querySelector("#secondPlayer div").dataset.realvalue = val - 1;
                        if(val % 60 === 0){
                            document.querySelector("#secondPlayer div").textContent = val / 60
                        }
                    }
                    else{
                        removeBoostEffect(player);
                        player.boostActive = false;
                        document.querySelector("#secondPlayer").remove();
                    }
                }
            }
        });
    
        timer++;
        if(timer >= 1500 || timer === 0){
            timer = 1;
            spawnBoost();
        }
    
    
        loop = requestAnimationFrame(startGameLoop);
    }
}

function removeBoostEffect(player){
    let playerID = player.id;
    if(player.id === 0){
        if(document.querySelector("#firstPlayer img").src.includes("run")){
            player.speed = 5;
        }
        else if(document.querySelector("#firstPlayer img").src.includes("strength")){
            player.damage = 1;
        }
        else if(document.querySelector("#firstPlayer img").src.includes("distance")){
            player.distance = 150;
        }
    }
    else if(player.id === 1){
        if(document.querySelector("#secondPlayer img").src.includes("run")){
            player.speed = 5;
        }
        else if(document.querySelector("#secondPlayer img").src.includes("strength")){
            player.damage = 1;
        }
        else if(document.querySelector("#secondPlayer img").src.includes("distance")){
            player.distance = 150;
        }
    }
}

function loadBoosts(){
    spawnedBoosts.forEach(boost => {
        if(!boost.taken){
            const c = document.querySelector("canvas");
            const ctx = c.getContext("2d");
            const img = new Image();
        
            img.src = `../img/${boost.img}`;
            ctx.drawImage(img, boost.x, boost.y);
        }
    });
}

function loadBackground(){
    const c = document.querySelector("canvas");
    const ctx = c.getContext("2d");
    const img = new Image();

    img.src = "../img/bg.png";
    ctx.drawImage(img, 0, 0, window.innerWidth, window.innerHeight);
}

function spawnBoost(){
    let boostX = Math.floor(Math.random() * ( (window.innerWidth - 64 ) - 64) ) + 64;
    let boostY = Math.floor(Math.random() * ( (window.innerHeight - 64 ) - 64) ) + 64;
    let collision = false;

    map.elements.forEach(element => {
        if(boostX + 64 >= element.x){
            if(boostX <= element.x + element.width){
                if(boostY + 64 >= element.y){
                    if(boostY <= element.y + element.height){
                        //Collison with building
                        collision = true;
                    }
                }
            }
        }
    });

    if(!collision){
        let avaiableBoosts = [
            {
                name: "speedBoost",
                id: 0,
                action: {
                    attributeToBoost: "speed",
                    boostValue: 10
                },
                img: "run.png",
                x: boostX,
                y: boostY,
                taken: false
            },
            {
                name: "distanceBoost",
                id: 1,
                action: {
                    attributeToBoost: "distance",
                    boostValue: 300
                },
                img: "distance.png",
                x: boostX,
                y: boostY,
                taken: false
            },
            {
                name: "strengthBoost",
                id: 2,
                action: {
                    attributeToBoost: "damage",
                    boostValue: 2
                },
                img: "strength.png",
                x: boostX,
                y: boostY,
                taken: false
            },
            {
                name: "extraLife",
                id: 3,
                action: {
                    attributeToBoost: "hp",
                    boostValue: 1
                },
                img: "life.png",
                x: boostX,
                y: boostY,
                taken: false
            }
        ];
    
        let randomBoost = Math.floor(Math.random() * avaiableBoosts.length)
    
        spawnedBoosts.push(avaiableBoosts[randomBoost])
        drawBoost(avaiableBoosts[randomBoost], boostX, boostY)
    }
    else{
        return spawnBoost();
    }
}

function drawBoost(boost, x, y){
    const c = document.querySelector("canvas");
    const ctx = c.getContext("2d");
    const newBoost = new Image();

    newBoost.src = `../img/${boost.img}`;
    ctx.drawImage(newBoost, x, y);
}

function loadTanks(){
    players.forEach(player => {
        if(!player.death){
            const c = document.querySelector("canvas");
            const ctx = c.getContext("2d");
            const tank = new Image();
    
            tank.src = `../img/${player.img}`;
            ctx.drawImage(tank, player.x, player.y);
        }
    });
}

function randomPosition(){
    let point = {};

    point.y = Math.floor(Math.random() * window.innerHeight);
    point.x = Math.floor(Math.random() * window.innerWidth);

    return point;
}

function startTankKeyboardMovment(player){
    window.addEventListener("keydown", e => {
        if (!gameOver) {
            player.keys.forEach(playerKey => {
                if (playerKey.key === e.keyCode) {
                    playerKey.triggered = true;
                }
            });
        }
    });

    window.addEventListener("keyup", e => {
        if (!gameOver) {
            player.keys.forEach(playerKey => {
                if (playerKey.key === e.keyCode) {
                    playerKey.triggered = false;
                }
            });
        }
    });
}

function startTankGamepadMovement(player){
    let gamepad = navigator.getGamepads()[player.controller.index];

    //Check for shoot key up
    gamepad.buttons.forEach(btn => {
        if(!btn.pressed &&  gamepad.buttons.indexOf(btn) === 1){
            player.gamePadBtns[0].triggered = false;
        }
    });

    //Check for shoot key down
    gamepad.buttons.forEach(btn => {
        if(btn.pressed &&  gamepad.buttons.indexOf(btn) === 1){
            player.gamePadBtns[0].triggered = true;
        }
    });

    
    //Check for arrows up
    if(gamepad.axes[9].toFixed(2) > 1.00){
        player.gamePadBtns[1].direction = "";
        player.gamePadBtns[1].triggered = false;
    }

    //Check for arrows down
    if(gamepad.axes[9].toFixed(2) <= 1.00){
        if (gamepad.axes[9].toFixed(2) >= -1.00 && gamepad.axes[9].toFixed(2) < -0.45) {
            //Top
            player.gamePadBtns[1].direction = "up";
            player.gamePadBtns[1].triggered = true;
        }
        else if (gamepad.axes[9].toFixed(2) >= -0.45 && gamepad.axes[9].toFixed(2) < 0.14) {
            //Right
            player.gamePadBtns[1].direction = "right";
            player.gamePadBtns[1].triggered = true;
        }
        else if (gamepad.axes[9].toFixed(2) >= 0.14 && gamepad.axes[9].toFixed(2) < 0.71) {
            //Down
            player.gamePadBtns[1].direction = "bottom";
            player.gamePadBtns[1].triggered = true;
        }
        else if (gamepad.axes[9].toFixed(2) >= 0.71) {
            //Left
            player.gamePadBtns[1].direction = "left"
            player.gamePadBtns[1].triggered = true;
        }
    }

    //Check for analog x axis up
    if(gamepad.axes[0].toFixed(2) <= -0.00){
        player.gamePadBtns[2].direction = "";
        player.gamePadBtns[2].triggered = false;
    }
   
    //Check for analog x axis down
    if(gamepad.axes[0].toFixed(2) <= 1.00){
        if (gamepad.axes[0].toFixed(2) > 0.50 && gamepad.axes[0].toFixed(2) <= 1.00) {
            //Right
            player.gamePadBtns[2].direction = "right";
            player.gamePadBtns[2].triggered = true;
        }
        else if (gamepad.axes[0].toFixed(2) >= -1.00 && gamepad.axes[0].toFixed(2) < -0.50) {
            //Left
            player.gamePadBtns[2].direction = "left";
            player.gamePadBtns[2].triggered = true;
        }
    }

    //Check for analog y axis up
    if(gamepad.axes[1].toFixed(2) <= -0.00){
        player.gamePadBtns[3].direction = "";
        player.gamePadBtns[3].triggered = false;
    }
   
    //Check for analog y axis down
    if(gamepad.axes[1].toFixed(2) >= -1.00){
        if (gamepad.axes[1].toFixed(2) <= -1.00) {
            //Top
            console.log(1)
            player.gamePadBtns[3].direction = "up";
            player.gamePadBtns[3].triggered = true;
        }
        else if (gamepad.axes[1].toFixed(2) >= 1.00) {
            //Down
            player.gamePadBtns[3].direction = "bottom";
            player.gamePadBtns[3].triggered = true;
        }
    }
}

function startMoving(direction, player){
    let check = checkForCollision(player, direction);
    let hitBoost = checkForHitBoost(player);
    let keyFixer = [];

    if (check === true) {
        return true;
    }

    if (direction === "up") {
        player.y -= player.speed;
        rotateTank(player, player.id === 0 ? "tank2.png" : "tank22.png")
    }
    else if (direction === "left") {
        player.x -= player.speed;
        rotateTank(player, player.id === 0 ? "tank4.png" : "tank24.png")
    }
    else if (direction === "bottom") {
        player.y += player.speed;
        rotateTank(player, player.id === 0 ? "tank1.png" : "tank21.png")
    }
    else if (direction === "right") {
        player.x += player.speed;
        rotateTank(player, player.id === 0 ? "tank3.png" : "tank23.png")
    }
    else if (direction === "shoot") {
        !player.shoot.shooted ? shootNewBullet(player) : null;
    }
}

function checkForCollision(player, direction){
    let check = false;
    let otherPlayer = player.id === 0 ? players[1] : players[0];
    let otherPlayerWidth = getTankWidth(otherPlayer);
    let otherPlayerHeight = getTankHeight(otherPlayer);

    if(direction === "up"){
        let playerWidth = getTankWidth(player);
        let playerHeight = getTankHeight(player);

        map.elements.forEach(element => {
            if(player.y - player.speed >= element.y && player.y <= element.y + element.height + 20){
                if(player.x + playerWidth >= element.x && player.x <= element.x + element.width){
                    //Buildings
                    check = true;
                }
            }
        });

        if(player.y - player.speed >= otherPlayer.y && player.y <= otherPlayer.y + otherPlayerHeight + 10){
            if(player.x + playerWidth >= otherPlayer.x && player.x <= otherPlayer.x + otherPlayerWidth){
                //Other Player
                check = true;
            }
        }

        if(player.y - player.speed < 0){
            //End of the map
            check = true;
        }

        rotateTank(player, player.id === 0 ? "tank2.png" : "tank22.png")
    }
    else if(direction === "left"){
        let playerHeight = getTankHeight(player);

        map.elements.forEach(element => {
            if(player.x - player.speed <= element.x + element.width && player.x >= element.x){
                if(player.y + playerHeight >= element.y && player.y <= element.y + element.height){
                    //Buildings
                    check = true;
                }
            }
        });

        if(player.x - player.speed <= otherPlayer.x + otherPlayerWidth && player.x >= otherPlayer.x){
            if(player.y + playerHeight >= otherPlayer.y && player.y <= otherPlayer.y + otherPlayerHeight){
                //Other Player
                check = true;
            }
        }

        if(player.x - player.speed < 0){
            //End of the map
            check = true;
        }

        rotateTank(player, player.id === 0 ? "tank4.png" : "tank24.png" );   
    }
    else if(direction === "bottom"){
        let playerWidth = getTankWidth(player);
        let playerHeight = getTankHeight(player);

        map.elements.forEach(element => {
            if( (player.y + playerHeight ) + player.speed >= element.y && player.y <= element.y + element.height + 20){
                if(player.x + playerWidth >= element.x && player.x <= element.x + element.width){
                    //Building
                    check = true;
                }
            }
        });

        if( (player.y + playerHeight ) + player.speed >= otherPlayer.y && player.y <= otherPlayer.y + otherPlayerHeight + 10){
            if(player.x + playerWidth >= otherPlayer.x && player.x <= otherPlayer.x + otherPlayerWidth){
                //Other Player
                check = true;
            }
        }

        if( (player.y + playerHeight ) + player.speed > window.innerHeight){
            //End of the map
            check = true;
        }

        rotateTank(player, player.id === 0 ? "tank1.png" : "tank21.png")
    }
    else if(direction === "right"){
        let playerHeight = getTankHeight(player);
        let playerWidth = getTankWidth(player);
        
        map.elements.forEach(element => {
            if((player.x + playerWidth ) + player.speed >= element.x && player.x <= element.x + element.width){
                if(player.y + playerHeight >= element.y && player.y <= element.y + element.height){
                    //Building
                    console.log(playerHeight, playerWidth, player.x, player.y, element.x, element.y, element.width, element.height)
                    check = true;
                }
            }
        });

        if((player.x + playerWidth ) + player.speed >= otherPlayer.x && player.x <= otherPlayer.x + otherPlayerWidth + 10){
            if(player.y + playerHeight >= otherPlayer.y && player.y <= otherPlayer.y + otherPlayerHeight){
                //Other player
                check = true;
            }
        }

        if((player.x + playerWidth )  + player.speed > window.innerWidth){
            //End of the map
            check = true;
        }
 
        rotateTank(player, player.id === 0 ? "tank3.png" : "tank23.png")
    }

    return check;
}

function checkForHitBoost(player){
    spawnedBoosts.forEach(boost => {
        let tankWidth = getTankWidth(player);
        let tankHeight = getTankWidth(player);

        if(!player.boostActive){
            if(player.x  + tankWidth >= boost.x && player.x <= boost.x + 64){
                if(player.y + tankHeight >= boost.y && player.y <= boost.y + 64){
                    if(!boost.taken){
                        playSound("../audio/boost.wav");
                        activateBoost(player, boost);
                        if(boost.id !== 3){
                            createMiniatureBoost(player, boost);
                            player.boostActive = true;
                        }
                        boost.taken = true;
                    }
                }
            }
        }
    })
    return false
}

function createMiniatureBoost(player, boost){
    const miniatureBox = document.createElement("div");

    miniatureBox.innerHTML = `<img src="../img/${boost.img}"/><div data-realValue="1800">30</div>`;
    miniatureBox.className = "miniatureBox";
    if(player.id === 0){
        miniatureBox.id = "firstPlayer";
    }
    else{
        miniatureBox.id = "secondPlayer";
    }

    document.body.appendChild(miniatureBox)
}

function activateBoost(tank, boost){
    if(tank.hasOwnProperty(boost.action.attributeToBoost)){
        if(boost.id !== 3){
            tank[boost.action.attributeToBoost] = boost.action.boostValue;
        }
        else {
            tank[boost.action.attributeToBoost] = tank[boost.action.attributeToBoost] + boost.action.boostValue;
            const newHpPoint = document.createElement("div");
            newHpPoint.className = "hpPoint";

            tank.id === 0 ? document.querySelector("#firstPlayerHp").appendChild(newHpPoint) : document.querySelector("#secondPlayerHp").appendChild(newHpPoint);
        }
    }
}

function playSound(soundSrc){
    let newSound = new Audio();

    newSound.src = soundSrc;
    newSound.play();
}

function rotateTank(player, nextDir){
    //Player 1
    if(nextDir === "tank3.png" && player.img === "tank2.png"){
        player.img = "tank6.png"
    }
    else if(nextDir === "tank1.png" && player.img === "tank3.png"){
        player.img = "tank7.png"
    }
    else if(nextDir === "tank2.png" && player.img === "tank3.png"){
        player.img = "tank6.png"
    }
    else if(nextDir === "tank4.png" && player.img === "tank2.png"){
        player.img = "tank5.png"
    }
    else if(nextDir === "tank1.png" && player.img === "tank4.png"){
        player.img = "tank8.png"
    }
    else if(nextDir === "tank3.png" && player.img === "tank1.png"){
        player.img = "tank7.png"
    }
    else if(nextDir === "tank4.png" && player.img === "tank1.png"){
        player.img = "tank8.png"
    }
    else if(nextDir === "tank2.png" && player.img === "tank4.png"){
        player.img = "tank5.png"
    }
    else if(nextDir === "tank1.png" && player.img === "tank2.png"){
        player.img = "tank9.png"
    }
    else if(nextDir === "tank2.png" && player.img === "tank1.png"){
        player.img = "tank10.png"
    }
    else if(nextDir === "tank4.png" && player.img === "tank3.png"){
        player.img = "tank11.png"
    }
    else if(nextDir === "tank3.png" && player.img === "tank4.png"){
        player.img = "tank12.png"
    }
    
    //Player 2
    if(nextDir === "tank23.png" && player.img === "tank22.png"){
        player.img = "tank26.png"
    }
    else if(nextDir === "tank21.png" && player.img === "tank23.png"){
        player.img = "tank27.png"
    }
    else if(nextDir === "tank22.png" && player.img === "tank23.png"){
        player.img = "tank26.png"
    }
    else if(nextDir === "tank24.png" && player.img === "tank22.png"){
        player.img = "tank25.png"
    }
    else if(nextDir === "tank21.png" && player.img === "tank24.png"){
        player.img = "tank28.png"
    }
    else if(nextDir === "tank23.png" && player.img === "tank21.png"){
        player.img = "tank27.png"
    }
    else if(nextDir === "tank24.png" && player.img === "tank21.png"){
        player.img = "tank28.png"
    }
    else if(nextDir === "tank22.png" && player.img === "tank24.png"){
        player.img = "tank25.png"
    }
    else if(nextDir === "tank21.png" && player.img === "tank22.png"){
        player.img = "tank29.png"
    }
    else if(nextDir === "tank22.png" && player.img === "tank21.png"){
        player.img = "tank30.png"
    }
    else if(nextDir === "tank24.png" && player.img === "tank23.png"){
        player.img = "tank31.png"
    }
    else if(nextDir === "tank23.png" && player.img === "tank24.png"){
        player.img = "tank32.png"
    }

    setTimeout(() => player.img = nextDir, 50)
}

function shootNewBullet(tank){
    if(tank.bulletShootDelay === 60){
        playSound("../audio/shoot.wav");
        tank.bulletShootDelay = tank.bulletShootDelay -1;

        let bullet = "";
    
        if (tank.img === "tank1.png" || tank.img === "tank21.png") {
            bullet = `../img/bullet4.png`;
        }
        else if (tank.img === "tank2.png" || tank.img === "tank22.png") {
            bullet = `../img/bullet3.png`;
        }
        else if (tank.img === "tank3.png" || tank.img === "tank23.png") {
            bullet = `../img/bullet1.png`;
        }
        else if (tank.img === "tank4.png" || tank.img === "tank24.png") {
            bullet = `../img/bullet2.png`;
        }
    
        tank.shoot.shootDirection = tank.img;

        if(tank.img === "tank3.png" || tank.img === "tank23.png"){
            tank.shoot.bulletPosition.y = tank.y + 25;
            tank.shoot.bulletPosition.x = tank.x + 85;
        }
        else if(tank.img === "tank4.png" || tank.img === "tank24.png"){
            tank.shoot.bulletPosition.y = tank.y + 25;
            tank.shoot.bulletPosition.x = tank.x - 5;
        }
      
        if(tank.img === "tank2.png" || tank.img === "tank22.png"){
            tank.shoot.bulletPosition.x = tank.x + 25;
            tank.shoot.bulletPosition.y = tank.y - 20;
        }
        else if(tank.img === "tank1.png" || tank.img === "tank21.png"){
            tank.shoot.bulletPosition.x = tank.x + 25;
            tank.shoot.bulletPosition.y = tank.y + 85;
        }
    
        if (tank.img === "tank3.png" || tank.img === "tank23.png") {
            //RIGHT
            tank.shoot.bulletDistance = tank.shoot.bulletPosition.x + tank.distance
        }
        else if (tank.img === "tank4.png" || tank.img === "tank24.png") {
            //LEFT
            tank.shoot.bulletDistance = tank.shoot.bulletPosition.x - tank.distance
        }
        else if (tank.img === "tank2.png" || tank.img === "tank22.png") {
            //TOP
            tank.shoot.bulletDistance = tank.shoot.bulletPosition.y - tank.distance
        }
        else if (tank.img === "tank1.png" || tank.img === "tank21.png") {
            //BOTTOM
            tank.shoot.bulletDistance = tank.shoot.bulletPosition.y + tank.distance
        }
    
    
        tank.shoot.direction = bullet;
        tank.shoot.shooted = true;
    }
}

function shootTank(tank){
    const c = document.querySelector("canvas");
    const ctx = c.getContext("2d");
    const bullet = new Image();
   
    bullet.src = tank.shoot.direction;
    getBulletPosition(tank);

    ctx.drawImage(bullet, tank.shoot.bulletPosition.x, tank.shoot.bulletPosition.y);
    checkForHit(tank)
    checkForBulletHitDistance(tank);
}

function checkForBulletHitDistance(tank){
    let bulletDisapear = false;

    if(tank.img === "tank3.png" || tank.img === "tank23.png"){
        //RIGHT
        if(tank.shoot.bulletPosition.x >= tank.shoot.bulletDistance){
            bulletDisapear = true;
        }
        
    }
    else if(tank.img === "tank4.png" || tank.img === "tank24.png"){
        //LEFT
        if(tank.shoot.bulletPosition.x <= tank.shoot.bulletDistance){
            bulletDisapear = true;
        }
    }
    else if(tank.img === "tank2.png" || tank.img === "tank22.png"){
        //TOP
        if(tank.shoot.bulletPosition.y <= tank.shoot.bulletDistance){
            bulletDisapear = true;
        }
    }
    else if(tank.img === "tank1.png" || tank.img === "tank21.png"){
        //BOTTOM
        if(tank.shoot.bulletPosition.y >= tank.shoot.bulletDistance){
            bulletDisapear = true;
        }
    }

    if(bulletDisapear){
        tank.shoot = {
            shooted: false,
            bulletDistance: 0,
            bulletPosition: {
                x: 0,
                y: 0
            }
        }
    }
}

function getBulletPosition(tank){
    if(tank.shoot.shootDirection === "tank3.png" || tank.shoot.shootDirection === "tank23.png"){
        //RIGHT
        tank.shoot.bulletPosition.x = tank.shoot.bulletPosition.x + 20
    }
    else if(tank.shoot.shootDirection === "tank4.png" || tank.shoot.shootDirection === "tank24.png"){
        //LEFT
        tank.shoot.bulletPosition.x = tank.shoot.bulletPosition.x - 20
    }
    else if(tank.shoot.shootDirection === "tank2.png" || tank.shoot.shootDirection === "tank22.png"){
        //TOP
        tank.shoot.bulletPosition.y = tank.shoot.bulletPosition.y - 20
    }
    else if(tank.shoot.shootDirection === "tank1.png" || tank.shoot.shootDirection === "tank21.png"){
        //BOTTOM
        tank.shoot.bulletPosition.y = tank.shoot.bulletPosition.y + 20
    }
}

function checkForHit(tank){
    let tankX = tank.id === 0 ? players[1].x : players[0].x
    let tankY = tank.id === 0 ? players[1].y : players[0].y
    let shootX = tank.shoot.bulletPosition.x;
    let shootY = tank.shoot.bulletPosition.y;
    let tankHeight = getTankHeight(tank);
    let tankWidth = getTankWidth(tank)

    if(tank.img === "tank2.png" || tank.img === "tank22.png"){
        //Up
        if(shootY <= tankY + tankHeight){
            if(shootY >= tankY){
                if(shootX >= tankX){
                    if(shootX <= tankX + tankWidth){
                        makeBoom(tank, shootX, shootY)
                    }
                }
            }
        }
    }
    else if(tank.img === "tank1.png" || tank.img === "tank21.png"){
        //Bottom
        if(shootY >= tankY){
            if(shootY <= tankY + tankHeight){
                if(shootX >= tankX){
                    if(shootX <= tankX + tankWidth){
                        makeBoom(tank, shootX, shootY)
                    }
                }
            }
        }
    }
    else if(tank.img === "tank4.png" || tank.img === "tank24.png"){
        //Left
        if(shootX <= tankX + tankHeight){
            if(shootX >= tankX){
                if(shootY >= tankY){
                    if(shootY <= tankY + tankWidth){
                        makeBoom(tank, shootX, shootY)
                    }
                }
            }
        }
    }
    else if(tank.img === "tank23.png" || tank.img === "tank3.png"){
        //Right
        if(shootX >= tankX){
            if(shootX <= tankX + tankHeight){
                if(shootY >= tankY){
                    if(shootY <= tankY + tankWidth){
                        makeBoom(tank, shootX, shootY)
                    }
                }
            }
        }
    }
}

function getTankHeight(tank){
    const c = document.querySelector("canvas");
    const ctx = c.getContext("2d");
    const tankImg = new Image();
   
    tankImg.src = `../img/${tank.img}`;
    return tankImg.height
}

function getTankWidth(tank){
    const c = document.querySelector("canvas");
    const ctx = c.getContext("2d");
    const tankImg = new Image();
   
    tankImg.src = `../img/${tank.img}`;
    return tankImg.width
}

function makeBoom(tank, x, y){
    const boom = document.createElement("div");
    tank.shoot.shooted = false;

    boom.id = "boom";
    boom.style.backgroundImage = "url('../img/boom.gif')";
    boom.style.top = `${y}px`;
    boom.style.left = `${x}px`;

    playSound("../audio/boom.wav")
    document.body.appendChild(boom);
    setTimeout(() => {
        document.querySelector("#boom").remove();
    }, 350);

    decreaseHp(tank)
}

function decreaseHp(tank){
    let correctTank = tank.id === 0 ? players[1] : players[0];
    if(correctTank.id === 0){
        for(let i = 0; i < tank.damage; i++){
            document.querySelector("#firstPlayerHp").children[0] !== undefined ? document.querySelector("#firstPlayerHp").children[0].remove() : null;
            correctTank.hp = correctTank.hp - 1;
        }
    }
    else if(correctTank.id === 1){
        for(let i = 0; i < tank.damage; i++){
            document.querySelector("#firstPlayerHp").children[0] !== undefined ?  document.querySelector("#secondPlayerHp").children[0].remove() : null;
            correctTank.hp = correctTank.hp - 1;
        }
    }

    checkForDeath(correctTank)
}

function checkForDeath(tank){
    if(tank.hp <= 0){
        tank.death = true;
        startGameLoop();
        drawDeadTank(tank)
    }
}

function drawDeadTank(tank){
    let tankBox = document.createElement("div");
    tankBox.innerHTML = `<img src="../img/end1.gif"/>`
    tankBox.style.position = "absolute";
    tankBox.style.top = `${tank.y}px`;
    tankBox.style.left = `${tank.x}px`;

    if(tank.img === "tank2.png" || tank.img === "tank22.png"){
        //Up
        tankBox.style.transform = "rotate(180deg)"
    }
    else if(tank.img === "tank4.png" || tank.img === "tank24.png"){
        //Left
        tankBox.style.transform = "rotate(90deg)"
    }
    else if(tank.img === "tank23.png" || tank.img === "tank3.png"){
        //Right
        tankBox.style.transform = "rotate(-90deg)"
    }

    document.body.appendChild(tankBox)

    endGame();
}

function endGame(){
    const overlayer = document.createElement("div");
    const endScreen = document.createElement("div");
    let winner = null;

    players.forEach(player => {
        if(player.death){
            winner = player;
        }
    });

    endScreen.innerHTML = 
        `<img src="../img/logoreverse.png" />
         <h1>Player <span>${winner.id + 1}</span> has won</h1>
         <div id="endScreenMenu">
            <div>Play new game</div>
         </div>`

    overlayer.id = "overlayer";
    endScreen.id = "endScreen";
    document.body.appendChild(overlayer);
    gameOver = true;

    setTimeout(() => {
        document.body.appendChild(endScreen);
        document.querySelector("#endScreenMenu div").addEventListener("click", () => window.location.reload())
    }, 2000);
 
}