

window.onload = function () {
    var canvas = document.getElementById("paper");
    var ctx = canvas.getContext("2d");

    var height = 500;
    var width = 500;


    //storing images to variables

    var enemy_image_left = new Image();
    enemy_image_left.src = 'images/enemy_fish_left.png';

    var enemy_image_right = new Image();
    enemy_image_right.src = 'images/enemy_fish_right.png';

    var player_image_left = new Image();
    player_image_left.src = 'images/player_fish_left.png';

    var player_image_right = new Image();
    player_image_right.src = 'images/player_fish_right.png';





    //player attributes

    var player_x = 250,
        player_spdX = 30,
        player_y = 250,
        player_spdY = 5,
        player_width = 40,
        player_height = 20,
        player_image = player_image_right;
        player_velY = 0,
        player_velX = 0,
        player_speed = 4,
        player_friction = 0.9,
        player_keys = [];


    //enemy attributes
    var enemy_x = [-200, -200, -200, -200, 700, 700, 700, 700];
    var enemy_y = [];
    var enemy_spdX = [];
    var enemy_image_right;
    var enemy_image_left;
    var enemy_width = [];
    var enemy_height = [];


    //adding random intigers to arrays
    var i = 0;
    while (i < 8) {
        enemy_width[i] = Math.floor(Math.random() * 200) + 2;
        enemy_height[i] = enemy_width[i] / 2;
        enemy_y[i] = Math.floor(Math.random() * 490);
        enemy_spdX[i] = Math.floor(Math.random() * 10) + 2;

        i++;
    }




    function updatePlayer() {

        //drawing player to canvas

        ctx.drawImage(player_image, player_x, player_y, player_width, player_height);

        var i = 0;
        //checking collision between player and enemies
        while (i < 9) {
            if (player_x < enemy_x[i] + enemy_width[i] && player_x + player_width > enemy_x[i] && player_y < enemy_y[i] + enemy_height[i] && player_y + player_height > enemy_y[i]) {
                //checking if enemy is bigger than player
                if (enemy_width[i] + enemy_height[i] > player_width + player_height) {
                    player_width = 40;
                    player_height = 20;
                    player_x = 250;
                    player_y = 250;
                }
                //checking if player is bigger than enemy (for extra saftey) - this one is for the fish facing right
                else if (player_width + player_height > enemy_width[i] + enemy_height[i] && i < 4) {
                    player_width += 6;
                    player_height += 3;
                    player_x -= 3;
                    player_y -= 6;
                    enemy_x[i] = -200;
                    enemy_y[i] = Math.floor(Math.random() * 500);
                    enemy_width[i] = Math.floor(Math.random() * 40) + 15;
                    enemy_height[i] = enemy_width[i] / 2;
                    enemy_spdX[i] = Math.floor(Math.random() * 10) + 2;
                }
                //checking if player is bigger than enemy (for extra saftey) - this one is for the fish facing left
                else if (player_width + player_height > enemy_width[i] + enemy_height[i] && i > 3) {
                    player_width += 6;
                    player_height += 3;
                    player_x -= 3;
                    player_y -= 6;
                    enemy_x[i] = 700;
                    enemy_y[i] = Math.floor(Math.random() * 500);
                    enemy_width[i] = Math.floor(Math.random() * 40) + 15;
                    enemy_height[i] = enemy_width[i] / 2;
                    enemy_spdX[i] = Math.floor(Math.random() * 10) + 2;
                }


            }
            i++;
        }





    }//updateplayer end


    //player movement function
    function move() {
        requestAnimationFrame(move);

        //up
        if (player_keys[38]) {
            if (player_velY > -player_speed) {
                player_velY--;
            }
        }

        //down
        if (player_keys[40]) {
            if (player_velY < player_speed) {
                player_velY++;
            }
        }

        //right
        if (player_keys[39]) {
            if (player_velX < player_speed) {
                player_velX++;
                player_image = player_image_right;
            }
        }
        //left
        if (player_keys[37]) {
            if (player_velX > -player_speed) {
                player_velX--;
                player_image = player_image_left;
            }
        }

        player_velY *= player_friction;
        player_y += player_velY;
        player_velX *= player_friction;
        player_x += player_velX;

        if (player_x >= 468) {
            player_x = 468;
        } else if (player_x <= 0) {
            player_x = 0;
        }

        if (player_y >= 482) {
            player_y = 482;
        } else if (player_y <= 0) {
            player_y = 0;
        }




    }//move end

    move();

    document.body.addEventListener("keydown", function (e) {
        player_keys[e.keyCode] = true;
    });
    document.body.addEventListener("keyup", function (e) {
        player_keys[e.keyCode] = false;
    });




    function updateEnemy() {

        //drawing enemies to canvas
        ctx.drawImage(enemy_image_right, enemy_x[0], enemy_y[0], enemy_width[0], enemy_height[0]);
        ctx.drawImage(enemy_image_right, enemy_x[1], enemy_y[1], enemy_width[1], enemy_height[1]);
        ctx.drawImage(enemy_image_right, enemy_x[2], enemy_y[2], enemy_width[2], enemy_height[2]);
        ctx.drawImage(enemy_image_right, enemy_x[3], enemy_y[3], enemy_width[3], enemy_height[3]);


        ctx.drawImage(enemy_image_left, enemy_x[4], enemy_y[4], enemy_width[4], enemy_height[4]);
        ctx.drawImage(enemy_image_left, enemy_x[5], enemy_y[5], enemy_width[5], enemy_height[5]);
        ctx.drawImage(enemy_image_left, enemy_x[6], enemy_y[6], enemy_width[6], enemy_height[6]);
        ctx.drawImage(enemy_image_left, enemy_x[7], enemy_y[7], enemy_width[7], enemy_height[7]);



        //make eneimes move
        enemy_x[0] += enemy_spdX[0];

        enemy_x[1] += enemy_spdX[1];

        enemy_x[2] += enemy_spdX[2];

        enemy_x[3] += enemy_spdX[3];

        enemy_x[4] -= enemy_spdX[4];

        enemy_x[5] -= enemy_spdX[5];

        enemy_x[6] -= enemy_spdX[6];

        enemy_x[7] -= enemy_spdX[7];

        //checking if enemies move to a certian posision on the canvas
        //when they reach position, move them back to starting location
        var i = 0;
        while (i < 8) {
            if (enemy_x[i] > 700) {

                enemy_x[i] = -200;
                enemy_y[i] = Math.floor(Math.random() * 490);
                enemy_width[i] = Math.floor(Math.random() * 200) + 2;
                enemy_height[i] = enemy_width[i] / 2;
                enemy_spdX[i] = Math.floor(Math.random() * 10) + 2;
                enemy_x[i] += enemy_spdX[i];
                console.log('more than 500');
            }

            if (enemy_x[i] < -200) {

                enemy_x[i] = 700;
                enemy_y[i] = Math.floor(Math.random() * 490);
                enemy_width[i] = Math.floor(Math.random() * 200) + 2;
                enemy_height[i] = enemy_width[i] / 2;
                enemy_spdX[i] = Math.floor(Math.random() * 10) + 2;
                enemy_x[i] -= enemy_spdX[i];
                console.log('more than 500');
            }

            i++;

        }



    }//updateEnemy end

    function update() {
        ctx.clearRect(0, 0, width, height);
        updatePlayer();
        updateEnemy();
    }//update end

    update();
    setInterval(update, 40);



}//onload end