# Breakout 1

![Lesson 7 Screenshot](https://github.com/GameValley/UnityTutorial/blob/master/images/lesson-7.png)

## Add Walls around the Screen and a Paddle

The walls need to be at the edges of the screen. Every screen is different, so the walls have to be relocated at the beginning of the game.

The initial position of the paddle is at the center of bottom.

### ```GameManager.js```
```javascript
var topWall : Transform;
var bottomWall : Transform;
var leftWall : Transform;
var rightWall : Transform;

var paddle : Transform;

private var topRight : Vector2;
private var bottomLeft : Vector2;

function Awake () {
  topRight = Camera.main.ScreenToWorldPoint(new Vector3(Screen.width, Screen.height, 0));
  bottomLeft = Camera.main.ScreenToWorldPoint(new Vector3(0, 0, 0));

  // Adjust the positions of the border walls
  leftWall.position.x = bottomLeft.x - leftWall.localScale.x / 2;
  rightWall.position.x = topRight.x + rightWall.localScale.x / 2;
  topWall.position.y = topRight.y + topWall.localScale.y / 2;
  bottomWall.position.y = bottomLeft.y - bottomWall.localScale.y / 2;
  
  // Put the paddle in the center of bottom
  paddle.position.x = 0;
  paddle.position.y = bottomLeft.y + paddle.lossyScale.y / 2;  
}
```

## Move the Paddle

The left and right arrow keys are used to control the paddle. The variable ```paddeSpeed``` allows us to adjust the paddle speed in Unity Editor. The paddle should be clamped between the left and right walls.

### ```GameManager.js```
```javascript
var paddleSpeed = 1.0f;

function Update () {
  var xPos = paddle.position.x + (Input.GetAxis("Horizontal") * paddleSpeed);
  paddle.position.x = Mathf.Clamp (xPos, bottomLeft.x+paddle.lossyScale.x/2, 
                                         topRight.x-paddle.lossyScale.x/2);
}
```

## Start the Game

The up arrow key is used to start the game. A random angle is generated and a force is applied along the angle on the ball. A perfect bounce material should be used to keep the ball moving. 

### ```GameManager.js```
```javascript
var ball : Transform;

private var start = false;

function Update () {
  ...
  if (Input.GetKey(KeyCode.UpArrow) && start == false) {
    ball.position.x = paddle.position.x;
    ball.position.y = paddle.position.y + paddle.lossyScale.y/2 + ball.lossyScale.y/2;
    var randomAngle = Quaternion.Euler(0, 0, Random.Range(30,46)*(Random.Range(0,2)*2-1));
    ball.gameObject.GetComponent.<Rigidbody>().AddForce(randomAngle*Vector3(0.0f, 600.0f, 0.0f));
    start = true;
  }
}
```

## End of the Game

The GameObject ```gameOver``` is hidden at start. When the ball hits the bottom wall, it becomes active.

### ```BottomWall.js```
```javascript
var gameOver : GameObject;

function OnTriggerEnter (other : Collider) {
  gameOver.SetActive(true);
}
```

## Adjust the Position of Background

It would be nice to adjust the position of background inside the visible screen.

### ```GameManager.js```
```javascript
var background : Transform;

function Awake () {
  ...
  background.localScale.x = topRight.x - bottomLeft.x;
  background.localScale.y = topRight.y - bottomLeft.y;
}
```
